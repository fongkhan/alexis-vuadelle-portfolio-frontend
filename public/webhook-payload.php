<?php
// Secret token to prevent unauthorized rebuilds
$secret_token = 'MY_SUPER_SECRET_TOKEN_2026';

if (!isset($_GET['token']) || $_GET['token'] !== $secret_token) {
    http_response_code(403);
    die('Accès refusé.');
}

// Ensure the log file is writable
$log_file = '/home/fongkhan/build_astro_webhook.log';
file_put_contents($log_file, "[" . date('Y-m-d H:i:s') . "] Webhook déclenché par Payload CMS.\n", FILE_APPEND);

// Execute the bash script in the background
$script_path = '/home/fongkhan/build_astro.sh';

if (!file_exists($script_path)) {
    http_response_code(500);
    die("Script introuvable: $script_path");
}

// Redirecting both stdout and stderr to the log file so you can debug if it fails
shell_exec("bash $script_path >> $log_file 2>&1 &");

http_response_code(200);
echo 'Build lancé en arrière-plan ! Consultez build_astro_webhook.log pour les détails.';
?>
