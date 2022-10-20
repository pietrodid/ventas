<?php include "Views/Templates/header.php"; ?>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Medidas</li>
</ol>
<button class="btn btn-primary mb-2" type="button" onclick="frmMedida();"><i class="fas fa-plus"></i></button>
<table class="table table-light" id="tblMedidas">
    <thead class="thead">
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Nombre Corto</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="nueva_medida" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="title">Nueva medida</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" id="frmMedida">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="hidden" id="id" name="id">
                        <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre de la medida">
                    </div>
                    <div class="form-group">
                        <label for="nombre_corto">Nombre Corto</label>
                        <input id="nombre_corto" class="form-control" type="text" name="nombre_corto" placeholder="Nombre Corto de la medida">
                    </div>
                    <div class="form-group mt-2">
                        <button class="btn btn-primary mt-2" type="button" id="btnAccion" onclick="registrarMed(event); ">Registrar</button>
                        <button class="btn btn-danger mt-2" type="button" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>