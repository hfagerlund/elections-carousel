/*!
 * elections-carousel
 * @copyright (c) 2015 Heini Fagerlund
 * @version 0.2.1
 * @license MIT
 */

(function(){
	'use strict';
	/**
	 * namespace
	 * @alias BoD
	 */
	if(!window.BoD) {
	    window.BoD = {};
	}

//------------
//CONFIGURATION:
//edit only the values below -

var numOfSlides = 10;
var slideWidth = 500; //width of an individual slide
var timeInterval = 300; //number of milliseconds for slide transition/animation
//------------
//initialization (do not edit below)
var main = document.getElementById("eResults");

//initial position of 'slides'
var numOfClicksFwd = 0;
var numOfClicksBack = 0;
var newPosnOfWrapper = 0;
var prevPosnOfWrapper = 0;
var wrapperWidth = (numOfSlides*slideWidth); //total (horizontal) width of all slides
//limits for horizontal positioning of wrapper
var maxLtHorizonPosn = -(wrapperWidth - (1*slideWidth)); 
var maxRtHorizonPosn = 0;

function rotateCarousel(elementID,slideToXPosn,transTime) {
  $( '#' + elementID ).animate({
    left: slideToXPosn,
  }, transTime, function() {
    // animation complete
  });
}
window.BoD.rotateCarousel = rotateCarousel;


function disableBtn(btnClass){
	var mainStyle = document.styleSheets[0];
	var oLength = mainStyle.cssRules.length;
	jQuery(".btn--"+btnClass).addClass("btn_disabled");
	mainStyle.insertRule('.btn_disabled{animation:none!important;background-color:#cccccc!important;cursor:text!important}', oLength);
}
window.BoD.disableBtn = disableBtn;


function btnClick(btnName,evtTarget){
    newPosnOfWrapper = (btnName == 'btnBack') ? prevPosnOfWrapper+((numOfClicksBack+1)*slideWidth) : prevPosnOfWrapper-((numOfClicksFwd+1)*slideWidth);
    var btnClass = (btnName == 'btnBack') ? 'back' : (btnName == 'btnNext') ? 'next' : '';

    if (newPosnOfWrapper >= maxLtHorizonPosn && newPosnOfWrapper <= maxRtHorizonPosn){ 
            jQuery(".btn--"+btnClass).removeClass("btn_disabled");
			if(newPosnOfWrapper === maxRtHorizonPosn || newPosnOfWrapper === maxLtHorizonPosn) { 
				//disable Back button on display of first article
				//disable Next button on display of last article
				BoD.disableBtn(btnClass);
		      }
            BoD.rotateCarousel("wrapper",newPosnOfWrapper,timeInterval);
    } else if ((newPosnOfWrapper > maxRtHorizonPosn) && (btnName == 'btnBack')) { 
            BoD.disableBtn(btnClass);
            newPosnOfWrapper = maxRtHorizonPosn; 
    } else if ((newPosnOfWrapper < maxLtHorizonPosn) && (btnName == 'btnNext')){ 
            BoD.disableBtn(btnClass);
            newPosnOfWrapper = maxLtHorizonPosn;
    } 
    
    if ( (newPosnOfWrapper <= (maxRtHorizonPosn-(1*slideWidth)) ) && (btnName == 'btnNext')) {
            jQuery(".btn--back").removeClass("btn_disabled");
    }
    if ( (newPosnOfWrapper >= (maxLtHorizonPosn+(1*slideWidth)) ) && (btnName == 'btnBack')) {
            jQuery(".btn--next").removeClass("btn_disabled");
    }

    prevPosnOfWrapper = newPosnOfWrapper; 
 
    if(btnName == 'btnBack') {
        numOfClicksBack = 0;
    } else if(btnName == 'btnNext') {
        numOfClicksFwd = 0; 
    }
}
window.BoD.btnClick = btnClick;


function createBtn(btnTitle, btnClass) { 
    var btnName = document.createElement("a");
	btnName.setAttribute("class","btn " + btnClass);
	btnName.setAttribute("href","#");
	btnName.innerHTML = ( (btnClass === "btn--back") ? "&lsaquo;" : "&rsaquo;" );
    main.appendChild(btnName);

	BoD.disableBtn("back"); //initial state

    //attach animation behavior to the buttons' onclick event
    btnName.addEventListener("click", function(e){var evtTarget = e.target; BoD.btnClick(btnTitle,evtTarget); e.preventDefault();}, false);
}
window.BoD.createBtn = createBtn;


function calcTotalVotesForRiding(result){
	var totalVotes = [];
	var votes = result.map(function(item){ return item.votes; });
	var totalVotesForRiding = votes.reduce(function(pv, cv) { return pv + cv; }, 0);
	totalVotes.push( votes.reduce(function(pv, cv) { return pv + cv; }, 0) );
	return totalVotes.shift();
}
window.BoD.calcTotalVotesForRiding = calcTotalVotesForRiding;


function roundToTwoDec(num){
	return +(Math.round(num + "e+2")  + "e-2"); //as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
}
window.BoD.roundToTwoDec = roundToTwoDec;


function createResultsListFunc(json) { 
    jQuery('#eResults').html(''); //clears prev results
	
	var ridings = json.map(function(item){ return item; });

	ridings.forEach(function(riding){
	    var articleId = 'art_' + riding.id;
		var ridingName = riding.name;
		jQuery('#eResults').append('<article id=\"' + articleId +'\" class=\"riding\"><header><h2>Riding of: ' + ridingName + '</h2></header></article>');
		var ridingCard = jQuery('#' + articleId); 
		ridingCard.append('<ol class=\"riding__list\"></ol>');
		var candidateList = ridingCard.children("ol"); 
	});
	jQuery('.riding').wrapAll('<div id=\"wrapper\"></div>');

	//add Back and Next buttons
	BoD.createBtn("btnBack", "btn--back");
	BoD.createBtn("btnNext", "btn--next");

    var results = json.map(function(item){ return item.results; }); 
        
	jQuery('.riding').children("ol").after('<p class=\"riding__totalVotes\">Total votes for this riding: <strong>' + /*totalVotes +*/ '</strong> votes</p>');
	
    var articleID = 0;
    results.forEach(function(result){
	    articleID += 1;
	    var totalVotesForRiding = BoD.calcTotalVotesForRiding(result);
	    jQuery('#art_' + articleID).children('.riding__totalVotes').children('strong').append(totalVotesForRiding);

        for (var i in result) {
            var candidateStats = { 
		        name : result[i].name,
		        partyId: result[i].partyId,
		        votes: result[i].votes,
		        isElected: result[i].isElected,
		        partyCode: result[i].partyCode
		    };
                    
		    var percentageVotes = BoD.roundToTwoDec((candidateStats.votes/totalVotesForRiding)*100); //round to 2 decimal places
		    var winner = candidateStats.isElected?' riding_winner':'';
		    var ridingCard = jQuery('#art_' + articleID);
		    var candidateList = ridingCard.children("ol");
		    candidateList.append('<li class=\"riding__candidate riding__candidate_' + candidateStats.partyCode.toLowerCase()  + winner + '\"><span class="cap">' + candidateStats.partyCode.toLowerCase() + '</span> Candidate ' + candidateStats.name + ' won ' + candidateStats.votes + ' votes (' + percentageVotes + '% of the vote)</li>');
        }
    });
var ridingWinner = jQuery('.riding_winner');
ridingWinner.prepend("Elected ");
} 
window.BoD.createResultsListFunc = createResultsListFunc;


function initializeCarousel() { 
    //check browser support for DOM methods
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    //check whether element exists
    if (!document.getElementById("eResults")) return false;
} 
window.BoD.initializeCarousel = initializeCarousel;


})(); //END namespace


jQuery('html').addClass('js'); //avoid FOUC

var url = 'http://path-to-json-feed-election-results.js'; // REPLACE URL
jQuery.ajax({
   type: 'GET',
   url: url, 
   contentType: "application/json; charset=UTF-8",
   jsonpCallback: 'gNews_getRidingDetailsCallback',
   dataType: 'jsonp',
   success: BoD.createResultsListFunc
});

document.addEventListener('DOMContentLoaded', function () {
    BoD.initializeCarousel();
});
