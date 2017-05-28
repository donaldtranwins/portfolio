$(document).ready(initialize);

function initialize(){
    appendEmail();
    appendPhone();
    openMap();
    allowCollapseHamburger();
}

// Appending Sensitive Information to prevent bot sniffing
function appendEmail(){
    let e = "don";
    e += "ald";
    e += "jtr";
    e += "an@";
    e += "gma";
    e += "il.";
    e += "com";
    let m = 'mai';
    m += 'lto:';
    $('#e').text(e).attr('href', `${m+=e}?subject=Position%20Available&#58;%20&body=Hi%20Donald&#44;%0A%0A%20I%20read%20your%20resume&#44;%20love%20it&#46;%20%20I%20wanted%20to%20reach%20out%20about%20an%20opportunity%20we%20have%20for%20you&#58;%0A%0A%0AThanks&#44;%0A%0A`)
}

function appendPhone(){
    let p = '71';
    p += '4-';
    p += '24';
    p += '8-';
    p += '62';
    p += '69';
    let t = 'te';
    t += 'l:';
    $('#p').text(p).attr('href', `${t+=p}`);
}

// Pre-opening the map
function openMap(){
    $(".map-section").trigger('click');
}

// Allowing user to close the hamburger button by clicking anywhere on screen
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


/**
 * Handling Rotating Animation of the HTML/CSS icon.  This prevents the rotating animation
 * from happening before the user scrolls down to the Skills section.
 * This fixes the issue where if the animation happens after page load, then it will appear
 * on the DOM without regards to any other animations (nullifying libraries: wow.js and animate.css)
 */
// Defining callback function that fires when the page is scrolled
var scrollEventHandler = function() {
    if(isScrolledIntoView(document.getElementsByClassName('spinner')[0])) {
        unbindScrollEventHandler();
        beginRotateHeartbeat();
    }
};
// Checks if the DOM element has rendered in view of the viewport
function isScrolledIntoView(domelement) {
    const elemTop = domelement.getBoundingClientRect().top;
    const elemBottom = domelement.getBoundingClientRect().bottom;

    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}
// Gets rid of the handler after the DOM element is viewable, so it doesn't keep needlessly firing
function unbindScrollEventHandler() {
    $(document).unbind('scroll', scrollEventHandler);
}
// Starts the heartbeat to rotate the icon
function beginRotateHeartbeat(){
    const $spinner = $('.spinner');
    debugger;
    var id = {};
    if (!event.data){
        window.setTimeout(startSpins,3333,$spinner);
        $spinner.on('mouseenter', null, {intervalID: id.interval}, beginRotateHeartbeat);
    } else {
        window.clearInterval(id.interval);
        $spinner.on('mouseleave',beginRotateHeartbeat);
    }
    function startSpins(spinner){
        spinner.addClass('spinning');
        id.interval = window.setInterval(animate, 5555, spinner);
        function animate(spinner){
            spinner.hasClass('spinning') ? spinner.removeClass('spinning') : spinner.addClass('spinning');
        }
    }
}

$(document).scroll(scrollEventHandler);
