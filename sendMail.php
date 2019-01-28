<?php

$ssFile = getVar($_REQUEST["ssFile"]);
$yourname = check_input($_POST['full_name']);
$Phone    = check_input($_POST['phone']);
$address    = check_input($_POST['address']);
$email    = check_input($_POST['email']);
$Err = "";
$valid = true;


function getVar(&$value, $default = null) { return isset($value) ? $value : $default; }
$allowedFiles =  array('pdf','doc','docx','odt', 'ppt', 'pptx');
$fileAllow = true;


for($i=0;$i<count($_FILES['ssFile']['size']);$i++){
	
	$filename = $_FILES['ssFile']['name'][$i];
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	
	$extUpperCase=strtoupper($ext);
	$extLowerCase=strtolower($ext);
	$extFirstUpper=ucfirst($ext);

	if(in_array($ext,$allowedFiles) || in_array($extUpperCase,$allowedFiles) || in_array($extLowerCase,$allowedFiles) || in_array($extFirstUpper,$allowedFiles)) {
			$fileAllow= true;
			$whichFile="all";
		} else {
			$whichFile = $ext;
			$fileAllow= false;
			break;
	}	
	
	//$finfo = finfo_open(FILEINFO_MIME_TYPE);
	$tmp_name = $_FILES['ssFile']['tmp_name'][$i];
	//echo finfo_file($finfo, $tmp_name) . "<br>";
	//echo mime_content_type($tmp_name). "<br>";
	//finfo_close($finfo);
	$mtype = mime_content_type($tmp_name);


	if( $mtype == ( "application/pdf" ) || 
	   	$mtype == ( "application/msword" ) ||
	    $mtype == ( "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ) ||
	    $mtype == ( "application/vnd.openxmlformats-officedocument.presentationml.presentation" ) || 
	    $mtype == ( "application/vnd.oasis.opendocument.text" ) ||
	   	$mtype == ( "application/vnd.ms-powerpoint" ) 	  ) 
	{
		$fileAllow=true;
		$whichFile="all";
	}else{
		$whichFile=$mtype;
		$fileAllow=false;
		break;
	}

}


/* Functions we used */
function check_input($data, $problem=''){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if ($problem && strlen($data) == 0){
        show_error($problem);
    }
    return $data;
}

function show_error($myError){
?>
    <html>
    <body>
    <b>Please correct the following error:</b><br /> 
<?php echo $myError; ?>
    </body>
    </html>
<?php
exit();
}
?>

<?php

//$to= "alon.greenfeld@gmail.com, oren@dreamix.co.il";
$to= "alon.greenfeld@gmail.com";
$subject="ליד מדף נחיתה מפקחי בטיחות";
$from = "מפקחי בטיחות <no-reply@dreamix.co.il>";
$ssEmail = "מפקחי בטיחות <no-reply@dreamix.co.il>";
$sentDate = date("D, d M Y");

$body = "
	<html dir='rtl'>
	<head></head>
	<body>
	<br>
	<table width='700' border='0' bordercolor='#808080' align='center' cellpadding='3' cellspacing='0' dir='rtl' style='font-family:Arial, Helvetica, sans-serif; border-collapse:collapse; border:solid 1px #cccccc; color:#000000';>
	<tr><td colspan='2' style='border:none'></td></tr>

	<tr align='center'>
		<td colspan='2' valign='top' style='background-color:#E6E6E6;font-weight:bold'> דף נחיתה תעודת סטודנט <br/>$now</td>
	</tr>
	<tr><td  width='100%' colspan='2'>&nbsp;</td></tr>
	<tr><td  width='20%'><strong>שם</strong></td><td>".$yourname."</td></tr>
	<tr><td  width='20%'><strong>מגורים</strong></td><td>".$address."</td></tr>
	<tr><td  width='20%'><strong>טלפון</strong></td><td>".$Phone."</td></tr>
	<tr><td  width='20%'><strong>אימייל</strong></td><td>".$email."</td></tr>
	<tr><td  width='100%' colspan='2'>&nbsp;</td></tr>
	</table>
	</body>
	</html>
";

	      $mime_boundary="==Multipart_Boundary_x".md5(mt_rand())."x";
		  $headers = "From: $from\r\n" .
		  "Reply-To: $ssEmail\r\n" .
		  "Return-Path: $ssEmail\r\n" .
	      "MIME-Version: 1.0\r\n" .
	         "Content-Type: multipart/mixed;\r\n" .
	         " boundary=\"{$mime_boundary}\"";

	      $message=$body;
	      $message = "This is a multi-part message in MIME format.\n\n" .
	         "--{$mime_boundary}\n" .
	         "Content-Type: text/html; charset=\"utf-8\"\n" .
	         "Content-Transfer-Encoding: 7bit\n\n" .
	      $message . "\n\n";

    // get uploaded files from form in loop
    function reArrayFiles($ssFile)
	{
		$file_ary = array();
		$file_count = count($ssFile['name']);
		$file_keys = array_keys($ssFile);
			for ($i=0; $i<$file_count; $i++)
			{
				foreach ($file_keys as $key)
				  {
					$file_ary[$i][$key] = $ssFile[$key][$i];
					 
				  }
			}
       return $file_ary;
     }
           $file_ary = reArrayFiles($_FILES['ssFile']);
	      // process files
	      foreach($file_ary as $file){
	         $tmp_name = $file['tmp_name'];
	         $type = $file['type'];
	         $name = $file['name'];
	         $size = $file['size'];
			


			  
	         if (file_exists($tmp_name)){
	            // check to make sure it is uploaded file - not a system file
	            if(is_uploaded_file($tmp_name)){
	               $file = fopen($tmp_name,'rb');
	               $data = fread($file,filesize($tmp_name));
					
	               fclose($file);
	               $data = chunk_split(base64_encode($data));

					
					//get_mime_type($tmp_name);
	            }
	            $message .= "--{$mime_boundary}\n" .
	               "Content-Type: {$type};\n" .
	               " name=\"{$name}\"\n" .
	               "Content-Disposition: attachment;\n" .
	               " filename=\"{$name}\"\n" .
	               "Content-Transfer-Encoding: base64\n\n" .
	            $data . "\n\n";
	         }
	      }
	      // closing mime boundary - end of message
	      $message.="--{$mime_boundary}--\n";
	      // send email




for($i=0;$i<count($_FILES['ssFile']['size']);$i++){
	$filename = $_FILES['ssFile']['name'][$i];
	if(!$filename){$fileAllow = true;}
}

	if($fileAllow && $valid){
	      if (@mail($to, $subject, $message, $headers)){

				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				$headers .="From: no-reply@iac.ac.il";
				//@mail($ssEmail, $subject2, $message2, $headers);
			  	header("Location: thanks.html");
			  	die(); exit();
			  
		  	}else{  
				$sentError="Sorry! Email was not sent due to some error.";
			  	echo $sentError;
            }
	} else{  
		if(!$valid){ echo $Err; }
		if(!$fileAllow){
			echo "File Type <strong> $whichFile </strong> is not allowed! Only JPG, PDF, PPT, PPTX, DOC, DOCX and document files are allowed. Please try again!";
		}
	}


?>
			





