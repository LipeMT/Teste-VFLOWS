import $ from "jquery";

export function saveData() {

  const listaProdutos = [];
  for (i=1; i <= $("#productsRegister").children().length ; i++){
    const produto = {
      descricaoProduto: $(`#productDescription${i}`).val(),
      unidadeMedida: $(`#unit${i}`).val(),
      qtdeEstoque: $(`#stockQtt${i}`).val(),
      valorUnitario: $(`#unitPrice${i}`).val(),
      valorTotal: $(`#totalPrice${i}`).val(),
    }
    listaProdutos.push(produto);
  }

  const listaDocumentos = [];
  for (i=1; i <= $("#documentRegister").children().length; i++){
    const documento = {
      nomeArquivo: $(`#fileName${i}`).text()
    }
    listaDocumentos.push(documento);
  }

  const jsonData = {
    razaoSocial: $("#name").val(),
    cnpj: $("#doc").val(),
    nomeFantasia: $("#lastName").val(),
    inscricaoEstadual: $("#stateDoc").val(),
    cep: $("#postalCode").val(),
    inscricaoMunicipal: $("#cityDoc").val(),
    endereco: $("#address").val(),
    numero: $("#number").val(),
    complemento: $("#complement").val(),
    bairro: $("#neighborhood").val(),
    municipio: $("#city").val(),
    estado: $("#state").val(),
    nomeContato: $("#contactName").val(),
    telefoneContato: $("#phoneNumber").val(),
    emailContato: $("#email").val(),
    produtos: listaProdutos,
    documentos: listaDocumentos
  };

  console.log(JSON.stringify(jsonData, null, 2));
}
