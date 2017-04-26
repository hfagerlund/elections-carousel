/*
 * elections-carousel
 * @copyright (c) Heini Fagerlund
 * @version 1.0.0
 * @license MIT
 */

var $ = require('jquery'); //req'd for TAPE tests
require('../../sass/screen.scss');

var defaultFeedURL = 'http://127.0.0.1:8080/src/assets/fixtures/results.js'; //local URL (Node HTTP server running)

var config = {
    css: {
        classes:{
            mainContainer     : 'ec-results',
            riding            : 'riding',
            ridingWrapper     : 'ec-results__wrapper-ridings',
            ridingList        : 'riding__list',
            ridingTextSummary : 'riding__textSummary',
            ridingVoteTotal   : 'riding__textSummary-totalVotes',
            ridingHeader      : 'riding__header',
            ridingHeading     : 'riding__heading',
            ridingWinner      : 'riding__list-candidate--winner',
            ridingPointForm   : 'riding__textSummary-candidate',
            label             : 'label',
            capitalize        : 'cap',
            percentage        : 'percentage',
            strong            : 'strong',
            candidate         : 'riding__list-candidate',
            control           : 'ctrl',
            controlWrapper    : 'ec-results__wrapper-controls',
            back              : 'ctrl--back',
            next              : 'ctrl--next',
            disabled          : 'ctrl--disabled'
        },
        listCandidateRoot   : 'riding__list-candidate--',
        textCandidateRoot   : 'riding__textSummary-candidate--',
        ridingIdRoot        : 'art_',
        ctrlClassRoot       : 'ctrl--'
    }
};
var classname = config.css.classes; //for abbreviation

var defaultMainHeadingText = '2011 Election Results'; //default value (displayed if user does not provide custom text)

//BEGIN carousel settings
var slideWidth = 500 + 4; //TODO: integrate with CSS(?)
var transitionTime = 300; //milliseconds for slide transition/animation
var directionCounter = 0; //initial direction of slide movement
var initialWrapperPosition = 0;
var newWrapperPosition = 0;
//limits for horizontal positioning of wrapper
var maxRightHorizontalPosition = 0;
var maxLeftHorizontalPosition;
var numberOfSlides;
var wrapperWidth; //total width of all slides (aligned horizontally)
//END carousel settings

var ElectionsCarousel = function() {
  'use strict';

  //BEGIN customPubsub
  /*
   * as per https://addyosmani.com/blog/jquery-1-7s-callbacks-feature-demystified/
  **/
  var topics = {};

  $.Topic = function( id ) {
      var callbacks,
	      method,
	      topic = id && topics[ id ];
      if ( !topic ) {
	      callbacks = $.Callbacks();
	      topic = {
		      publish: callbacks.fire,
		      subscribe: callbacks.add,
		      unsubscribe: callbacks.remove
	      };
	      if ( id ) {
		      topics[ id ] = topic;
	      }
      }
      return topic;
  };
  //END customPubsub
};

ElectionsCarousel.prototype = {
  init: function (options) {
     //use default if no user-generated values
     options.userURL = typeof options.userURL !== 'undefined' ? options.userURL : defaultFeedURL;
     options.userMainHeadingText = typeof options.userMainHeadingText !== 'undefined' ? options.userMainHeadingText : defaultMainHeadingText;
     this.doAjax(options.userURL, options.userMainHeadingText);

     //listen for events
     $.Topic('elections/results/feed/updated').subscribe(this.renderTemplate);
     $.Topic('elections/results/percentages/updated').subscribe(this.displayBars);  
  },
  addAnimation: function(data){
        /*
         * attach animation behavior to the controls' onclick and onkeydown events
        **/
        $( document ).on( 'click', 'div.ctrl', function(e) { //jQuery 1.7+
              var whichControl = $(this).attr('class');
              ElectionsCarousel.prototype.ctrlClick(whichControl, data);
        });

        //keyboard support
        $( document ).on( 'keydown', 'div.ctrl', function(e) {
              var whichControl = $(e.target).attr('class');
              ElectionsCarousel.prototype.ctrlClick(whichControl, data);
        });
  },
  ctrlClick: function(ctrlName, data){
        numberOfSlides = data.ridingCounter;
        var wrapperWidth = (numberOfSlides*slideWidth); //total (horizontal) width of all slides
        //limits for horizontal positioning of wrapper
        var maxLeftHorizontalPosition = -((numberOfSlides - 1)*slideWidth); //equivalent to: -(wrapperWidth - (1*slideWidth));

        if (ctrlName.indexOf('back') != -1) {
          directionCounter--;
        } else {
          directionCounter++;
        }

        newWrapperPosition = initialWrapperPosition - (directionCounter*slideWidth);

        //boundaries for slide movement
        if (newWrapperPosition > maxRightHorizontalPosition || newWrapperPosition < maxLeftHorizontalPosition) { //slide movement disallowed
          if(newWrapperPosition > maxRightHorizontalPosition) { //reached 1st slide/max. Back limit
                //stop movement and reset for next click
                directionCounter = 0;
                newWrapperPosition = maxRightHorizontalPosition;
                //disable/re-enable controls
                ElectionsCarousel.prototype.disableCtrl('back');
                ElectionsCarousel.prototype.reEnableCtrl('next');
          } else { //reached last slide - ie. max Next limit
                //stop movement and reset for next click
                directionCounter = numberOfSlides - 1;
                newWrapperPosition = maxLeftHorizontalPosition;
                //disable/re-enable controls
                ElectionsCarousel.prototype.disableCtrl('next');
                ElectionsCarousel.prototype.reEnableCtrl('back');
          } //END max limits
        } else { //within allowed range of movement
            $( '.' + classname.ridingWrapper).animate({left: newWrapperPosition}, transitionTime, function() { /* action on animation completion */ }); //rotate slide
            //disable/re-enable controls
            switch (newWrapperPosition)
		        {
		           case maxRightHorizontalPosition:
		               ElectionsCarousel.prototype.disableCtrl('back');
                   ElectionsCarousel.prototype.reEnableCtrl('next');
		               break;
               case maxLeftHorizontalPosition:
		               ElectionsCarousel.prototype.disableCtrl('next');
                   ElectionsCarousel.prototype.reEnableCtrl('back');
                   break;
		           default:
		               ElectionsCarousel.prototype.reEnableCtrl('back');
                   ElectionsCarousel.prototype.reEnableCtrl('next');
		        }
        }
  },
  disableCtrl: function(ctrlClass){
      $('.'+config.css.ctrlClassRoot+ctrlClass).addClass(classname.disabled);
      $('.'+config.css.ctrlClassRoot+ctrlClass).attr('aria-disabled','true');
  },
  reEnableCtrl: function(ctrlClass){
      $('.'+config.css.ctrlClassRoot+ctrlClass).removeClass(classname.disabled);
      $('.'+config.css.ctrlClassRoot+ctrlClass).attr('aria-disabled','false');
  },
  displayBars: function(notificationMsgObj){
      var mainStyle = document.styleSheets[0];
      var oLength = mainStyle.cssRules.length;
      var barHeight = 250*(notificationMsgObj.candidateVotePercentage/100);
      mainStyle.insertRule('#' + config.css.ridingIdRoot + notificationMsgObj.ridingId + ' .'+ config.css.listCandidateRoot + notificationMsgObj.candidateParty + '{height:' + barHeight +'px!important;position:relative}', oLength);
  },
  doAjax: function(url, headingtext){
      $.ajax({
         type: 'GET',
         url: url,
         contentType: 'application/json; charset=UTF-8',
         jsonpCallback: 'gNews_getRidingDetailsCallback',
         dataType: 'jsonp',
         custom: headingtext
      }).done(function (data) {
          var headingText = this.custom;
          ElectionsCarousel.prototype.transformData(data, headingText);
	    });
   },
  publishNotification: function(options){
    /*
     * as per https://addyosmani.com/blog/jquery-1-7s-callbacks-feature-demystified/
    **/
    var dfd = $.Deferred();
    var topic = $.Topic( options.topic );
    dfd.done( topic.publish ); //publish notification to subscribers when deferred resolved
    dfd.resolve( options.notificationMsg ); //pass arguments to subscribers
  },
  roundToTwoDec: function(num){
    /* source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    **/
    return +(Math.round(num + "e+2")  + "e-2");
  },
  renderTemplate: function(notificationMsgObj) {
         /*
          * render Mustache template
         **/
         var mainHeadingText = notificationMsgObj.headingtext;
         $.get('http://127.0.0.1:8080/src/assets/templates/viewFull.mustache', function(templates) { 
          var templateSettings = {
            pageTitle             : mainHeadingText,
            mainClass             : classname.mainContainer,
            ridingClass           : classname.riding,
            wrapperRidings        : classname.ridingWrapper,
            wrapperControls       : classname.controlWrapper,
            ElectionsCarouselClass: classname.ElectionsCarousel,
            ridingVoteTotalClass  : classname.ridingVoteTotal,
            ridingHeaderClass     : classname.ridingHeader,
            ridingHeadingClass    : classname.ridingHeading,
            ridingListClass       : classname.ridingList,
            ridingTextSummaryClass: classname.ridingTextSummary,
            ridingWinnerClass     : classname.ridingWinner,
            ridingPointFormClass  : classname.ridingPointForm,
            labelClass            : classname.label,
            capitalizeClass       : classname.capitalize,
            percentageClass       : classname.percentage,
            strongClass           : classname.strong,
            candidateClass        : classname.candidate,
            listCandidateRoot     : config.css.listCandidateRoot,
            textCandidateRoot     : config.css.textCandidateRoot,
            idRiding              : config.css.ridingIdRoot
           };
           $.extend(notificationMsgObj.data, templateSettings);

           var template = $(templates).filter('#viewTemplate').html();
           $('.' + classname.mainContainer).append(Mustache.render(template, notificationMsgObj.data)); //attaches the component to any element to which 'ec-results' class is added 
          });
         ElectionsCarousel.prototype.addAnimation(notificationMsgObj.data);
  },
  transformData: function(data, headingtext){
        var ridingCounter = 0;
        data.forEach(function(riding){
              ridingCounter++;
        });
        data.ridingCounter = ridingCounter;

        data.lower = function () {
          return function (text, render) {
             return render(text).toLowerCase();
          };
        };

        data.ifWon = function () {
              return function() {
                var candidate = this;
                var ifWonIt = candidate.isElected ? 'Elected' : '';
                return ifWonIt;
              };
            };

        data.ifElected = function () {
              return function() {
                var candidate = this;
                var ifElected = candidate.isElected ? ' was elected with ' : ' received ';
                return ifElected;
              };
            };

        data.winner = function () {
              return function() {
                var candidate = this;
                var winner = candidate.isElected?' ' + classname.ridingWinner:'';
                return winner;
              };
            };

        data.ridingVoteTotal = function () {
              return function() {
                var ridingResults = this.results;
                var ridingResultsVotes = ridingResults.map(function(item){ return item.votes; });
	              var totalRidingResultsVotes = ridingResultsVotes.reduce(function(pv, cv) { return pv + cv; }, 0);
                return totalRidingResultsVotes;
              };
        };

        //reorder both bar graph and text block results by votes
        data.forEach(function(riding){
          var ridingResults = riding.results;
          var ridingResultsByVotes = ridingResults.sort(function(a, b){return b.votes-a.votes;}); //descending order
          $(this).parent.resultsByVotes = ridingResultsByVotes;
        });

        //calculate candidate vote percentages
        data.forEach(function(riding){
          var ridingId = riding.id;
          var ridingResults = riding.results;
          var ridingResultsVotes = ridingResults.map(function(item){ return item.votes; });
	  var totalRidingResultsVotes = ridingResultsVotes.reduce(function(pv, cv) { return pv + cv; }, 0);

          riding.results.forEach(function(candidate){
             var candidateParty = candidate.partyCode.toLowerCase();
             var candidateVotes = candidate.votes;
             var candidateVotePercentage = ElectionsCarousel.prototype.roundToTwoDec((candidateVotes/totalRidingResultsVotes)*100); 
             candidate.votePercentage = candidateVotePercentage;

             ElectionsCarousel.prototype.publishNotification({topic: 'elections/results/percentages/updated', notificationMsg: {ridingId, candidateParty, candidateVotePercentage} });
          });
        });

        ElectionsCarousel.prototype.publishNotification({topic: 'elections/results/feed/updated', notificationMsg: {data, headingtext} });
   }
};

module.exports = ElectionsCarousel;
