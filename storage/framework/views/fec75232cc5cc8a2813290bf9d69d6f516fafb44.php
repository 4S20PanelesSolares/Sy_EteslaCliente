<?php $__env->startSection('content'); ?>

<br><style> hr{ border: solid; } </style>
<h6 class="card-header">Editar cliente</h6>

<div class="card">
	<div class="card-body">
		<div class="row">
			<div class="col-sm">
				<?php $__currentLoopData = $clienteInfo; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $detalles): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
				<form method="POST" action="<?php echo e(url('editar-cliente', $detalles->idPersona)); ?>">
					<?php echo csrf_field(); ?>
					<?php echo method_field('PUT'); ?>
					<div class="form-group row">
						<label for="inpNombreCliente" class="col-sm-4 col-form-label">Nombre*</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input id="inpNombre" name="nombrePersona" class="form-control" placeholder="Nombre completo" tabindex="1" value="<?php echo e($detalles->vNombrePersona); ?>" required autofocus>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpMailCliente" class="col-sm-6 col-form-label">Correo electrónico*</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="" id="inpMailCliente" name="email" class="form-control" placeholder="Correo electrónico" tabindex="4" value="<?php echo e($detalles->vEmail); ?>" required>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpCPCliente" class="col-sm-4 col-form-label">C.P.</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="number" id="inpCPCliente" onblur="postalCodeLookup();" class="form-control" placeholder="Código Postal" tabindex="7">
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpMunicCliente" class="col-sm-7 col-form-label">Municipio/Localidad</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="text" id="inpMunicCliente" name="municipio" class="form-control" placeholder="Municipio/Localidad/Ciudad" tabindex="10" value="<?php echo e($detalles->vMunicipio); ?>" readonly>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 col-form-label"><br></label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="submit" class="btn btn-success pull-right" value="Registrar">
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm">
					<div class="form-group row">
						<label for="inpPrimerApellidoCliente" class="col-sm-6 col-form-label">Primer apellido*</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="text" id="inpPrimerApellidoCliente" name="primerApellido" class="form-control" placeholder="Primer apellido" tabindex="2" value="<?php echo e($detalles->vPrimerApellido); ?>" required>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpTelefonoCliente" class="col-sm-4 col-form-label">Teléfono*</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="number" id="inpTelefonoCliente" name="telefono" class="form-control" placeholder="Teléfono" tabindex="5" value="<?php echo e($detalles->vTelefono); ?>" required onkeypress="return filterFloat(event,this);">
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpCalleCliente" class="col-sm-4 col-form-label">Calle y no.</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<?php ($direccion = explode("-", $detalles->vCalle)); ?>
								<input type="" id="inpCalleCliente" name="calle" class="form-control" placeholder="Calle y número" tabindex="8" value="<?php echo e($direccion[0]); ?>">
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpEstadoCliente" class="col-sm-4 col-form-label">Estado</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="" id="inpEstadoCliente" name="estado" class="form-control" placeholder="Estado" tabindex="11" value="<?php echo e($detalles->vEstado); ?>" readonly>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 col-form-label"><br></label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<a href="<?php echo e(url('registrarCliente')); ?>" class="btn btn-sm btn-danger" title="Cancelar" value="Cancelar">Cancelar</a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm">
					<div class="form-group row">
						<label for="inpSegundoApellidoCliente" class="col-sm-6 col-form-label">Segundo apellido</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="" id="inpSegundoApellidoCliente" name="segundoApellido" class="form-control" placeholder="Segundo apellido" tabindex="3" value="<?php echo e($detalles->vSegundoApellido); ?>">
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpCelularCliente" class="col-sm-4 col-form-label">Celular</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="number" id="inpCelularCliente" name="celular" class="form-control" placeholder="Celular" tabindex="6" value="<?php echo e($detalles->vCelular); ?>" onkeypress="return filterFloat(event,this);">
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpColoniaCliente" class="col-sm-4 col-form-label">Colonia</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<?php ($posicion = stripos($detalles->vCalle, "-") + 1); ?>
                                    	<?php ($colonia = substr($detalles->vCalle, $posicion, 100)); ?>
								<input type="" id="inpColoniaCliente" name="colonia" onblur="closeSuggestBox();" class="form-control" placeholder="Colonia" tabindex="9" value="<?php echo e($colonia); ?>" readonly>
								<span style="position: absolute; top: 20px; left: 0px; z-index:25;visibility: hidden;" id="suggestBoxElement"></span></span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<label for="inpConsumoCliente" class="col-sm-4 col-form-label">Consumo</label>
						<div class="col-sm-10">
							<div class="input-group mb-2">
								<input type="" id="inpConsumoCliente" name="consumo" class="form-control" placeholder="Consumo" tabindex="12" value="<?php echo e($detalles->fConsumo); ?>">
							</div>
						</div>
					</div>
				</form>
				<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
			</div>
		</div>
	</div>
</div><hr>

<script type="text/javascript">
	function filterFloat(evt,input) {
		// Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
		var key = window.Event ? evt.which : evt.keyCode;
        	var chark = String.fromCharCode(key);
        	var tempValue = input.value + chark;
        	if(key >= 48 && key <= 57) {
        		if(filter(tempValue)=== false) {
        			return false;
        		} else {
        			return true;
        		}
        	} else {
        		if(key == 8 || key == 13 || key == 0) {
        			return true;
        		} else if(key == 46) {
        			if(filter(tempValue)=== false) {
        				return false;
        			} else {
        				return true;
        			}
        		} else {
        			return false;
        		}
        	}
   	}

   	function filter(__val__) {
   		var preg = /^([0-9]+\.?[0-9]{0,2})$/;
   		if(preg.test(__val__) === true) {
   			return true;
   		} else {
   			return false;
   		}
   	}
</script>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('roles/seller', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\Sy_EteslaCliente\resources\views/roles/seller/cotizador/form-edit-cliente.blade.php ENDPATH**/ ?>