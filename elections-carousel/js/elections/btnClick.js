function btnClick(btnID,evtTarget){
    newPosnOfWrapper = (btnID == 'Back') ? prevPosnOfWrapper+((numOfClicksBack+1)*500) : prevPosnOfWrapper-((numOfClicksFwd+1)*500);
    
    if (newPosnOfWrapper >= -4500 && newPosnOfWrapper <= 0){ 
            rotateCarousel("wrapper",newPosnOfWrapper,300);
    } else if ((newPosnOfWrapper > 0) && (btnID == 'Back')) { 
            newPosnOfWrapper = 0; 
    } else if ((newPosnOfWrapper < -4500) && (btnID == 'Next')){
            newPosnOfWrapper = -4500; 
    } 

    prevPosnOfWrapper = newPosnOfWrapper; 
 
    if(btnID == 'Back') {
        numOfClicksBack = 0;
    } else if(btnID == 'Next') {
        numOfClicksFwd = 0; 
    }
}
