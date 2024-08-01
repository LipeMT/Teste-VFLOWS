import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";
import { saveData } from "../services/saveData";

$(document).ready(function () {
  let loading;
  $("#saveData").click(function (event) {
    event.preventDefault();

    const showMessage = (title, type, timeout) => {
      FLUIGC.toast({
        title: `${title}`,
        message: "",
        type: `${type}`,
        timeout: `${timeout}`,
      });
    };

    const form = $("#formSupplier");
    let isValid = true;

    $(form).find('[required]').each(function () {
      if (!this.value.trim()) {
        isValid = false;
        this.focus();
        showMessage("Verifique os campos obrigatórios!", "info", "fast");
        return false;
      }
    });

    if (!isValid) {
      return;
    }

    if ($("#productsRegister").children().length === 0) {
      showMessage("O cadastro precisa de ao menos um produto!", "info", "fast");
      return;
    }

    if ($("#documentRegister").children().length === 0) {
      showMessage("O cadastro precisa de ao menos um anexo!", "info", "fast");
      return;
    }

    loading = FLUIGC.loading(window);
    loading.show();
    saveDataModal();
  });

  function saveDataModal() {
    setTimeout(function () {
      saveData();

      const dataAtual = new Date();
      const dataFormatada = dataAtual.toLocaleDateString();
      const modal = `               
              <p><strong>Fornecedor Cadastrado com sucesso!</strong></p>
              <p>Razão Social: ${$("#name").val()}</p>
              <p>CNPJ: ${$("#doc").val()}</p>
              <p>Data de Cadastro: ${dataFormatada}</p>            
          `;

      loading.hide();

      FLUIGC.modal({
        title: "Dados cadastrados com sucesso",
        content: `${modal}`,
        id: "modalMessage",
        size: "large",
        actions: [
          {
            'label': 'Fechar',
            'autoClose': true
          }
        ]
      });

      $("#name").val("");
      $("#lastName").val("");
      $("#postalCode").val("");
      $("#doc").val("");
      $("#address").val("");
      $("#complement").val("");
      $("#neighborhood").val("");
      $("#state").val("");
      $("#city").val("");
      $("#number").val("");
      $("#stateDoc").val("");
      $("#cityDoc").val("");
      $("#contactName").val("");
      $("#phoneNumber").val("");
      $("#email").val("");
      $("#productsRegister").empty();
      $("#documentRegister").empty();
    }, 3000);
  }
});
