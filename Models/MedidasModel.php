<?php 

class MedidasModel extends Query{

    private $medida;
    private $nombre;
    private $id;
    private $estado;

    public function __construct()
    {
        parent::__construct();
    }
    public function getMedida(string $medida)
    {
        $sql = "SELECT * FROM medidas WHERE medida = '$medida'";
        $data = $this->select($sql);
        return $data;
    }

    public function getMedidas()
    {
        $sql = "SELECT * FROM medidas where estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarMed(string $medida, string $nombre)
    {
        $this->medida = $medida;
        $this->nombre  = $nombre;
        $verificar = "SELECT * FROM medidas WHERE medida = '$this->medida'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO medidas(medida,nombre) VALUES(?,?,?,?)";
            $datos = array($this->medida, $this->nombre);
            $data = $this->save($sql, $datos);
            if ($data == 1){
                $res = "ok";
            }else{
                $res = "Error";
            }
        }else {
            $res = "existe";
        }

        return $res;
    }
    public function editarUser( int $id)
    {
        $sql = "SELECT * FROM medidas WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function modificarMedida(string $medida, string $nombre, int $id_caja, int $id)
    {
        $this->medida = $medida;
        $this->nombre  = $nombre;
        $this->id_caja = $id_caja;
        $this->id      = $id;
        $sql = "UPDATE medidas SET medida = ?, nombre = ?, id_caja = ?, id = ? WHERE id = $id";
        $datos = array($this->medida, $this->nombre, $this->id_caja, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificado";
        }else{
            $res = "error";
        }
        return $res;
    }
    public function accionUsuer(int $estado, int $id)
    {
        $this->id     = $id;
        $this->estado = $estado;
        $sql          = "UPDATE medidas SET estado = ?, id = ? WHERE id = $id";
        $datos        = array($this->estado, $this->id);
        $data         = $this->save($sql, $datos);
        return $data; 
    }
}
?>