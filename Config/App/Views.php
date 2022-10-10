<?php 

class Views{
    public function getView($controller, $vista,  $data="") 
    {
        $controlador = get_class($controller);
        if ($controlador == "Home") {
            $vista = "Views/".$vista.".php";
        }else {
            $vista = "Views/".$controlador."/".$vista.".php";
        }
        require $vista;
    }
}

?>