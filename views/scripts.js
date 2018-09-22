$(function (){
	//Post
	$('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput1 = $('#dataIntegracao');
        var createInput2 = $('#dataUltAlteracao');
        var createInput3 = $('#formulaCalculo');
        var createInput4 = $('#idDrgIntegracao');
        var createInput5 = $('#identDirecaoSeta');
        var createInput6 = $('#identPeriodicidade');
        var createInput7 = $('#identReferencial');

        $.ajax({
            url: '/indicador/save',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ dataIntegracao: createInput1.val(), dataUltAlteracao: createInput2.val(), formulaCalculo: createInput3.val(), idDrgIntegracao: createInput4.val(), identDirecaoSeta: createInput5.val(), identPeriodicidade: createInput6.val(), identReferencial: createInput7.val(), informacoesAdicionais: createInput1.val(), nome: createInput2.val(), numDecimais: createInput3.val(), objetivo: createInput4.val(), unidade: createInput5.val(), usuarioUltAlteracao: createInput6.val(), versao: createInput7.val() }),
            success: function(response) {
                console.log(response);
                createInput1.val('');
                createInput2.val('');
                createInput3.val('');
                createInput4.val('');
                createInput5.val('');
                createInput6.val('');
                createInput7.val('');
            }
        });
    });
});
