let tblUsuarios;
let tblClientes;  
document.addEventListener('DOMContentLoaded', function(){
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + "Usuarios/listar",
            dataSrc: ''
        },
        columns: [
            {'data': 'id'},    
            {'data': 'usuario'},
            {'data': 'nombre'},
            {'data': 'caja'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ]
    });
    // Fin de la tabla usuarios

    tblClientes = $('#tblCLientes').DataTable({
        ajax: {
            url: base_url + "Clientes/listar",
            dataSrc: ''
        },
        columns: [
            {'data': 'id'},
            {'data': 'rut'},    
            {'data': 'nombre'},
            {'data': 'direccion'},
            {'data': 'telefono'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ]
    });
})
function formLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario");
    const clave = document.getElementById("clave");

    if (usuario.value == "") {
        clave.classList.remove("is-invalid");
        usuario.classList.add("is-invalid");
        usuario.focus();

    }else if (clave.value == "") {
        usuario.classList.remove("is-invalid");
        clave.classList.add("is-invalid");
        clave.focus();

    }else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Usuarios/validar";
        const form = document.getElementById("formLogin");
        const formData = new FormData(form);
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "ok") {
                    window.location = base_url + "Usuarios";
                }else{
                    document.getElementById("alerta").classList.remove("d-none");
                    document.getElementById("alerta").innerHTML = res;
                }
            }
        }
    }
}

function frmUsuario(){
    document.getElementById("title").innerHTML = "Nuevo Usuario";
    document.getElementById("btnAccion").innerHTML = "Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo_usuario").modal("show");
    document.getElementById("id").value = "";
}

function registrarUser(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    const caja = document.getElementById("caja");

    if (usuario.value == "" || nombre.value == "" || caja.value == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })

    }else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Usuarios/registrar";
        const form = document.getElementById("frmUsuario");
        const formData = new FormData(form);        
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                const res = JSON.parse(this.responseText);
                if(res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    form.reset();
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                }else if(res == "modificado"){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario modificado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarUser(id)
{
    document.getElementById("title").innerHTML = "Actualizar Usuario";
    document.getElementById("btnAccion").innerHTML = "Actualizar";
    const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Usuarios/editar/" + id;
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("usuario").value = res.usuario;
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("caja").value = res.id_caja;
                document.getElementById("claves").classList.add("d-none");
                $("#nuevo_usuario").modal("show"); 
            }
        }
       
}


function btnEliminarUser(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El usuario no se eliminara de forma permanente, solo cambiara el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("title").innerHTML = "Actualizar Usuario";
            document.getElementById("btnAccion").innerHTML = "Actualizar";
            const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                const url = base_url + "/Usuarios/eliminar/" + id;
                http.open("GET", url, true);
                http.send();
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire({
                                title: 'Mensaje!',
                                text: "Usuario eliminado con éxito",
                                icon: 'success',
                            })
                            tblUsuarios.ajax.reload();
                        }else{
                            Swal.fire({
                                title: 'Mensaje!',
                                text: res,
                                icon: 'error',
                            })   
                        }
                    }
                }  
            }
      })
}

function btnReingresarUser(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                const url = base_url + "/Usuarios/reingresar/" + id;
                http.open("GET", url, true);
                http.send();
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire({
                                title: 'Mensaje!',
                                text: "Usuario reingresado con éxito",
                                icon: 'success',
                            })
                            tblUsuarios.ajax.reload();
                        }else{
                            Swal.fire({
                                title: 'Mensaje!',
                                text: res,
                                icon: 'error',
                            })   
                        }
                    }
                }  
            }
      })
}
// Fin Usuarios


function frmCliente(){
    document.getElementById("title").innerHTML = "Nuevo Cliente";
    document.getElementById("btnAccion").innerHTML = "Registrar";
    document.getElementById("frmCliente").reset();
    $("#nuevo_cliente").modal("show");
    document.getElementById("id").value = "";
}

function registrarCliente(event) {
    event.preventDefault();
    const rut = document.getElementById("rut");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");

    if (rut.value == "" || nombre.value == "" || telefono.value == "" || direccion.value == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })

    }else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Clientes/registrar";
        const form = document.getElementById("frmCliente");
        const formData = new FormData(form);        
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                const res = JSON.parse(this.responseText);
                if(res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cliente registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    form.reset();
                    $("#nuevo_cliente").modal("hide");
                    tblClientes.ajax.reload();
                }else if(res == "modificado"){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'CLiente modificado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_cliente").modal("hide");
                    tblClientes.ajax.reload();
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarCli(id)
{
    document.getElementById("title").innerHTML = "Actualizar Cliente";
    document.getElementById("btnAccion").innerHTML = "Actualizar";
    const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Clientes/editar/" + id;
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("rut").value = res.rut;
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("direccion").value = res.direccion;
                document.getElementById("telefono").value = res.telefono;
                $("#nuevo_cliente").modal("show"); 
            }
        }
       
}


function btnEliminarCli(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El cliente no se eliminara de forma permanente, solo cambiara el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("title").innerHTML = "Actualizar Cliente";
            document.getElementById("btnAccion").innerHTML = "Actualizar";
            const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                const url = base_url + "/Clientes/eliminar/" + id;
                http.open("GET", url, true);
                http.send();
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire({
                                title: 'Mensaje!',
                                text: "Cliente eliminado con éxito",
                                icon: 'success',
                            })
                            tblClientes.ajax.reload();
                        }else{
                            Swal.fire({
                                title: 'Mensaje!',
                                text: res,
                                icon: 'error',
                            })   
                        }
                    }
                }  

            }
      })
}

function btnReingresarCli(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                const url = base_url + "/Clientes/reingresar/" + id;
                http.open("GET", url, true);
                http.send();
                http.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        const res = JSON.parse(this.responseText);
                        if (res == "ok") {
                            Swal.fire({
                                title: 'Mensaje!',
                                text: "Cliente reingresado con éxito",
                                icon: 'success',
                            })
                            tblClientes.ajax.reload();
                        }else{
                            Swal.fire({
                                title: 'Mensaje!',
                                text: res,
                                icon: 'error',
                            })   
                        }
                    }
                }  
            }
      })
}