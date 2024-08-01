import $ from "jquery";

const addFluigToast = (title, type, timeout) => {
  FLUIGC.toast({
    title: `${title}`,
    message: "",
    type: `${type}`,
    timeout: `${timeout}`,
  });
};

$(document).ready(function () {
  function limpa_formulário_cep() {
    $("#address").val("");
    $("#municipio").val("");
    $("#bairro").val("");
    $("#state").val("");
    $("#cellnumber").val("");
    $("#complement").val("");
  }

  $("#postalCode").blur(function () {
    var cep = $(this).val().replace(/\D/g, ""); //tira os caracteres não numéricos

    if (cep != "") {
      var validacep = /^[0-9]{8}$/; //validação : aceita numeros de 1 a 9, sem letras e com 8 caract

      if (validacep.test(cep)) {
        $("#address").val("Carregando...");
        $("#city").val("Carregando...");
        $("#neighborhood").val("Carregando...");
        $("#state").val("Carregando...");
        $("#phoneNumber").val("Carregando...");
        $("#complement").val("Carregando...");

        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              $("#address").val(dados.logradouro);
              $("#city").val(dados.localidade);
              $("#neighborhood").val(dados.bairro);
              $("#state").val(dados.uf);
              $("#phoneNumber").val(`(${dados.ddd})`);
              $("#complement").val(dados.complemento);
            } else {
              limpa_formulário_cep();
              addFluigToast("CEP não encontrado", "warning", "fast");
            }
          }
        );
      } else {
        limpa_formulário_cep();
        addFluigToast(
          "Formato de CEP inválido, Tente novamente.",
          "warning",
          "fast"
        );
      }
    } else {
      limpa_formulário_cep();
    }
  });
});
