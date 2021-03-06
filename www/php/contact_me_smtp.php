<?php
if($_POST)
{
    require_once ('../../server/credentials.php');
    $to_Email       = $email; // Replace with recipient email address
	$subject        = 'Website: '.$_SERVER['SERVER_NAME']; //Subject line for emails
    
    $host           = $mailHost; // Your SMTP server. For example, smtp.mail.yahoo.com
    $username       = $user; //For example, your.email@yahoo.com
    $password       = $pw; // Your password
    $SMTPSecure     = $secure; // For example, ssl
    $port           = $num; // For example, 465
    
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    
        //exit script outputting json data
        $output = json_encode(
        array(
            'type'=>'error', 
            'text' => 'Request must come from AJAX, sorry.'
        ));
        
        die($output);
    } 
    
    //check $_POST vars are set, exit if any missing
    if(!isset($_POST["userName"]) || !isset($_POST["userEmail"]) || !isset($_POST["userMessage"]))
    {
        $output = json_encode(array('type'=>'error', 'text' => 'You trying something fancy?  Just use the form.', 'error' => 'client'));
        die($output);
    }

    //Sanitize input data using PHP filter_var().
    $user_Name        = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);
    $user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
    $user_Message     = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
    
    $user_Message = str_replace("\&#39;", "'", $user_Message);
    $user_Message = str_replace("&#39;", "'", $user_Message);
    
    //additional php validation
    if($user_Message === 'server is down')
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Sorry, this service is currently unavailable.  Please use the link above.', 'error' => 'server'));
        die($output);
    }
    if(strlen($user_Name)<4) // If length is less than 4 it will throw an HTTP error.
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short.', 'error' => 'client'));
        die($output);
    }
    if(!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) //email validation
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email.', 'error' => 'client'));
        die($output);
    }
    if(strlen($user_Message)<5) //check empty message
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Message is too short.  Don\'t be shy, fill out that message box!', 'error' => 'client'));
        die($output);
    }
    
    //proceed with PHP email.
    include("./../../server/mailer/PHPMailerAutoload.php"); //you have to upload class files "class.phpmailer.php" and "class.smtp.php"

	$mail = new PHPMailer();
	 
	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	
	$mail->Host = $host;
	$mail->Username = $username;
	$mail->Password = $password;
	$mail->SMTPSecure = $SMTPSecure;
	$mail->Port = $port;

	$mail->setFrom($username);
	$mail->addReplyTo($user_Email);
	 
	$mail->AddAddress($to_Email);
	$mail->Subject = $subject;
	$mail->Body = $user_Message. "\r\n\n"  .'Name: '.$user_Name. "\r\n" .'Email: '.$user_Email;
	$mail->WordWrap = 200;
	$mail->IsHTML(false);

	if(!$mail->send()) {

		$output = json_encode(array('type'=>'error', 'text' => 'Sorry, this service is currently unavailable.  Please use the link above.', 'error' => 'server', 'message' => $mail->ErrorInfo));
		die($output);

	} else {
	    $output = json_encode(array('type'=>'message', 'text' => 'Message sent successfully.  Thanks '.$user_Name .'!  I\'ll reply directly to '.$user_Email.'.'));
		die($output);
	}
    
}
?>