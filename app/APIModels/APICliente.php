<?php

namespace App\APIModels;

class APICliente extends GuzzleHttpRequest
{
	public function insertarCliente($request)
	{
		return $this->post("agregar-cliente", $request);
	}

	public function eliminarCliente($request)
	{
		return $this->put("eliminar-cliente", $request);
	}

	public function actualizarCliente($request)
	{
		return $this->put("editar-cliente", $request);
	}

	public function consultarClientePorId($request)
	{
		return $this->put("lista-clientes-id", $request);
	}
}
