import $ from "jquery";

$(document).ready(function () {
  let documentCount = 1;
  let attachments = [];

  $("#add-document").change(function () {
    const addFluigToast = (title, type, timeout) => {
      FLUIGC.toast({
        title: `${title}`,
        message: "",
        type: `${type}`,
        timeout: `${timeout}`,
      });
    };

    addFluigToast("Novo documento salvo com sucesso!", "success", "fast");

    const files = $(this)[0].files;

    for (let i = 0; i < files.length; i++) {
      const documentName = "Documento em anexo " + documentCount;
      const file = files[i];
      const fileURL = URL.createObjectURL(file);
      const blob = new Blob([file], { type: file.type });

      attachments.push({ name: documentName, blob });

      const newDocument = $(`
        <div class="fs-display-flex fs-align-items-center">
              <button class="removeDocument btn-link" type="button">
                  <img src="/assets/flaticon-trash.png" title="Excluir Anexo">
              </button>
              <a id="fileContent" class="btn-link fs-lg-margin-right" href="${fileURL}" download="${documentName}">
                  <img src="./assets/flaticon-view.png" title="Baixar Anexo">
              </a>
              <p id="fileName${documentCount}" class="fs-font-bold fs-text-lg fs-color-black fs-xs-margin">${documentName}</p>
          </div>
      `);

      newDocument.appendTo("#documentRegister");
      documentCount++;

      newDocument.find(".removeDocument").click(function (e) {
        e.preventDefault();
        URL.revokeObjectURL(fileURL);
        attachments = attachments.filter(
          (attachment) => attachment.name !== documentName
        );
        $(this).closest(".fs-display-flex").remove();

        if ($("#documentRegister .fs-display-flex").length === 0) {
          documentCount = 1;
        }
      });
    }

    sessionStorage.setItem("attachments", JSON.stringify(attachments));
  });
});
