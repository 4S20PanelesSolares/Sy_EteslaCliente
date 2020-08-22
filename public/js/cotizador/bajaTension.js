var direccionCliente = '';
var tarifaSelected = '';
$(function(){
    chooseSwitch();
});

/*#region Logica_controles*/
function catchConsumption(){
    const dictionaryTarifas = {"1":1, "1a":1, "1b":1, "1c":1, "1d":1, "1e":1, "1f":1, "2":1, "IC":1};
    var consumos = 0;
    var demandas = 0;
    var _consumDems = [];
    var objConsumDems = {};
    tarifaSelected = $('#tarifa-actual').val().toString();

    if(dictionaryTarifas.hasOwnProperty(tarifaSelected) === true){
        if($('#switch-2').is(':checked')){
            consumos = $('#men-val-1').val() || 0;
            demandas = $('#men-val-1a').val() || 0;

            objConsumDems = {
                consumos: consumos,
                demandas: demandas
            };

            _consumDems.push(objConsumDems);
        }
        else{
            for(var i=0; i<12; i++)
            {
                consumos = $('#men-val-'+i.toString()).val() || 0;
                demandas = $('#men-val-'+i.toString()+'a').val() || 0;

                objConsumDems = {
                    consumos: consumos,
                    demandas: demandas
                };

                _consumDems.push(objConsumDems);
            }
        }

        return _consumDems;
    }
    else{
        alert('Problemas con la tarifa seleccionada o inexistente');
    }
}

function backToCotizacionBT(){
    $("#divCotizacionBajaTension").css("display","");
    $("#divBtnCalcularBT").css("display","");
    $("#divResultCotizacionBT").css("display","none");
}

function chooseSwitch(){
    var valor = 0;
    $('#switchConvEquip').on("click", function(){
        if(valor === 0){
            $('#lblConvEquip').text('Equipos');
            $('#lblSwitchConvEquip').text("Elegir convinacion");
            $('#divConvinaciones').css("display","none");
            $('#divElegirEquipo').css("display","");
            valor = 1;
        }
        else{
            $('#lblConvEquip').text('Convinaciones');
            $('#lblSwitchConvEquip').text("Elegir equipo");
            $('#divConvinaciones').css("display","");
            $('#divElegirEquipo').css("display","none");
            valor = 0;
        }
    });
}
/*#endregion*/
/*#region Validaciones*/
function validarInputsVacios(){

}

function validarUsuarioCargado(direccion_Cliente){
    if(direccion_Cliente){
        return true;
    }
    else{
        alert('Falto cargar un cliente');
        return false;
    }
}
/*#endregion*/
/*#region Server*/
function sendCotizacionBajaTension(){
    var idCliente = $('#clientes [value="' + $("input[name=inpSearchClient]").val() + '"]').data('value');
    var direccionCliente = document.getElementById('municipio').value;

    if(validarUsuarioCargado(direccionCliente) === true){
        var _consumos = catchConsumption();

        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'POST',
            url: '/sendPeriodsBT',
            data: {
                "_token": $("meta[name='csrf-token']").attr('content'),
                'idCliente': idCliente,
                'consumos': _consumos,
                'direccionCliente': direccionCliente,
                'tarifa': tarifaSelected
            },
            dataType: 'json'
        })
        .fail(function(){
            alert('Al parecer hubo un error con la peticion AJAX de la cotizacion BajaTension');
        })
        .done(function(respuesta){
            console.log(respuesta);

            //Se pinta vista de -resultados- y llena DropDownList de -Paneles-
            getResultsView(respuesta);
        });
    }
}

function getResultsView(_respuesta){
    var _respuesta = _respuesta.message;

    $.ajax({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'GET',
        url: '/resultados'
    })
    .fail(function(){
        alert('Al parecer hubo un error al intentar cargar vista de resultados');
    })
    .done(function(resultView){
        $('#divCotizacionBajaTension').css("display","none");
        $('#divBtnCalcularBT').css("display","none");
        $('#divResultCotizacionBT').css("display","");
        $('#divResult_bt').html(resultView);

        //Main() - Combinaciones_SmartSearch
        askCombination();

        //Se carga dropDownList -Paneles-
        fullDropDownListPaneles(_respuesta);

        console.log('_respuesta says: ');
        console.log(_respuesta);

        //Se pintan resultados de -Energia/Paneles_Requeridos-
        //Consumo - /Tabla_oculta\
        $('#consumoAnual').html(_respuesta[0].consumo.consumoAnual + 'W');
        $('#potenciaNecesaria').html(_respuesta[0].consumo.potenciaNecesaria + 'W');
        $('#promedioConsumo').html(_respuesta[0].consumo.promedioConsumo + 'W');

        $('#listPaneles').change(function(){
            $('#listInversores').val(-1);
            var x = parseInt($('#listPaneles').val()); //Iteracion
                        
            if(x === '-1'  || x === -1){
                // /Tabla_oculta\
                $('#numeroModulos').html('');
                $('#potenciaModulo').html('');
                $('#potenciaReal').html('');
                $('#precioModulo').html('');
                $('#costoEstructuras').val('');

                $('#inpCostTotalPaneles').val('');
                $('#listInversores').prop("disabled", true);
                $('#listInversores').val("-1");

                //Se esconde pestania de : POWER
                $('#navPower').css("display","none");
                $('#power').css("display","none");

                //Desaparece cantidad (numerito) de -Paneles y Estructuras-
                $('#txtCantidadPaneles').html('');
                $('#txtCantidadEstructuras').html('');
            }
            else{
                _potenciaReal = _respuesta[x].panel.potenciaReal;

                //Paneles - /Tabla_oculta\
                $('#numeroModulos').html(_respuesta[x].panel.noModulos).val(_respuesta[x].panel.noModulos);
                $('#potenciaModulo').html(_respuesta[x].panel.potencia + 'W').val(_respuesta[x].panel.potencia);
                $('#potenciaReal').html(_potenciaReal + 'W').val(_potenciaReal);
                //$('#precioModulo').html(_respuesta[x].panel.precioPanel + '$').val(_respuesta[x].panel.precioPanel);
                $('#costoEstructuras').html(_respuesta[x].panel.costoDeEstructuras + '$').val(_respuesta[x].panel.costoDeEstructuras);
                $('#costoPorWatt').html(_respuesta[x].panel.costoPorWatt + '$').val(_respuesta[x].panel.costoPorWatt);
                $('#costoTotalModulos').html(_respuesta[x].panel.costoTotalPaneles + '$').val(_respuesta[x].panel.costoTotalPaneles);
                
                //Aparece cantidad (numerito) de -Paneles y Estructuras-
                $('#txtCantidadPaneles').html('<strong> ('+_respuesta[x].panel.noModulos+')</strong>');
                $('#txtCantidadEstructuras').html('<strong> ('+_respuesta[x].panel.noModulos+')</strong>');

                $('#listInversores').prop("disabled", false);
                $('#inpCostTotalPaneles').val(_respuesta[x].panel.costoTotalPaneles + '$');
                $('#inpCostTotalEstructuras').val(_respuesta[x].panel.costoDeEstructuras + '$');

                //Se carga dropDownList -Inversores-
                fullDropDownListInversoresSelectos(_potenciaReal);

                // cargarPowerPage();
            }
        });
    });
}

function cargarPowerPage(){
    /*[Hoja: POWER]*/
    $.ajax({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'POST',
        url: '/firstStepPower',
        data: {
            "_token": $("meta[name='csrf-token']").attr('content'),
            "arrayPeriodosGDMTH": arrayPeriodosGDMTH,
            "porcentajePerdida": porcentajePerdida,
            "potenciaReal": _potenciaReal,
            "tipoCotizacion": tipoCotizacion
        },
        dataType: 'json'
    })
    .fail(function(){
        alert('Error al intentar generar calculos de [Hoja: POWER]');
    })
    .done(function(resp){
        resp = resp.message;
        
        console.log('[Hoja: POWER]');
        console.log(resp);

        $('#tdProduccionAnualKwh').text(resp[0].arrayProduccionAnual[0].produccionAnualKwh);
        $('#tdProduccionAnualMwh').text(resp[0].arrayProduccionAnual[0].produccionAnualMwh);
        $('#tdTotalSinSolar').text(resp[0].arrayPagosTotales[0].arrayTotalesAhorro[0].totalSinSolar);
        $('#tdTotalConSolar').text(resp[0].arrayPagosTotales[0].arrayTotalesAhorro[0].totalConSolar);
        $('#tdAhorro').text(resp[0].arrayPagosTotales[0].arrayTotalesAhorro[0].ahorroCifra);
        $('#tdAhorroPorcentaje').text(resp[0].arrayPagosTotales[0].arrayTotalesAhorro[0].ahorroPorcentaje+'%');
        
        arrayResponse = resp[0].arrayPagosTotales[0].arrayPagosTotales;

        $('#listPagosTotales').change(function(){
            valueListPagosTotales = $('#listPagosTotales').val();

            for(var i=0; i<arrayResponse.length; i++){
                if(valueListPagosTotales == "optSinSolar"){
                    $('#inpEnergia'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].sinSolar.energia);
                    $('#inpCapacidad'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].sinSolar.capacidad);
                    $('#inpDistribucion'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].sinSolar.distribucion);
                    $('#inpIVA'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].sinSolar.iva);
                    $('#inpTotal'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].sinSolar.total);
                }
                else if(valueListPagosTotales == "optConSolar"){
                    $('#inpTransmision'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].conSolar.transmision);
                    $('#inpEnergia'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].conSolar.energia);
                    $('#inpCapacidad'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].conSolar.capacidad);
                    $('#inpDistribucion'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].conSolar.distribucion);
                    $('#inpIVA'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].conSolar.iva);
                    $('#inpTotal'+i).text(resp[0].arrayPagosTotales[0].arrayPagosTotales[i].conSolar.total);
                }
                else{
                    $('#inpTransmision'+i).text('');
                    $('#inpEnergia'+i).text('');
                    $('#inpCapacidad'+i).text('');
                    $('#inpDistribucion'+i).text('');
                    $('#inpIVA'+i).text('');
                    $('#inpTotal'+i).text('');
                }
            }
        });

        $('#navPower').css("display","");
        $('#power').css("display","");
    });
}

function fullDropDownListPaneles(_respuesta){
    //DropDownList-Paneles
    for(var i=1; i<_respuesta.length; i++)
    {
        $('#listPaneles').append(
            $('<option/>', {
                value: i,
                text: _respuesta[i].panel.nombre
            })
        );
    }
}

function fullDropDownListInversoresSelectos(_potenciaReal){
    $.ajax({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'POST',
        url: '/inversoresSelectos',
        data: {
            "_token": $("meta[name='csrf-token']").attr('content'),
            "potenciaReal": _potenciaReal
        },
        dataType: 'json'
    })
    .fail(function(){
        alert('Hubo un error al intentar cargar el dropdownlist de Inversores-Selectos');
    })
    .done(function(response){
        var response = response.message;

        console.log('fullDropDownListInversores() says:');
        console.log(response);

        //DropDownList-Inversores
        for(var j=0; j<response.length; j++)
        {
            $('#listInversores').append(
                $('<option/>', {
                    value: j,
                    text: response[j].nombreInversor
                })
            );
        }
        
        $('#listInversores').change(function(){
            var xi = $('#listInversores').val(); //Iteracion

            if(xi === '-1' || xi === -1){
                // /Tabla_oculta\
                $('#cantidadInversores').html('');
                $('#potenciaInversor').html('');
                $('#potenciaMaximaInv').html('');
                $('#potenciaNominalInv').html('');
                $('#potenciaPicoInv').html('');
                $('#porcentajeSobreDim').html('');
                $('#precioInv').html('');
                $('#divTotalesProject').css("display","");

                // /Interfaz_visible\
                $('#inpCostTotalInversores').val('').text('');

                //Panel de ajuste de cotizacion - Desaparece
                $('#tblAjusteCotiMT').css("display","none");
                
                //Se desaparece numerito -Cantidad_Inversores-
                $('#txtCantidadPaneles').html('');
            }
            else{
                //Panel de ajuste de cotizacion - Aparece
                $('#tblAjusteCotiMT').css("display","");

                //Se agrega nmerito -Cantidad_Inversores-
                $('#txtCantidadInversores').html('<strong> ('+response[xi].numeroDeInversores+')</strong>');

                //Se cargan los inputs de la vista
                $('#inpCostTotalInversores').val(response[xi].precioTotalInversores);

                //Inversores  - /Tabla_oculta\
                $('#cantidadInversores').html(response[0].numeroDeInversores).val(response[0].numeroDeInversores);
                $('#potenciaInversor').html(response[0].potenciaInversor + 'W').val(response[0].potenciaInversor);
                $('#potenciaMaximaInv').html(response[0].potenciaMaximaInversor + 'W').val(response[0].potenciaMaximaInversor);
                $('#potenciaNominalInv').html(response[0].potenciaNominalInversor + 'W').val(response[0].potenciaNominalInversor);
                $('#potenciaPicoInv').html(response[0].potenciaPicoInversor + 'W').val(response[0].potenciaPicoInversor);
                $('#porcentajeSobreDim').html(response[0].porcentajeSobreDimens + '%').val(response[0].porcentajeSobreDimens);
                $('#precioInv').html(response[0].precioInversor + '$').val(response[0].precioInversor); 
                $('#costoTotalInversores').html(response[0].precioTotalInversores + '$').val(response[0].precioTotalInversores);

                //Se calculan viaticos
                calcularViaticosBT();
            }
        });
    });
}

function calcularViaticosBT(){
    direccionCliente = document.getElementById('municipio').value;
    /*#region Se cargan las variables que se enviaran por la solicitud, a traves de la extraccion del val() del control/input que lo contiene*/
    /*Viaticos y Totales*/
    /*#region Datos requeridos para poder calcular viaticos y totales*/
    ///Panel
    var potenciaPanel = $('#potenciaModulo').val();
    var cantidadPaneles = $('#numeroModulos').val();
    var potenciaReal = $('#potenciaReal').val();
    var precioPorWatt = $('#costoPorWatt').val();
    var costoDeEstructuras = $('#costoEstructuras').val();
    var costoTotalPaneles = $('#costoTotalModulos').val();
    ///Inversor
    var potenciaInversor = $('#potenciaInversor').val();
    var potenciaNominalInversor = $('#potenciaNominalInv').val();
    var precioInversor = $('#precioInv').val();
    var potenciaMaximaInversor = $('#potenciaMaximaInv').val();
    var numeroDeInversores = $('#cantidadInversores').val();
    var potenciaPicoInversor = $('#potenciaPicoInv').val();
    var porcentajeSobreDimens = $('#porcentajeSobreDim').val();
    var costoTotalInversores = $('#costoTotalInversores').val();
    /*#endregion*/

    objPeriodosGDMTH = {
        panel: {
            potenciaPanel: potenciaPanel,
            cantidadPaneles: cantidadPaneles,
            potenciaReal: potenciaReal,
            precioPorWatt: precioPorWatt,
            costoDeEstructuras: costoDeEstructuras,
            costoTotalPaneles: costoTotalPaneles
        },
        inversor: {
            potenciaInversor: potenciaInversor,
            potenciaNominalInversor: potenciaNominalInversor,
            precioInversor: precioInversor,
            potenciaMaximaInversor: potenciaMaximaInversor,
            numeroDeInversores: numeroDeInversores,
            potenciaPicoInversor: potenciaPicoInversor,
            porcentajeSobreDimens: porcentajeSobreDimens,
            costoTotalInversores: costoTotalInversores
        }
    }

    _cotizaViaticos.push(objPeriodosGDMTH);

    $.ajax({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'POST',
        url: '/calcularViaticosBTI',
        data: {
            "_token": $("meta[name='csrf-token']").attr('content'),
            "arrayBTI": _cotizaViaticos,
            "direccionCliente": direccionCliente
        },
        dataType: 'json'
    })
    .fail(function(){
        alert('Hubo un error al intentar de obtener los viaticos y totales');
    })
    .done(function(answ){
        var answ = answ.message;
        
        console.log('Viaticos: ');
        console.log(answ);

        //Se pintan los resultados del calculo de viaticos
        // /Interfaz_visible\
        $('#inpCostoTotalViaticos').val(answ[0].totales.totalViaticosMT + '$');
        $('#inpPrecio').val(answ[0].totales.precio + '$');
        $('#inpPrecioIVA').val(answ[0].totales.precioMasIVA + '$');
        $('#inpPrecioMXN').val(answ[0].totales.precioTotalMXN + '$');
    });
}
/*#region Convinaciones (busqueda_inteligente)*/
function askCombination(){
    var _consumos = catchConsumption();
    direccionCliente = document.getElementById('municipio').value;

    $.ajax({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        type: 'POST',
        url: '/askCombinations',
        data: {
            "_token": $("meta[name='csrf-token']").attr('content'),
            'consumos': _consumos,
            'direccionCliente': direccionCliente,
            'tarifa': tarifaSelected
        },
        dataType: 'json'
    })
    .fail(function(){
        alert('Hubo un error al intentar solicitar la convinacion '+ixu.toString());
    })
    .done(function(rspt){
        var rspt = rspt.message;

        console.log("Combinaciones says: ");
        console.log(rspt);
    });


















    /* var listaConvinaciones = $('#listConvinaciones');

    listaConvinaciones.change(function(){
        var ixu = listaConvinaciones.val();
        
        if(ixu === '-1' || ixu === -1){
            //Se oculta el DIV extra que muestra inf. de Panel/Inversor
            $('#divPlusEquipos').css("display","none");
            //Se oculta check para salvar busqueda_inteligente
            $('#checkSalvarCombinacion').css("display","none");
        }
        else{
            $('#divPlusEquipos').css("display","");
            $('#checkSalvarCombinacion').css("display","");

            //Send to server
            
        }
    }); */
}
/*#endregion*/
/*#endregion*/