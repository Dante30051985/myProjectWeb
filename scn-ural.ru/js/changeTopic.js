let switcher = document.querySelector('input[name=switcher]');
let animationSwitcher = document.querySelector('label[for=switcher]');

switcher.onclick = (e)=>{
    if (switcher.checked == true) {
        let widthSwitcher = document.querySelector('div.switcher').offsetWidth-33;
        animationSwitcher.style.marginLeft = widthSwitcher+'px';
        document.querySelector('div.switcher').style.background = '#fff';
        changeBodySiteWhite();
    } else {
        animationSwitcher.style.marginLeft = '0em';
        document.querySelector('div.switcher').style.background = '#2c3038';
        changeBodySiteDark();
    }
}

changeBodySiteWhite = () => {


}

changeBodySiteDark = () => {

}