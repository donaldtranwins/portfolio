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
    let m = 'mai';
    m += 'lto:';
    $('#e').text(e).attr('href', `${m+=e}?subject=Position%20Available&#58;%20&body=Hi%20Donald&#44;%0A%0A%20I%20read%20your%20resume&#44;%20love%20it&#46;%20%20I%20wanted%20to%20reach%20out%20about%20an%20opportunity%20we%20have%20for%20you&#58;%0A%0A%0AThanks&#44;%0A%0A`)
}

function appendPhone(){
    let p = '71';
    p += '4-';
    p += '39';
    p += '8-';
    p += '62';
    p += '69';
    let t = 'te';
    t += 'l:';
    $('#p').text(p).attr('href', `${t+=p}`);
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