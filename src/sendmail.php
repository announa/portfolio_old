<?php

switch($_SERVER['REQUEST_METHOD']){
    case("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        // Payload is not send to $_POST Variable,
        // is send to php:input as a text
        $json = file_get_contents('php://input');
        //parse the Payload from text format to Object
        $params = json_decode($json);

        $email = $params->email;
        $firstname = $params->firstname;
        $lastname = $params->lastname;
        // $name = $params->firstname . $params->lastname;
        $message = $params->message;

        $recipient = 'aludewig@posteo.de'; //your email address
        $subject = "Contact From $firstname $lastname <$email>";
        // $subject = "Contact From $name <$email>";
        $headers = "From:  noreply@mywebsite.com";

        mail($recipient, $subject, $message, $headers);
        echo $subject;
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}