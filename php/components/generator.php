<?php

function CreateButton($class, $id, $value, $clickEvent){
    return "<button class=\"".$class."\" id=\"".$id."\" onclick=\"".$clickEvent."\">".$value."</button>";
}

function CreateMenuItem($icon, $link, $class, $id, $value, $clickEvent){
    return "<a href=\"".$link."\" class=\"".$class."\" id=\"".$id."\" onclick=\"".$clickEvent."\"><i class=\"".$icon."\"></i>".$value."</a>";
}

function CreateInput($type, $class, $id, $value, $eventType, $event){
    return "<input type=\"".$type."\" class=\"".$class."\" id=\"".$id."\" value=\"".$value."\" ".$eventType."=\"".$event."\" />";
}
?>
