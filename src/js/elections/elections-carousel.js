/* 
 * elections-carousel
 * @copyright (c) Heini Fagerlund
 * @version 2.0.0
 * @license MIT
 * 
 */

//var jQuery = require('jquery'); //TEST_CODE1

require('../../sass/screen.scss');

/*
 * Usage:
 *
 * [a.] All parameters (shown below with default values):
 * ElectionsCarousel.init({
 *   url            :'http://127.0.0.1:8080/src/assets/fixtures/results.js', //data feed URL
 *   callback       :'gNews_getRidingDetailsCallback', //JSON-P callback
 *   headingtext    : '2011 Election Results', //h1 tag text content
 *   slidewidth     : 600, //width of each riding 'slide'
 *   templateid     : '#viewTemplate', //template identifier (within template file)
 *   templatepath   : 'http://127.0.0.1:8080/src/assets/templates/viewFull.mustache', //path to Mustache template file
 *   transitiontime : 300, //milliseconds (for slide movement)
 });
 *
 * [b.] No parameters (uses default values listed above):
 * ElectionsCarousel.init({});
 *
 * [c.] Overriding selected parameter's default value:
 * ElectionsCarousel.init({transitiontime: 100});
 * 
 */
var ElectionsCarousel = (function($) {
  'use strict';

  var _config = {
    css: {
      control: '.ctrl',
      controlBack: '.ctrl--back',
      controlNext: '.ctrl--next',
      disabledClassname: 'ctrl--disabled', //not a typo; do not include dot
      listCandidateRoot: '.riding__list-candidate--',
      mainContainer: '.ec-results',
      ridingIdRoot: '#art_',
      ridingWrapper: '.ec-results__wrapper-ridings'
    }
  };

  var _initialize = {
    initWrapperPosition: 0,
    maxRightHorizontalPosition: 0,
    movementCounter: 0 //control click/key tracking
  };

  var _roundToTwoDec = function(num) {
    /*
     * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     */
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  var _setBarGraphHeights = function(options) {
    /*
     * set heights of bars on graph
     */
    var mainStyle = document.styleSheets[0];
    var oLength = mainStyle.cssRules.length;
    var barHeight = 250 * (options.percentage / 100);
    mainStyle.insertRule(
      _config.css.ridingIdRoot +
        options.id +
        ' ' +
        _config.css.listCandidateRoot +
        options.party +
        '{height:' +
        barHeight +
        'px!important;position:relative}',
      oLength
    );
  };

  var _calculateCandidateVotePercentages = function(data) {
    /*
     * calculate candidate vote percentages
     */
    for (var i = 0; i < data.length; i++) {
      var riding = data[i];
      var ridingId = riding.id;
      var ridingResults = riding.results;
      var ridingResultsVotes = ridingResults.map(function(item) {
        return item.votes;
      });
      //total votes for riding
      var totalRidingResultsVotes = ridingResultsVotes.reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
      riding.voteTotal = totalRidingResultsVotes;

      riding.results.forEach(function(candidate) {
        var candidateParty = candidate.partyCode.toLowerCase();
        var candidateVotes = candidate.votes;
        var candidateVotePercentage = _roundToTwoDec(
          candidateVotes / totalRidingResultsVotes * 100
        );
        candidate.votePercentage = candidateVotePercentage;
        _setBarGraphHeights({
          id: ridingId,
          party: candidateParty,
          percentage: candidateVotePercentage
        });
        //winning candidate
        candidate.winner = candidate.ifWon = candidate.ifElected = candidate.isElected;
      });
    }
  };

  var _sortCandidatesByDescendingVotes = function(data) {
    for (var i = 0; i < data.length; i++) {
      var riding = data[i];
      var ridingResults = riding.results;
      //descending order
      var ridingResultsByVotes = ridingResults.sort(function(a, b) {
        return b.votes - a.votes;
      });
      $(this).parent.resultsByVotes = ridingResultsByVotes;
    }
  };

  var _rotateSlides = function(newWrapperPosition, transitionTime) {
    $(_config.css.ridingWrapper).animate({ left: newWrapperPosition }, transitionTime, function() {
      /* action on animation completion */
    });
  };

  var _disableCtrl = function(ctrlClass) {
    var ctrl = $(ctrlClass);
    ctrl.addClass(_config.css.disabledClassname);
    ctrl.attr('aria-disabled', 'true'); //not strictly required anymore (since button element natively supports 'disabled' attribute)
    ctrl.attr('disabled', 'disabled');
  };

  var _reEnableCtrl = function(ctrlClass) {
    var ctrl = $(ctrlClass);
    ctrl.removeClass(_config.css.disabledClassname);
    ctrl.attr('aria-disabled', 'false'); //redundant
    ctrl.removeAttr('disabled');
  };

  var _calculateHorizontalPosition = function(whichControl, data) {
    var slideWidth = data.slideWidth + 4; //additional (4px) for borders
    var ridingCounter = 0;
    data.forEach(function(riding) {
      ridingCounter++;
    });
    var numberOfSlides = ridingCounter;

    var wrapperWidth = numberOfSlides * slideWidth; //total (horizontal) width of all slides
    //limits for horizontal positioning of wrapper
    var maxLeftHorizontalPosition = -((numberOfSlides - 1) * slideWidth); //equivalent to: -(wrapperWidth - (1*slideWidth));

    if (whichControl.indexOf('back') != -1) {
      _initialize.movementCounter--;
    } else if (whichControl.indexOf('next') != -1) {
      _initialize.movementCounter++;
    }

    var newWrapperPosition =
      _initialize.initWrapperPosition - _initialize.movementCounter * slideWidth;

    if (newWrapperPosition >= _initialize.maxRightHorizontalPosition) {
      _rotateSlides(newWrapperPosition, data.transitionTime);
      //disable/re-enable controls
      _disableCtrl(_config.css.controlBack);
      _reEnableCtrl(_config.css.controlNext);
      if (newWrapperPosition > _initialize.maxRightHorizontalPosition) {
        //reached 1st slide/max. Back limit
        //stop movement and reset for next click
        _initialize.movementCounter = 0;
        newWrapperPosition = _initialize.maxRightHorizontalPosition;
      }
    } else if (newWrapperPosition <= maxLeftHorizontalPosition) {
      _rotateSlides(newWrapperPosition, data.transitionTime);
      //disable/re-enable controls
      _disableCtrl(_config.css.controlNext);
      _reEnableCtrl(_config.css.controlBack);
      if (newWrapperPosition < maxLeftHorizontalPosition) {
        //reached last slide - ie. max Next limit
        //stop movement and reset for next click
        _initialize.movementCounter = numberOfSlides - 1;
        newWrapperPosition = maxLeftHorizontalPosition;
      }
    } else {
      //within allowable range of movement
      _rotateSlides(newWrapperPosition, data.transitionTime);
      _reEnableCtrl(_config.css.controlNext);
      _reEnableCtrl(_config.css.controlBack);
    }
  };

  var _bindCtrlListener = function(events, data) {
    $(document).on(events, _config.css.control, function(e) {
      //jQuery 1.7+
      if (e.type === 'click') {
        //Enter key, spacebar, or mouse click
        var whichControl = $(e.target).attr('data-js');
        _calculateHorizontalPosition(whichControl, data);
      }
    });
  };

  var _renderTemplate = function(data) {
    _sortCandidatesByDescendingVotes(data);
    _calculateCandidateVotePercentages(data);

    //attach Mustache template
    $.get(data.templatePath, function(templates) {
      var template = $(templates)
        .filter(data.templateId)
        .html();
      $(_config.css.mainContainer).append(Mustache.render(template, data));
    });

    data.lower = function() {
      return function(text, render) {
        return render(text).toLowerCase();
      };
    };

    //attach behavior to the controls' onkeydown and onclick events
    _bindCtrlListener('keydown click', data);
  };

  var extendData = function(
    data,
    headingTxt,
    slidewidth,
    templateid,
    templatepath,
    transitiontime
  ) {
    var userDefinedSettings = {
      headingText: headingTxt,
      slideWidth: slidewidth,
      templateId: templateid,
      templatePath: templatepath,
      transitionTime: transitiontime
    };
    $.extend(data, userDefinedSettings);
    //      return data.pollsReported; //TEST_CODE2
    _renderTemplate(data);
  };

  var _getJsonData = function(
    url,
    callback,
    headingtext,
    slidewidth,
    templateid,
    templatepath,
    transitiontime
  ) {
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/json; charset=UTF-8',
      jsonpCallback: callback,
      dataType: 'jsonp',
      custom: headingtext
    }).done(function(data, custom) {
      var headingTxt = this.custom;
      extendData(data, headingTxt, slidewidth, templateid, templatepath, transitiontime);
    });
  };

  var main = function(options) {
    //set default values
    options.url =
      typeof options.url !== 'undefined'
        ? options.url
        : 'http://127.0.0.1:8080/src/assets/fixtures/results.js';
    options.callback =
      typeof options.callback !== 'undefined' ? options.callback : 'gNews_getRidingDetailsCallback';
    options.headingtext =
      typeof options.headingtext !== 'undefined' ? options.headingtext : '2011 Election Results';
    options.slidewidth = typeof options.slidewidth !== 'undefined' ? options.slidewidth : 600;
    options.templateid =
      typeof options.templateid !== 'undefined' ? options.templateid : '#viewTemplate';
    options.templatepath =
      typeof options.templatepath !== 'undefined'
        ? options.templatepath
        : 'http://127.0.0.1:8080/src/assets/templates/viewFull.mustache';
    options.transitiontime =
      typeof options.transitiontime !== 'undefined' ? options.transitiontime : 300;

    _getJsonData(
      options.url,
      options.callback,
      options.headingtext,
      options.slidewidth,
      options.templateid,
      options.templatepath,
      options.transitiontime
    );
  };

  return {
    init: main
    //    , extendData: extendData //TEST_CODE2
  };
})(jQuery);

module.exports = ElectionsCarousel;
