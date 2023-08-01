<?php

function CreateButton($class, $id, $value, $clickEvent){
    return "<button class=\"".$class."\" id=\"".$id."\" onclick=\"".$clickEvent."\">".$value."</button>";
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
