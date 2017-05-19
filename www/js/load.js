$(document).ready(init);

function init(){
    appendEmail();
    appendPhone();
    allowCollapseHamburger();
}

function appendEmail(){

}

function appendPhone(){

}

function allowCollapseHamburger() {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var hamburger = $(".mobile-nav");
        var opened = hamburger.hasClass("active");
        if (opened === true && !clickover.hasClass("clearlist") && !clickover.hasClass("fa-bars") ) {
            $(".mobile-nav").click();
        }
    });
}