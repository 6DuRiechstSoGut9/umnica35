<?php
header('Content-Type: application/json');

$to = "tvoja-pochta@mail.ru"; // ТВОЯ ПОЧТА
$subject = "Новая заявка: Студия Умница";

$name = $_POST['parent_name'] ?? 'Не указано';
$phone = $_POST['phone'] ?? 'Не указано';
$direction = $_POST['direction'] ?? 'Не выбрано';

$message = "Имя: $name\nТелефон: $phone\nНаправление: $direction";
$headers = "From: info@umnitsa-studio.ru\r\nReply-To: $to\r\nContent-Type: text/plain; charset=utf-8";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Сервер не смог отправить письмо']);
}
?>