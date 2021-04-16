<?php 

$name = $_POST['name'];
$conference = $_POST['conference'];
$standard = $_POST['standard'];
$premium = $_POST['premium'];
$businessArea = $_POST['businessArea'];
$position = $_POST['position'];
$mailOrg = $_POST['mailOrg'];
$mailSponsors = $_POST['mailSponsors'];
$tel = $_POST['tel'];
$country = $_POST['country'];
$site = $_POST['site'];
$paymentFree = $_POST['paymentFree'];
$paymentVisa = $_POST['paymentVisa'];
$paymentInvoice = $_POST['paymentInvoice'];
$paymentPaypal = $_POST['paymentPaypal'];
$company = $_POST['company'];
$surname = $_POST['surname'];
//$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.ukr.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'wizz1@ukr.net';                 // Наш логин
$mail->Password = '64U1TkcL9cJUG6XH';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 2525;                                    // TCP port to connect to
 
$mail->setFrom('wizz1@ukr.net', 'Top Forum');   // От кого письмо
$mail->addAddress('pawixi7746@igoqu.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Registration data';
$mail->Body    = '
		User send registration data <br> 
		Conference: ' . $conference . ' <br>
		Delegate package: ' . $standard  . ' <br>
        Name: ' . $name . ' <br>
        Surname: ' . $surname . ' <br>
        Company: ' . $company . '<br>
        Business Area: ' . $businessArea . ' <br>
        Position: ' . $position . ' <br>
        E-mail: ' . $email . ' <br>
        E-mail (for organizers): ' . $mailOrg . ' <br>
        E-mail (for sponsors): ' . $mailSponsors . ' <br>
        Mobile Number (for organizers): ' . $tel . ' <br>
        Web-site: ' . $site . ' <br>
        Method of payment: ' . $country . ' <br>
        Country: ' . $paymentFree . $paymentVisa . $paymentInvoice . $paymentPaypal .'';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>