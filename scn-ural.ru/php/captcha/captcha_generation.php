<?php
$array = [
    'карабас',
    'барабас',
    'лесник',
    'общение',
    'грязь',
    'гарри',
    'поттер',
    'погода',
    'умножение',
    'кукрыниксы',
    'король',
    'шут',
    'капча',
    'замок',
    'реальные',
    'пацаны',
    'любовь',
    'забота',
    'дети',
    'отчим',
    'отец',
    'мама',
    'бабушка',
    'дедушка',
    'сын',
    'дочь',
    'супруга',
    'супруг',
    'литтерал',
    'деньги',
    'власть',
    'интернет',
    'сайт',
    'бизнес',
    'россия',
    'госдума',
    'учёба',
    'домовёнок',
    'буратино',
    'дюймовочка',
    'пинокио',
    'жорик',
    'настроение',
    'лучшее',
    'хочу спать'
];
$rnd1 = rand(1, count($array));
$rnd2 = rand(1, count($array));

header('Content-type:image/png');
$im = imagecreatetruecolor(200, 40);
$red = imagecolorallocate($im, 255, 255, 255);
$black = imagecolorallocate($im, 14, 14, 14);

// Сделаем краный фон
imagefilledrectangle($im, 0, 0, 300, 99, $red);

// Путь к ttf файлу шрифта

$font_file = 'arial.ttf';

// Рисуем текст 'PHP Manual' шрифтом 13го размера
imagettftext($im, 13, 0, 15, 25, $black, $font_file, $array[$rnd1 - 1]); 
imagettftext($im, 11, 15, 105, 35, $black, $font_file, $array[$rnd2 - 1]); 

imagepng($im);
imagedestroy($im);

setCookie('captcha1', $array[$rnd1 - 1]);
setCookie('captcha2', $array[$rnd2 - 1]);
?>
