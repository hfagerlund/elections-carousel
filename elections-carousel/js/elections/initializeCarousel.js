function initializeCarousel() {
//check browser support for DOM methods
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
//check whether element exists
  if (!document.getElementById("eResults")) return false;

 //add a wrapper around all the articles (inside of main)
 var main = document.getElementById("eResults");
 mainContents = main.innerHTML;
 newMainContents = '<div id="wrapper">' + mainContents + '</div>';
 main.innerHTML = newMainContents;

//----
//TODO: refactor
 btnBack = document.createElement("a");
 btnBack.setAttribute("class","btn btn--back");
 btnBack.setAttribute("href","#");
 btnBack.innerHTML = "&lsaquo;"; 

 btnNext = document.createElement("a");
 btnNext.setAttribute("class","btn btn--next");
 btnNext.setAttribute("href","#");
 btnNext.innerHTML = "&rsaquo;";
/* //TODO: refactor
function createBtn(btnID,btnText){ //eg. where btnID = 'Back'
 //btnName = "btn" + btnID;
 btnID = document.createElement("a");
 btnClassname = (btnID == 'btnBack') ? 'back' : 'next';
 btnID.setAttribute("class","btn btn--" + btnClassname);
 btnID.setAttribute("href","#");
 btnID.innerHTML = btnText; //eg. "&lsaquo;"
}
*/

//get all the articles in main
var ridings = main.getElementsByTagName("article");

//re-position btns (inside main)
main.appendChild(btnBack);
main.appendChild(btnNext);

numOfClicksFwd = numOfClicksBack = newPosnOfWrapper = prevPosnOfWrapper = 0;

//attach animation behavior to the buttons' onclick event
btnBack.addEventListener("click", function(e){evtTarget = e.target; btnClick('Back',evtTarget); e.preventDefault();}, false); 
btnNext.addEventListener("click", function(e){evtTarget = e.target; btnClick('Next',evtTarget); e.preventDefault();}, false);
} 

jQuery(window).load(function() { 
      initializeCarousel();
});
