/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){
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
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }
        
        if (user_message == "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            var post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };

            $submit.addClass('disabled').text('Sending... ').append(icon_sending);
            //Ajax post data to server
            $.post('./contact_me_smtp.php', post_data, function(response){
                //load json data from server and output message
                if (response.type == 'error') {
                    var output = '<div class="error">' + response.text + '</div>';
                    $submit.addClass('disabled btn-dangerous')
                        .text('Message not sent ')
                        .append(icon_fail);
                }
                else {
                    output = '<div class="success">' + response.text + '</div>';
                    $submit.addClass('btn-success')
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
        $submit.removeClass('disabled btn-dangerous')
            .text('Send Message ')
            .append(icon_ready);
    });
    
});
