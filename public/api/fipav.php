<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
if ($_SERVER['REQUEST_METHOD'] !== 'GET') { http_response_code(405); exit('{}'); }
try {
  $data = [];
  foreach (['calendar' => 'calendar/0/63592', 'tables' => 'tables/63592'] as $key => $path) {
    $ch = curl_init('https://data.fipavonline.it/api/v2/' . $path);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 12, CURLOPT_CONNECTTIMEOUT => 5]);
    $body = curl_exec($ch); $status = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    if ($status !== 200 || !$body) throw new Exception('Fonte non disponibile');
    $data[$key] = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
  }
  $data['updatedAt'] = gmdate('c');
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) { http_response_code(503); echo '{"error":"Fonte temporaneamente non disponibile"}'; }
