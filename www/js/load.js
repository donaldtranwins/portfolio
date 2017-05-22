$(document).ready(initialize);

function initialize(){
    appendEmail();
    appendPhone();
    openMap();
    allowCollapseHamburger();
}

function appendEmail(){
    let e = "tra";
    e += "ndo";
    e += "nald";
    e += "@gm";
    e += "ail";
    e += ".c";
    e += "om";
    $('#e').text(e).attr('href', `mailto:${e}?subject=Position%20Available:%20&body=Hi%20Donald,%0A%0A%20I%20read%20your%20resume,%20love%20it.%20%20I%20wanted%20to%20reach%20out%20about%20an%20opportunity%20we%20have%20for%20you:%0A%0A%0AThanks,%0A%0A`)
}

function appendPhone(){
    let p = '71';
    p += '4-';
    p += '39';
    p += '8-';
    p += '62';
    p += '69';
    $('#p').text(p);
}

function openMap(){
    $(".map-section").trigger('click');
}

function allowCollapseHamburger() {
    $(document).click(function (event) {
        const clicktarget = $(event.target);
        const hamburger = $(".mobile-nav");
        const opened = hamburger.hasClass("active");
        if (opened && !clicktarget.hasClass("clearlist") && !clicktarget.hasClass("fa-bars") ) {
            hamburger.click();
        }
    });
}