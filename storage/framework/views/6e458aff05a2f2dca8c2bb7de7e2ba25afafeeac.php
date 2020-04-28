<?php $__env->startSection('content'); ?>
    <?php $__env->startSection('agregarClientes'); ?>
    <?php echo $__env->yieldSection(); ?>
    <div class="table-responsive-sm">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Celular</th>
                    <th>Email</th>
                    <th style="text-align:center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if(isset($consultarClientes)): ?>
                    <?php ($numeroLista = 1); ?>
                    <?php $__currentLoopData = $consultarClientes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cliente): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <tr>
                            <th><?php echo e($numeroLista); ?></th>
                            <td><?php echo e($cliente->vNombrePersona); ?>&nbsp;<?php echo e($cliente->vPrimerApellido); ?>&nbsp;<?php echo e($cliente->vSegundoApellido); ?></td>
                            <td><?php echo e($cliente->vCalle); ?>,&nbsp;<?php echo e($cliente->vMunicipio); ?>,&nbsp;<?php echo e($cliente->vEstado); ?></td>
                            <td><?php echo e($cliente->vTelefono); ?></td>
                            <td><?php echo e($cliente->vCelular); ?></td>
                            <td><?php echo e($cliente->vEmail); ?></td>
                            <td>
                                <button id="btnEdit" class="btn btn-lg btn-warning" title="editar"><img src="https://img.icons8.com/material-outlined/18/000000/multi-edit.png"></button>
                            </td>
                            <td>
                                <button id="btnExc" class="btn btn-lg btn-danger" title="eliminar"><img src="https://img.icons8.com/material-outlined/18/000000/delete-trash.png"></button>
                            </td>
                        </tr>
                        <?php ($numeroLista = $numeroLista + 1); ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('roles/seller', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Sy_EteslaCliente\resources\views/template/clientes.blade.php ENDPATH**/ ?>