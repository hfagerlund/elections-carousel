function enableBtn(btnID){
            btnClass = (btnID == 'Back') ? 'back' : (btnID == 'Next') ? 'next' : '';
            mainStyle = document.styleSheets[0];
            oLength = mainStyle.cssRules.length;
            //mainStyle.deleteRule(oLength);
	    mainStyle.insertRule('.btn--' + btnClass + ' { background-color:#99cedb; cursor:pointer}', oLength);
            $(".btn--"+btnID).removeClass("btn_disabled"); 
}

function disableBtn(btnID){
            btnClass = (btnID == 'Back') ? 'back' : (btnID == 'Next') ? 'next' : '';
            mainStyle = document.styleSheets[0];
            oLength = mainStyle.cssRules.length;
            mainStyle.insertRule('.btn--' + btnClass + ' { background-color:#cccccc; cursor:text}', oLength);
            $(".btn--"+btnID).addClass("btn_disabled"); 
}

function btnClick(btnID,evtTarget){
    newPosnOfWrapper = (btnID == 'Back') ? prevPosnOfWrapper+((numOfClicksBack+1)*500) : prevPosnOfWrapper-((numOfClicksFwd+1)*500);
    
    if (newPosnOfWrapper >= -4500 && newPosnOfWrapper <= 0){ 
            rotateCarousel("wrapper",newPosnOfWrapper,300);
            enableBtn(btnID);
    } else if ((newPosnOfWrapper > 0) && (btnID == 'Back')) { 
            newPosnOfWrapper = 0; 
            disableBtn(btnID);
    } else if ((newPosnOfWrapper < -4500) && (btnID == 'Next')){
            newPosnOfWrapper = -4500; 
            disableBtn(btnID);
    } 

    if ((newPosnOfWrapper <= -500) && (btnID == 'Next')) {
            enableBtn('Back');
    }
    if ((newPosnOfWrapper >= -4000) && (btnID == 'Back')) {
            enableBtn('Next');
    }

    prevPosnOfWrapper = newPosnOfWrapper; 
 
    if(btnID == 'Back') {
        numOfClicksBack = 0;
    } else if(btnID == 'Next') {
        numOfClicksFwd = 0; 
    }
}
