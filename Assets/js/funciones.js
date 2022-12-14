let tblUsuarios;
let tblCajas;
let tblClientes;
let tblMedidas;
let tblProductos;
let tblCompras;

document.addEventListener('DOMContentLoaded', function () {
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + "Usuarios/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'usuario' },
            { 'data': 'nombre' },
            { 'data': 'caja' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });
    // Fin de la tabla usuarios

    tblCajas = $('#tblCajas').DataTable({
        ajax: {
            url: base_url + "Cajas/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'rut' },
            { 'data': 'nombre' },
            { 'data': 'direccion' },
            { 'data': 'telefono' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });
    // Fin de la tabla cajas

    tblClientes = $('#tblCLientes').DataTable({
        ajax: {
            url: base_url + "Clientes/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'rut' },
            { 'data': 'nombre' },
            { 'data': 'direccion' },
            { 'data': 'telefono' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });
    // Fin de la tabla clientes

    tblMedidas = $('#tblMedidas').DataTable({
        ajax: {
            url: base_url + "Medidas/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'nombre' },
            { 'data': 'nombre_corto' },
            { 'data': 'estado' }
        ]
    });

    // Fin de la tabla medidas

    tblCategorias = $('#tblCategorias').DataTable({
        ajax: {
            url: base_url + "Categorias/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'rut' },
            { 'data': 'nombre' },
            { 'data': 'direccion' },
            { 'data': 'telefono' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });

    // Fin de la tabla categorias

    tblProductos = $('#tblProductos').DataTable({
        ajax: {
            url: base_url + "Productos/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'imagen' },
            { 'data': 'codigo' },
            { 'data': 'descripcion' },
            { 'data': 'precio_venta' },
            { 'data': 'cantidad' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });

    // Fin de la tabla productos
})

function frmUsuario() {
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

    } else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Usuarios/registrar";
        const form = document.getElementById("frmUsuario");
        const formData = new FormData(form);
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario registrado con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    form.reset();
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario modificado con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else {
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

function btnEditarUser(id) {
    document.getElementById("title").innerHTML = "Actualizar Usuario";
    document.getElementById("btnAccion").innerHTML = "Actualizar";
    const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    const url = base_url + "/Usuarios/editar/" + id;
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
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
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Usuario eliminado con ??xito",
                            icon: 'success',
                        })
                        tblUsuarios.ajax.reload();
                    } else {
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
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Usuario reingresado con ??xito",
                            icon: 'success',
                        })
                        tblUsuarios.ajax.reload();
                    } else {
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


function frmCliente() {
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

    } else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Clientes/registrar";
        const form = document.getElementById("frmCliente");
        const formData = new FormData(form);
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cliente registrado con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    form.reset();
                    $("#nuevo_cliente").modal("hide");
                    tblClientes.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'CLiente modificado con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_cliente").modal("hide");
                    tblClientes.ajax.reload();
                } else {
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

function btnEditarCli(id) {
    document.getElementById("title").innerHTML = "Actualizar Cliente";
    document.getElementById("btnAccion").innerHTML = "Actualizar";
    const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    const url = base_url + "/Clientes/editar/" + id;
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
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
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Cliente eliminado con ??xito",
                            icon: 'success',
                        })
                        tblClientes.ajax.reload();
                    } else {
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
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Cliente reingresado con ??xito",
                            icon: 'success',
                        })
                        tblClientes.ajax.reload();
                    } else {
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
// Fin cliente

function frmProducto() {
    document.getElementById("title").innerHTML = "Nuevo Producto";
    document.getElementById("btnAccion").innerHTML = "Registrar";
    document.getElementById("frmProducto").reset();
    $("#nuevo_producto").modal("show");
    document.getElementById("id").value = "";
    deleteImg();
}

function registrarPro(event) {
    event.preventDefault();
    const codigo = document.getElementById("codigo");
    const nombre = document.getElementById("nombre");
    const precio_compra = document.getElementById("precio_compra");
    const precio_venta = document.getElementById("precio_venta");
    const id_medida = document.getElementById("medida");
    const id_categoria = document.getElementById("categoria");
    if (codigo.value == "" || nombre.value == "" || precio_compra.value == "" || precio_venta.value == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })

    } else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Productos/registrar";
        const form = document.getElementById("frmProducto");
        const formData = new FormData(form);
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Producto registrado con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    form.reset();
                    $("#nuevo_producto").modal("hide");
                    tblProductos.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Producto modificado con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_producto").modal("hide");
                    tblProductos.ajax.reload();
                } else {
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

function btnEditarPro(id) {
    document.getElementById("title").innerHTML = "Actualizar Producto";
    document.getElementById("btnAccion").innerHTML = "Modificar";
    const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    const url = base_url + "/Productos/editar/" + id;
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("codigo").value = res.codigo;
            document.getElementById("nombre").value = res.descripcion;
            document.getElementById("precio_compra").value = res.precio_compra;
            document.getElementById("precio_venta").value = res.precio_venta;
            document.getElementById("medida").value = res.id_medida;
            document.getElementById("categoria").value = res.id_categoria;
            document.getElementById("img-preview").src = base_url + "Assets/img/" + res.foto;
            document.getElementById("icon-close").innerHTML = `<button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button>`;
            document.getElementById("icon-image").classList.add("d-none");
            document.getElementById("foto_actual").value = res.foto;
            $("#nuevo_producto").modal("show");
        }
    }

}


function btnEliminarPro(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El producto no se eliminara de forma permanente, solo cambiara el estado a inactivo!",
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
            const url = base_url + "/Productos/eliminar/" + id;
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Producto eliminado con ??xito",
                            icon: 'success',
                        })
                        tblProductos.ajax.reload();
                    } else {
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

function btnReingresarPro(id) {
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
            const url = base_url + "/Productos/reingresar/" + id;
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Producto reingresado con ??xito",
                            icon: 'success',
                        })
                        tblProductos.ajax.reload();
                    } else {
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

function preview(e) {
    const url = e.target.files[0];
    const urlTmp = URL.createObjectURL(url);
    document.getElementById("img-preview").src = urlTmp;
    document.getElementById("icon-image").classList.add("d-none");
    document.getElementById("icon-close").innerHTML = `<button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button> ${url['name']}`;
}

function deleteImg() {
    document.getElementById("icon-close").innerHTML = "";
    document.getElementById("icon-image").classList.remove("d-none");
    document.getElementById("img-preview").src = "";
    document.getElementById("imagen").value = '';
    document.getElementById("foto_actual").value = '';
}

function buscarCodigo(e) {
    e.preventDefault();
    if(e.which == 13){
        const cod = document.getElementById("codigo").value;
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Compras/buscarCodigo/" + cod;
        http.open("GET", url, true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if(res){
                    document.getElementById("nombre").value = res.descripcion;
                    document.getElementById("precio_compra").value = res.precio_compra;
                    document.getElementById("id").value = res.id;
                    document.getElementById("cantidad").focus();
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Mensaje!',
                        text: "Producto no existe",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    document.getElementById("codigo").value = '';
                    document.getElementById("codigo").focus();
                }
            }
        }
    }
}     
function calcularPrecio(e){
    e.preventDefault();
    const cant = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio_compra").value;
    document.getElementById("sub_total").value = precio * cant;
    if (e.which == 13){
        if(cant > 0){
            const url = base_url + "/Compras/ingresar";
            const frm = document.getElementById("frmCompra");
            const http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.send(new FormData(frm));
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);                  
                 if (res == 'ok'){
                    alert('ingresado');
                    frm.reset();
                    cargarDetalle();
                    }else if (res == 'modificado') {
                        alert('Producto Actualizado');
                        frm.reset();
                        cargarDetalle();
                    }
                }
            }
        }
    }
}
cargarDetalle();           

function cargarDetalle() {
    const url = base_url + "/Compras/listar";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            let html = '';
            res.detalle.forEach(row => {
                html += `<tr>
                <td>${row['id']}</td>
                <td>${row['descripcion']}</td>
                <td>${row['cantidad']}</td>
                <td>${row['precio']}</td>
                <td>${row['sub_total']}</td>
                <td>
                <button class="btn btn-danger type="button" onclick="deleteDetalle(${row.id})">
                <i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>`;
            });
            document.getElementById("tblDetalle").innerHTML = html;
            document.getElementById("total").value = res.total_pagar.total;
        }           
    }
}

// Fin Productos

function frmMedida() {
    document.getElementById("title").innerHTML = "Nuevo Medida";
    document.getElementById("btnAccion").innerHTML = "Registrar Medida";
    document.getElementById("frmMedida").reset();
    $("#nueva_medida").modal("show");
    document.getElementById("id").value = "";
}
function registrarMed(event) {
    event.preventDefault();
    const medida = document.getElementById("medida");
    const nombre = document.getElementById("nombre");

    if (medida.value == "" || nombre.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 3000
        })

    } else {
        const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        const url = base_url + "/Medidas/registrar";
        const form = document.getElementById("frmMedida");
        const formData = new FormData(form);
        http.open("POST", url, true);
        http.send(formData);
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Medida registrada con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    form.reset();
                    $("#nueva_medida").modal("hide");
                    tblMedidas.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Medida modificada con ??xito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nueva_medida").modal("hide");
                    tblMedidas.ajax.reload();
                } else {
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

function btnEditarUser(id) {
    document.getElementById("title").innerHTML = "Actualizar Usuario";
    document.getElementById("btnAccion").innerHTML = "Actualizar";
    const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    const url = base_url + "/Usuarios/editar/" + id;
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
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
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Usuario eliminado con ??xito",
                            icon: 'success',
                        })
                        tblUsuarios.ajax.reload();
                    } else {
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
            const url = base_url + "/Medidas/reingresar/" + id;
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Usuario reingresado con ??xito",
                            icon: 'success',
                        })
                        tblUsuarios.ajax.reload();
                    } else {
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
// Fin Medidas

function deleteDetalle(id) {
    const url = base_url + "/Compras/delete/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            if (res == 'ok') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto eliminado',
                    showConfirmButton: false,
                    timer: 2000
                })
                cargarDetalle();
            }else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }           
    }
}

function generarCompra() {
    Swal.fire({
        title: 'Esta seguro de realizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const http = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            const url = base_url + "/Compras/registrarCompra";
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire({
                            title: 'Mensaje!',
                            text: "Compra generada",
                            icon: 'success',
                        })
                    } else {
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