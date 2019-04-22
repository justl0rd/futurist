<?php 
header("Content-Type: text/html; charset=utf-8");

$myemail = "marmorela@ukr.net";
$devmail = "xvid2y@gmail.com";
$number = $_POST["quize-form-number"];

$quizDataUrl = $_POST["quize-form-hidden-data"];
$quizDataJson = urldecode($quizDataUrl);
$quizData = json_decode($quizDataJson, true);

$theme = "Futurist";
$about = "From: <marmorela@ukr.net> \r\n Futurist \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n";

$quizMessage = "
	Телефон клиента: <br>
	<b>$number</b>
	<br><br>
	<b>Quiz-опрос</b>: <br><br>
";

for($i = 0; $i < count($quizData); $i++) {
	$quizMessage .= "
		Вопрос: {$quizData[$i]['question']} <br>
		Ответ: {$quizData[$i]['answer']} <br><br>
	";
}

mail($myemail, $theme, $quizMessage, $about);
mail($devmail, $theme, $quizMessage, $about);