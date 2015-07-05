/*!
 * elections-carousel
 * @copyright (c) 2015 Heini Fagerlund
 * @version 0.1.1
 * @license MIT
 */
var url = 'http://path-to-json-feed-election-results.js'; // REPLACE URL
jQuery.ajax({
   type: 'GET',
   url: url, 
   contentType: "application/json; charset=UTF-8",
   jsonpCallback: 'gNews_getRidingDetailsCallback',
   dataType: 'jsonp',
   success: createResultsList
});
 
function createResultsList(json) {
    jQuery('#eResults').html('');
    for (var i in json) {
        riding = json[i].name;
    
        articleId = 'art_' + json[i].id;

        jQuery('#eResults').append('<article id=\"' + articleId +'\" class=\"riding\"><header><h2>Riding of: ' + riding + '</h2></header></article>');

        ridingCard = jQuery('#' + articleId);
        ridingCard.append('<ol class=\"riding__list\"></ol>');
        candidateList = ridingCard.children("ol");
     
        results = json[i].results;
        candidateInfo(results);
     }
    } 

    function candidateInfo(results){
        var partyVotesArr = [];
        var totalVotesForParty = 0;
       
        for (var i in results) {
            candidateName = results[i].name;
            candidateParty = (results[i].partyCode).toLowerCase();
            candidateVotes = results[i].votes;
            winner = results[i].isElected?' riding_winner':'';

            partyVotesArr.push(candidateVotes);

            candidateList.append('<li class=\"riding__candidate riding__candidate_' + candidateParty  + winner + '\"><span class="cap">' + candidateParty + '</span> Candidate ' + candidateName + ' won ' + candidateVotes + ' votes</li>'); 
        } 
        totalVotesForParty = sumPartyVotes(partyVotesArr);
        jQuery(candidateList).after('<p class=\"riding__totalVotes\">Total votes for this riding: <strong>' + totalVotesForParty + '</strong> votes</p>'); 
        percentageVotesForCandidate(partyVotesArr);
    }

    function sumPartyVotes(partyVotesArr) {
        var totalPartyVotes = 0;
        for (var j = 0; j < partyVotesArr.length; j++) {
            totalPartyVotes += partyVotesArr[j] << 0;
        }
        return totalPartyVotes;
    }

    function percentageVotesForCandidate(partyVotesArr) {
        totalVotesForParty = sumPartyVotes(partyVotesArr);
        var percentageVotes = 0;

        for (var j = 0; j < partyVotesArr.length; j++) {
            percentageVotes =  Math.round((partyVotesArr[j]/totalVotesForParty)*100); //rounded up if >= 0.5, otherwise rounded down 
            jQuery("li:contains('" + partyVotesArr[j] + "')").append(' (' +  percentageVotes + String.fromCharCode(37) + ' of the vote)'); //percentage sign symbol
        }  
	return percentageVotes; //TODO: refactor this function
    }
