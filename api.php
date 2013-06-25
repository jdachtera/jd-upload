<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jack-russel
 * Date: 25.06.13
 * Time: 20:00
 * To change this template use File | Settings | File Templates.
 */

switch($_GET['method']) {
    case 'upload':
        echo json_encode($_FILES['attachment']);
        break;

    case 'person':
        $data = json_decode(@file_get_contents('php://input'));
        echo json_encode($data);
        break;

}