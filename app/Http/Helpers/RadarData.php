<?php

namespace App\Http\Helpers;

class RadarData
{
    public static function SyncData($host, $type, $params = [])
    {
        switch ($host) {
            case 'weerplaza':
                return RadarData::GetWeerplaza($type);

            case 'buienradar':
                return RadarData::GetBuienradar($type, $params);
        }
    }

    private static function GetBuienradar($type, $params)
    {
        $base_path = str_replace('/', '\\', $_SERVER['DOCUMENT_ROOT'] . '/assets/radar/' . $type);
        $doc_path = $base_path . '/' . $type . '.json';
        $updating_path = str_replace('/', '\\', $_SERVER['DOCUMENT_ROOT'] . '/assets/radar/updating');

        if (is_file($updating_path)){
            return file_get_contents($doc_path);
        }
        else{
            file_put_contents($updating_path, '');
        }

        $host = ($params['version'] == '3' ? 'image-lite.buienradar.nl' : 'image.buienradar.nl');
        $path = ($params['version'] == '3' ? '/3.0/metadata/'  : '/2.0/metadata/sprite/') . $type;
        $uri = RadarData::CreateUri('https://', $host, $path, [
            'renderText' => 'false',
            'renderBackground' => 'false',
            'history' => $params['history'],
            'forecast' => $params['forecast'],
        ]);

        RadarData::PrepareDir($base_path);

        $doc = file_get_contents($uri);
        $json = json_decode($doc);
        $localDoc = '[';

        $times = $json->times;
        $index = 0;

        foreach ($times as $time) {
            $timeUrl = $time->url;
            $localPath = $base_path . '/' . basename($time->url);
            $externalPath = '/data/' . $type . '/' . basename($time->url);
            $timeJson = '';

            if (file_put_contents($localPath, file_get_contents($timeUrl))) {
                $timeJson = '{"time":"' . $time->timestamp . '","path":"' . $externalPath . '"}';
            }

            if ($index < count($times) - 1) {
                $timeJson .= ',';
            }

            $index++;
            $localDoc .= $timeJson;
        }

        $localDoc .= ']';

        file_put_contents($doc_path, $localDoc);

        unlink($updating_path);

        return $localDoc;
    }

    private static function GetWeerplaza($type)
    {
        $base_path = str_replace('/', '\\', $_SERVER['DOCUMENT_ROOT'] . '/assets/radar/' . $type);
        $doc_path = $base_path . '/' . $type . '.json';
        $updating_path = str_replace('/', '\\', $_SERVER['DOCUMENT_ROOT'] . '/assets/radar/updating');

        if (is_file($updating_path)){
            return file_get_contents($doc_path);
        }
        else{
            file_put_contents($updating_path, '');
        }

        $uri  = RadarData::CreateUri('https://', 'cluster.api.meteoplaza.com', '/v3/nowcast/tiles/' . $type);

        RadarData::PrepareDir($base_path);

        $doc = file_get_contents($uri);
        $json = json_decode($doc);
        $localDoc = '[';

        $index = 0;
        foreach ($json as $time) {
            $timeUrl = $uri . '/' . $time->layername;
            $localPath = $base_path . '/' . $time->layername . '.png';
            $externalPath = '/data/' . $type . '/' . $time->layername . '.png';
            $externalPathNotFound = '/data/Static/notfound.png';

            $timeJson = '';

            if (file_put_contents($localPath, file_get_contents($timeUrl))) {
                $timeJson = '{"time":"' . $time->timestamp . '","path":"' . $externalPath . '"}';
            } else {
                $timeJson = '{"time":"' . $time->timestamp . '","path":"' . $externalPathNotFound . '"}';
            }

            if ($index < count($json) - 1) {
                $timeJson .= ',';
            }

            $index++;
            $localDoc .= $timeJson;
        }

        $localDoc .= ']';

        file_put_contents($doc_path, $localDoc);

        unlink($updating_path);

        return $localDoc;
    }

    private static function PrepareDir($path)
    {
        if (is_dir($path)) {
            $files = glob($path . '/*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
        } else {
            mkdir($path);
        }
    }

    private static function CreateUri($protocol, $host, $path, $params = [])
    {
        $uri = $protocol . $host;

        if (!empty($path)) {
            $uri .= $path;
        }

        if (!empty($params)) {
            $index = 0;

            foreach ($params as $key => $value) {
                if ($index == 0) {
                    $uri .= '?' . $key . '=' . $value;
                } else {
                    $uri .= '&' . $key . '=' . $value;
                }

                $index++;
            }
        }

        return $uri;
    }
}
