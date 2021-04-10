@extends('roles/seller')
@section('content')
@section('agregarClientes')
@show
    <div id="acordionClientes" class="accordion">
        @if(@isset($consultarClientes))
            @unless($consultarClientes)
                <h1>No cuenta con clientes registrados!</h1>
            @else
                @foreach($consultarClientes as $cliente)
                    <div class="card">
                        <!-- Header Accordion -->
                        <div id="headingTwo" class="card-header">
                            <h2 class="mb-0">
                                <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse{{ $loop->index }}" aria-expanded="false" aria-controls="collapseTwo">
                                    {{ $cliente->vNombrePersona }} {{ $cliente->vPrimerApellido }} {{ $cliente->vSegundoApellido }}
                                </button>
                            </h2>
                            <div class="d-flex flex-row-reverse">
                                <div class="p-2 btn-group">
                                    <a href="{{ url('editar-cliente', [$cliente->idPersona]) }}" class="btn btn-sm btn-warning" title="Editar">
                                        <img src="https://img.icons8.com/ios/20/000000/edit--v1.png"/>
                                    </a>
                                    <a href="{{ url('eliminar-cliente', [$cliente->idPersona]) }}" class="btn btn-sm btn-danger" title="Eliminar">
                                        <img src="https://img.icons8.com/ios/20/000000/delete-trash.png"/>
                                    </a>
                                </div>
                                <!--div class="p-2">
                                    Aqui va la cantidad de propuestas que tiene el cliente
                                    0
                                </div-->
                            </div>
                        </div>
                        <!-- Fin_Header Accordion -->
                        <!-- Body Accordion -->
                        <div id="collapse{{ $loop->index }}" class="collapse" aria-labelledby="headingTwo" data-parent="#acordionClientes">
                            <div class="card-body row">
                                <div class="col">
                                        <ul class="list-group">
                                            <li id="liIdCliente" style="display:none;">{{ $cliente->idCliente }}</li>
                                        <li class="list-group-item"><strong>Telefono(s): </strong>{{ $cliente->vTelefono }} / {{ $cliente->vCelular }}</li>
                                        <li class="list-group-item"><strong>Mail: </strong>{{ $cliente->vEmail }}</li>
                                        <li class="list-group-item"><strong>Direccion: </strong>{{ $cliente->vCalle }} {{ $cliente->vMunicipio }} {{ $cliente->vEstado }}</li>
                                        <li class="list-group-item"><strong>Fecha creacion: </strong>{{ $cliente->created_at }}</li>
                                    </ul>
                                </div>
                                <div class="col">
                                    <div class="pull-right">
                                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg" onclick='getPropuestasByCliente("{{ $cliente->idPersona }}")'><img src="https://img.icons8.com/ios/20/000000/document--v1.png"/><strong>Propuestas</strong></button>
                                    </div>
                                    <!-- Modal *lista-propuestas* -->
                                    <div id="mdlListaPropuestas" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Propuestas</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="table-responsive">
                                                        <!-- Tabla de propuestas -->
                                                        <table id="tbPropuestas" class="table table-bordered table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-center">Propuesta</th>
                                                                    <th class="text-center">Fecha creacion</th>
                                                                    <th class="text-center">Fecha expiracion</th>
                                                                    <th class="text-center">Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <!-- Propuestas - Lista -->
                                                            </tbody>
                                                        </table>
                                                        <!-- Fin_Tabla de propuestas -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Fin_Modal *lista-propuestas* -->
                                    <!-- Modal detalles de Propuesta (filteredId)* -->
                                    <div class="modal fade cd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Detalles propuesta </h5>
                                                    <button type="button" class="close" onclick="closeModalDetailsPropuesta()">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="table-responsive">
                                                        <!-- Tabla Detalles de propuesta(filteredId) -->
                                                        <table class="table table-bordered table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-center">Propuesta</th>
                                                                    <th class="text-center">Fecha creacion</th>
                                                                    <th class="text-center">Fecha expiracion</th>
                                                                    <th class="text-center">Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                
                                                            </tbody>
                                                        </table>
                                                        <!-- Fin_Tabla Detalles de propuesta -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Fin_Modal detalles de Propuesta* -->
                                </div>
                            </div>
                        </div>
                        <!-- Fin_Body Accordion -->
                    </div>
                @endforeach
            @endunless
        @endif
    </div>
@endsection
