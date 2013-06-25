<?php

switch($_GET['method']) {
    case 'upload':
        echo json_encode($_FILES['attachment']);
        // TODO: Move the file to a save location
        break;

    case 'person':
        $data = json_decode(@file_get_contents('php://input'));
        echo json_encode($data);
        // TODO Save the person to a database
        break;
}