var lista;
var option;
var indexador = 0;
var indexMostrar = 0;
var banderaEditar = false;
var arrayPeriodosGDMTH = [];
var objPeriodosGDMTH = {};
var msjConfirm = false;

$(document).ready(function(){
    mostrarPeriodo();
});

function agregarPeriodo(){
    var BkWh = document.getElementById('inpBkWh').value;
    var IkWh = document.getElementById('inpIkWh').value;
    var PkWh = document.getElementById('inpPkWh').value;
    var BkW = document.getElementById('inpBkw').value;
    var IkW = document.getElementById('inpIkw').value;
    var PkW = document.getElementById('inpPkw').value;
    var Bmxn = document.getElementById('B(mxn/kWh)').value;
    var Imxn = document.getElementById('I(mxn/kWh)').value;
    var Pmxn = document.getElementById('P(mxn/kWh)').value;
    var pagoTransmision = document.getElementById('inpPagoTransmision').value;
    var Cmxn = document.getElementById('C(mxn/kW)').value;
    var Dmxn = document.getElementById('D(mxn/kW)').value;

    /*Validar campos vacios*/
    // if(validarCamposVacios(BkWh) || validarCamposVacios(IkWh) || validarCamposVacios(PkWh) || validarCamposVacios(BkW) || validarCamposVacios(IkW) || validarCamposVacios(PkW) || validarCamposVacios(Bmxn) || validarCamposVacios(Imxn) || validarCamposVacios(Pmxn) || validarCamposVacios(pagoTransmision) || validarCamposVacios(Cmxn) || validarCamposVacios(Dmxn))
    // {
    //     // msj = 'Todos los campos pertenecientes a los datos de consumo, deben ser llenados';
    //     // modalMsj(msj,this.msjConfirm);
    //     alert('Todos los campos pertenecientes a los datos de consumo, deben ser llenados');
    // }
    // else{
        objPeriodosGDMTH = {
            bkwh: BkWh || null,
            ikwh: IkWh || null,
            pkwh: PkWh || null,
            bkw: BkW || null,
            ikw: IkW || null,
            pkw: PkW || null,
            bmxn: Bmxn || null,
            imxn: Imxn || null,
            pmxn: Pmxn || null,
            pagoTransmi: pagoTransmision || null,
            cmxn: Cmxn || null,
            dmxn: Dmxn || null
        };
    
        if(arrayPeriodosGDMTH.length < 12){
            arrayPeriodosGDMTH.push(objPeriodosGDMTH);
            sumarAlIndexador();
            limpiarCampos();
        }
        else
        {
            // msj = 'Solo se pueden ingresar 12 periodos';
            // modalMsj(msj,this.msjConfirm);
            lista.remove(lista.selectedIndex);
            //restarAlIndexador();
        }
    // }

    console.log('Longitud de array: '+arrayPeriodosGDMTH.length);
    console.log(arrayPeriodosGDMTH);
}

function eliminarPeriodo(){
    arrayPeriodosGDMTH.splice(0,(indexMostrar-1));
    /*Actualizar el indexador de la lista desplegable*/
    restarAlIndexador();
}

function actualizarPeriodo(){
    arrayPeriodosGDMTH[indexMostrar-1].bkwh = document.getElementById('inpBkWh').value;    ;
    arrayPeriodosGDMTH[indexMostrar-1].ikwh = document.getElementById('inpIkWh').value;
    arrayPeriodosGDMTH[indexMostrar-1].pkwh = document.getElementById('inpPkWh').value;
    arrayPeriodosGDMTH[indexMostrar-1].bkw = document.getElementById('inpBkw').value;
    arrayPeriodosGDMTH[indexMostrar-1].ikw = document.getElementById('inpIkw').value;
    arrayPeriodosGDMTH[indexMostrar-1].pkw = document.getElementById('inpPkw').value;
    arrayPeriodosGDMTH[indexMostrar-1].bmxn = document.getElementById('B(mxn/kWh)').value;
    arrayPeriodosGDMTH[indexMostrar-1].imxn = document.getElementById('I(mxn/kWh)').value;
    arrayPeriodosGDMTH[indexMostrar-1].pmxn = document.getElementById('P(mxn/kWh)').value;
    arrayPeriodosGDMTH[indexMostrar-1].pagoTransmi = document.getElementById('inpPagoTransmision').value;
    arrayPeriodosGDMTH[indexMostrar-1].cmxn = document.getElementById('C(mxn/kW)').value;
    arrayPeriodosGDMTH[indexMostrar-1].dmxn = document.getElementById('D(mxn/kW)').value;
}

function mostrarPeriodo(){
    /*Se desplega el contenido del array en los campos*/ 
    $("#lstPeriodosGDMTH").on("change", function(){
        indexMostrar = document.getElementById("lstPeriodosGDMTH").value;
        
        if(indexMostrar > indexador){
            limpiarCampos();
            desbloquearCampos();
            banderaEditar = false;
        }
        else{
            document.getElementById('inpBkWh').value = arrayPeriodosGDMTH[indexMostrar-1].bkwh.toString();
            document.getElementById('inpIkWh').value = arrayPeriodosGDMTH[indexMostrar-1].ikwh.toString();
            document.getElementById('inpPkWh').value = arrayPeriodosGDMTH[indexMostrar-1].pkwh.toString();
            document.getElementById('inpBkw').value = arrayPeriodosGDMTH[indexMostrar-1].bkw.toString();
            document.getElementById('inpIkw').value = arrayPeriodosGDMTH[indexMostrar-1].ikw.toString();
            document.getElementById('inpPkw').value = arrayPeriodosGDMTH[indexMostrar-1].pkw.toString();
            document.getElementById('B(mxn/kWh)').value = arrayPeriodosGDMTH[indexMostrar-1].bmxn.toString();
            document.getElementById('I(mxn/kWh)').value = arrayPeriodosGDMTH[indexMostrar-1].imxn.toString();
            document.getElementById('P(mxn/kWh)').value = arrayPeriodosGDMTH[indexMostrar-1].pmxn.toString();
            document.getElementById('inpPagoTransmision').value = arrayPeriodosGDMTH[indexMostrar-1].pagoTransmi.toString();
            document.getElementById('C(mxn/kW)').value = arrayPeriodosGDMTH[indexMostrar-1].cmxn.toString();
            document.getElementById('D(mxn/kW)').value = arrayPeriodosGDMTH[indexMostrar-1].dmxn.toString();

            if(indexMostrar < indexador || indexMostrar == indexador){
                /*El usuario estara navegando en los periodos ya guardados en memoria*/
                bloquearCampos();
                /*Y posiblemente quiera editar, por eso se cambia la bandera a true*/
                banderaEditar = true;
            }
            /*else{
                desbloquearCampos();
                banderaEditar = false;
            }*/

            logicaBotones();
        }
        
        console.log('indexMostrar: '+indexMostrar+' indexador: '+indexador);
    });
}

function sumarAlIndexador(){
    indexador = arrayPeriodosGDMTH.length;
    lista = document.getElementById("lstPeriodosGDMTH");    
    option = document.createElement("option");
    option.text = indexador + 1;
    lista.add(option);
    lista.selectedIndex = indexador.toString();
}

function restarAlIndexador(){
    for(let i = arrayPeriodosGDMTH.length; i >= 0; i--){
        lista.remove(i);
    }
    for(let j = 1; j < arrayPeriodosGDMTH.length; j++){
        option = document.createElement("option");
        this.option.text = j;
        lista.add(option);
    }
    lista.selectedIndex = arrayPeriodosGDMTH.length.toString();
}

function validarCamposVacios(valor){
    valor = valor.replace("&nbsp;", "");
    valor = valor == undefined ? "" : valor;

    if (!valor || 0 === valor.trim().length){
        return true;
    }
    else{
        return false;
    }
}

function logicaBotones(){
    if(banderaEditar == true){
        $('#btnEditarPeriodo').prop("disabled",false);
        $('#btnEliminarPeriodo').prop("disabled",false);
        $('#btnAgregarPeriodo').prop("disabled",true);
    }
    else if(banderaEditar == false){
        $('#btnEditarPeriodo').prop("disabled",true);
        $('#btnEliminarPeriodo').prop("disabled",true);
        if((indexador + 1) < 12){
            $('#btnAgregarPeriodo').prop("disabled",true);
        }
    }

    $('#btnEditarPeriodo').click(function(){
        $('#btnActualizarPeriodo').prop("disabled",false);
        $('#btnEditarPeriodo').prop("disabled",true);
        $('#btnEliminarPeriodo').prop("disabled",true);
        $('#btnAgregarPeriodo').prop("disabled",true);
        $("#lstPeriodosGDMTH").prop("disabled",true);
        desbloquearCampos();
    });

    $('#btnActualizarPeriodo').click(function(){
        $('#btnEditarPeriodo').prop("disabled",false);
        $('#btnEliminarPeriodo').prop("disabled",false);
        $('#btnActualizarPeriodo').prop("disabled",true);
        $('#btnAgregarPeriodo').prop("disabled",true);
        $("#lstPeriodosGDMTH").prop("disabled",false);
        bloquearCampos();
    });
}

function backToCotizacion(){
    $("#divCotizacionMediaTension").css("display","");
    $("#divBtnCalcularMT").css("display","");
    $("#divResultCotizacion").css("display","none");
}

function readyLoader(loader){
    $(document)
    .ajaxStart(function(){
        loader.fadeIn();
    })
    .ajaxStop(function(){
        loader.fadeOut();
        $('#divResultCotIndv').css("display","");
    });
}

function sendPeriodsToServer(){
    var direccionCliente = document.getElementById('municipio').value;
    var idCliente = $('#clientes [value="' + $("input[name=inpSearchClient]").val() + '"]').data('value');

    if(direccionCliente == '' || direccionCliente.length == 0){
        alert('Informacion de cliente vacia');
    }
    else{
        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'POST',
            url: '/enviarPeriodos',
            data: {
                "_token": $("meta[name='csrf-token']").attr('content'),
                'arrayPeriodosGDMTH': arrayPeriodosGDMTH,
                'direccionCliente': direccionCliente,
                'idCliente': idCliente
            },
            dataType: 'json'
        })
        .fail(function(){
            alert('Al parecer hubo un error con la peticion AJAX de la cotizacion GDMTH');
        })
        .done(function(respuesta){
            respuesta = respuesta.message;
    
            $.ajax({
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                type: 'GET',
                url: '/resultados'
            })
            .fail(function(){
                alert('Hubo un error al tratar de enviar datos a la vista de -RESULTADOS-');
            })
            .done(function(data){
                var _potenciaReal = 0;

                $('#divCotizacionMediaTension').css("display","none");
                $('#divBtnCalcularMT').css("display","none");
                $('#divResultCotizacion').css("display","");
                
                $('#divResult').html(data);
                console.log(respuesta);
    
                //Consumo
                $('#consumoAnual').html(respuesta[0].consumo.consumoAnual);
                $('#potenciaNecesaria').html(respuesta[0].consumo.potenciaNecesaria);
                $('#promedioConsumo').html(respuesta[0].consumo.promedioConsumo);
                
                //Paneles
                for(var i=1; i<respuesta.length; i++)
                {
                    $('#listPaneles').append(
                        $('<option/>', {
                            value: i,
                            text: respuesta[i].panel.nombre
                        })
                    );
                }
    
                $('#listPaneles').change(function(){
                    var x = $('#listPaneles').val(); //Iteracion
                    
                    if(x === '-1'  || x === -1){
                        $('#numeroModulos').html('');
                        $('#potenciaModulo').html('');
                        $('#potenciaReal').html('');
                        $('#precioModulo').html('');
                        $('#costoEstructuras').html('');
                    }
                    else{
                        _potenciaReal = respuesta[x].panel.potenciaReal;

                        $('#numeroModulos').html(respuesta[x].panel.noModulos);
                        $('#potenciaModulo').html(respuesta[x].panel.potencia);
                        $('#potenciaReal').html(_potenciaReal);
                        $('#precioModulo').html(respuesta[x].panel.precioPanel);
                        $('#costoEstructuras').html(respuesta[x].panel.costoDeEstructuras + '$');
                    }
                    
                    console.log('DropDownList value: '+x);
                });

                $.ajax({
                    type: 'GET',
                    url: '/inversores'
                })
                .fail(function(){
                    alert('Hubo un error al intentar cargar el dropdownlist de Inversores');
                }).
                done(function(response){
                    console.log(response);
                    //Llenado de dropdownlist de Inversores
                    for(var j=0; j<response.length; j++)
                    {
                        $('#listInversores').append(
                            $('<option/>', {
                                value: j,
                                text: response[j].vNombreMaterialFot
                            })
                        );
                    }

                    $('#listInversores').change(function(){
                        var x = $('#listPaneles').val(); //Iteracion
                        var idInversor = response[x].idInversor;

                        $.ajax({
                            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                            type: 'POST',
                            url: '',
                            data: {
                                "_token": $("meta[name='csrf-token']").attr('content'),
                                "idInversor": idInversor,
                                "_potenciaReal": _potenciaReal
                            },
                            dataType: 'json'
                        })
                        .fail(function(){
                            alert('Hubo un error al intentar calcular el numero de inversorse MediaTension');
                        })
                        .done(function(reply){
                            console.log(reply);
                        });
                    });
                });
            });
        });
    }
}

function validarEnvioDePeriodo(){
    
    if(arrayPeriodosGDMTH.length == 0 || arrayPeriodosGDMTH.length == 1){
        msj = 'Ups! Número de periodos insuficientes para calcular';
        modalMsj(msj,this.msjConfirm);
    }
    else if(arrayPeriodosGDMTH.length < 12){
        this.msjConfirm = true;
        msj = 'No se estan obteniendo los 12 periodos esperados, se realizara un promedio de los datos faltantes ¿Desea enviar?';
        if(modalMsj(msj,msjConfirm) == true){
            sendPeriodsToServer();
            limpiarCampos();
            //console.log(arrayPeriodosGDMTH);
            /*
                -Desplegar un spinner que simule la carga/calculo de la cotización, en lo 
                el servidor realiza las operaciones necesarias
            */
        }
    }
    else if(arrayPeriodosGDMTH.length == 12){
        sendPeriodsToServer();
        limpiarCampos();
        this.arrayPeriodosGDMTH = [];
        console.log(arrayPeriodosGDMTH);
        /*
            -Desplegar un spinner que simule la carga/calculo de la cotización, en lo 
             el servidor realiza las operaciones necesarias
        */
    } 
}

function modalMsj(msj,msjConfirm){
    if(msjConfirm == true){
        var confirmacion = confirm(msj);

        return confirmacion ? true : false; 
    }
    else{
        alert(msj);
    }
}

function bloquearCampos(){
    $('input[type="number"]').attr("readOnly",true);
}

function desbloquearCampos(){
    $('input[type="number"]').attr("readOnly",false);
}

function limpiarCampos(){
    $('input[type="number"]').val('');
}

function GDMTH(){
    document.getElementById('divGDMTO').style.display = 'none';
    document.getElementById('divGDMTH').style.display = '';
}