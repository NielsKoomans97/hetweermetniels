<?php

function CreateButton($class, $id, $value, $clickEvent){
    $element = "<button";

    if (!is_null($class)){
        $element .= " class=\"".$class."\"";
    }

    if (!is_null($id)){
        $element .= " id=\"".$id."\"";
    }

    if (!is_null($clickEvent) && !empty($clickEvent)){
        $element .= " onclick=\"".$clickEvent."\"";
    }

    return $element.">".$value."</button>";
}

function CreateIconButton($icon, $class, $id, $value, $clickEvent){
    $element = "<button";

    if (!is_null($class)){
        $element .= " class=\"".$class."\"";
    }

    if (!is_null($id)){
        $element .= " id=\"".$id."\"";
    }

    if (!is_null($clickEvent) && !empty($clickEvent)){
        $element .= " onclick=\"".$clickEvent."\"";
    }

    return $element."><i class=\"".$icon."\"></i>".$value."</button>";
}

function CreateLink($icon, $link, $class, $id, $value, $clickEvent){
    return "<a href=\"".$link."\" class=\"".$class."\" id=\"".$id."\" onclick=\"".$clickEvent."\"><i class=\"".$icon."\"></i>".$value."</a>";
}

function CreateImgLink($favIcon, $link, $id, $value){
    return "<a href=\"".$link."\" class=\"secondary-item\" id=\"".$id."\"><img src=\"".$favIcon."\"></i>".$value."</a>";
}

function CreateInput($type, $class, $id, $value, $eventType, $event){
    return "<input type=\"".$type."\" class=\"".$class."\" id=\"".$id."\" value=\"".$value."\" ".$eventType."=\"".$event."\" />";
}
?>
