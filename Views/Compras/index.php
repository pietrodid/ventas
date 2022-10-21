<?php include "Views/Templates/header.php"; ?>
<div class="card">
    <div class="car-header bg-primary text-white">
        <h4>Nueva Compra</h4>
    </div>
    <div class="card-body">
        <form id="frmCompra">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="codigo"><i class="fas fa-barcode"></i> Código de Barras</label>
                        <input type="hidden" id="id" name="id">
                        <input id="codigo" class="form-control" type="text" name="codigo" placeholder="Código de barras" onkeyup="buscarCodigo(event)">
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="nombre">Descripción</label>
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Descripción del producto" disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="cantidad">Cantidad</label>
                        <input id="cantidad" class="form-control" type="number" name="cantidad" placeholder="Cantidad" onkeyup="calcularPrecio(event)">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group mt-2">
                        <label for="precio_compra">Precio</label>
                        <input id="precio_compra" class="form-control" type="number" name="precio_compra" placeholder="Precio Compra"disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="sub_total">Sub Total</label>
                        <input id="sub_total" class="form-control" type="number" name="sub_total" placeholder="Sub Total" disabled>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<table class="table table-light table-bordered table-hover">
    <thead class="table-dark">
        <tr>
            <th>Id</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Sub Total</th>
            <th></th>
        </tr>
    </thead>
        <tbody id="tblDetalle">
        </tbody>
</table>
<div class="row justify-content-end">
    <div class="col-md-4">
        <div class="form-group">
            <label for="total" class="fw-bold">Total</label>
            <input id="total" class="form-control" type="number" name="total" placeholder="Total" disabled>
            <button class="btn btn-primary mt-2 btn-block" type="button" onclick="generarCompra(event)">Generar Compra</button>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>