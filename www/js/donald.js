$(document).ready(initialize);

function initialize(){
    // applyHover(); //not working
    applyFlipIn();
    ensureAllLinksOpenNewWindow();
    enableMagnific();
    appendEmail();
    appendPhone();
    contactFormHandler();
    // openMap(); // removed map slideout
    allowCollapseHamburger();
}

// Applies data-hover attribute to all p elements in Skills, for CSS animation
function applyHover(){
    $('.tpl-alt-tabs p').each(function(){
        $(this).attr('data-hover',$(this).text())
    });
}

function applyFlipIn(){
    var $ul = $('.tpl-alt-tabs');
    $ul.each(function(){
        var $li = $(this).children();
        $li.each(function(index){
            $(this).attr({
                class: "wow flipInX",
                "data-wow-delay": "0."+(index+2)+"s",
                "data-wow-duration": ".4s"
            }).find('p').attr({
                class: "wow slideInDown",
                'data-wow-delay': "1.4s",
                'data-wow-duration': ".6s"
            });
        })
    });
}

// Ensures all anchor tags linking to another web page, but doesn't open an app, opens in a new window
function ensureAllLinksOpenNewWindow(){
    const $links = $("a[href^='http']");
    $links.attr('target','_blank');
}

function enableMagnific(){
    var over;
    $('.magnific').magnificPopup({
        type: 'ajax',
        ajax: {
            settings: null,
            cursor: 'mfp-ajax-cur',
            tError: '<a href="%url%">The content</a> could not be loaded.',
        },
        callbacks: {
            parseAjax: function(response){
                console.log('Ajax Content Loaded:',response)
            },
            ajaxContentAdded: function(){
                console.log(this.content)
            },
            open: function(){
                over = $('body').prop('overflow');
                console.log('popup opened', over);
                $('body').prop('overflow','hidden');
            },
            afterClose: function(){
                console.log("popup closed", over)
            }
        },
        gallery: {
            enabled: true
        },
        midClick: false,
        fixedContentPos: true,
        fixedBgPos: true,
        closeOnBgClick: false
    })
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
    window.setTimeout(startSpins,3333,$spinner);
    function startSpins(spinner){
        spinner.addClass('spinning');
        window.setInterval(animate, 5555, spinner);
        function animate(spinner){
            spinner.hasClass('spinning') ? spinner.removeClass('spinning') : spinner.addClass('spinning');
        }
    }
}

// Creates Handler for the Contact form
function contactFormHandler(){
    // defining icons to use for contact form
    var icon_ready = $('<i>').addClass("fa fa-envelope");
    var icon_sending = $('<i>').addClass("fa fa-spin fa-spinner");
    var icon_sent = $('<i>').addClass("fa fa-check");
    var icon_fail = $('<i>').addClass("fa fa-times");
    var $submit = $("#submit_btn");


    $submit.click(function(){

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name === "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email === "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_message === "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_message === 'server is down'){
            proceed = true;
        }
        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            var post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };

            $submit.addClass('disabled')
                .text('Sending... ')
                .append(icon_sending);
            //Ajax post data to server
            $.post('./contact_me_smtp.php', post_data, function(response){
                //load json data from server and output message
                if (response.type === 'error' && response.error === 'server') {
                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    var emailURL = $('#e').parent().parent().parent();

                    var output = '<div class="error">' + response.text + '</div>';
                    $submit.toggleClass('submit_btn_dead btn-dangerous animated hinge')
                        .text('Service Unavailable ')
                        .attr('type','button')
                        .append(icon_fail)
                        .one(animationEnd, function(){
                            $('#contact_form .clearfix').remove();
                            emailURL.addClass('animated rubberBand')
                                .one(animationEnd,function(){
                                    emailURL.removeClass('animated rubberBand')
                                        .addClass('animated tada');
                                })
                    });
                    $submit.off('click');
                    $("#contact_form input, #contact_form textarea").off('keyup');


                }
                else if (response.type === 'error' && response.error === 'client') {
                    output = '<div class="error">' + response.text + '</div>';
                    $submit.addClass('disabled btn-dangerous animated shake')
                        .text('Message not sent ')
                        .append(icon_fail);
                }
                else {
                    output = '<div class="success">' + response.text + '</div>';
                    $submit.addClass('btn-success animated flash')
                        .text('Sent! ')
                        .append(icon_sent);

                    //reset values in all input fields
                    $('#contact_form input, #contact_form textarea').val('');
                }
                $("#result").hide().html(output).slideDown();
            }, 'json');

        }

        return false;
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function(){
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
        $submit.removeClass('disabled btn-dangerous animated shake flash')
            .text('Send Message ')
            .append(icon_ready);
    });
}

$(document).scroll(scrollEventHandler);
