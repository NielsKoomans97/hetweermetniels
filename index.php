<?php require 'header.php'; ?>

<?= !empty($_GET['path']) ? LoadPage($_GET['path']) : LoadPage('index'); ?>

