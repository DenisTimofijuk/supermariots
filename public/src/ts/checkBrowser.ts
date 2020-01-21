export default function checkBrowser() {
    let supported = false;
    const sUsrAg = navigator.userAgent;
  
    if (sUsrAg.indexOf('Firefox') > -1) {
      supported = false;
    } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
      supported = false;
    } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
      supported = true;
    } else if (sUsrAg.indexOf('Trident') > -1) {
      supported = false;
    } else if (sUsrAg.indexOf('Edge') > -1) {
      supported = false;
    } else if (sUsrAg.indexOf('Chrome') > -1) {
      supported = true;
    } else if (sUsrAg.indexOf('Safari') > -1) {
      supported = false;
    } else {
      supported = false;
    }
  
    if(!supported){
      displayWarning()
    }
  
    return supported;
  }
  
  function displayWarning() {
      const waring = document.getElementById('browseWarning') as HTMLElement;
      waring.style.display = "block";

      const introText = document.getElementById('introText') as HTMLElement;
      introText.style.display = "none";
  }