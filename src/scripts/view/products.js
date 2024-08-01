import $ from "jquery";

$(document).ready(function () {
  let productCount = 1;

  $("#addProduct").click(function () {
    const productName = "Produto - " + productCount;

    const newProduct = $(`

      <div
        class="product-item form-group fs-display-flex fs-justify-content-center fs-align-items-center fs-lg-margin-bottom">
        <button id="delProduct" class="fs-bg-white fs-no-border" type="button"><img
                src="./assets/flaticon-trash.png" alt=""></button>
        <div class="data-product fs-border fs-lg-margin-right fs-lg-padding-right fs-flex-1">
            <span id="product-number" class="fs-xs-margin fs-text-xl">${productName}</span>
            <div
                class="form-group row fs-justify-content-space-between fs-display-flex fs-lg-margin-top fs-align-items-center">
                <fieldset
                class="fs-display-flex fs-justify-content-center fs-align-items-center fs-lg-margin-right">
                    <img src="./assets/flaticon-product.png" alt="Ícone de produto"
                    class="fs-lg-margin-left" height="80px">

                    <div class="form-group">
                        <div class="col-xs-12 fs-sm-margin-bottom">
                            <label for="productDescription">Produto *</label>
                            <input type="text" class="form-control" id="productDescription${productCount}"
                                required="">
                        </div>

                        <div class="col-xs-3">
                            <label for="unit">UND. Medida *</label>
                            <input type="number" class="form-control fs-no-spin" id="unit${productCount}"
                                required="">
                        </div>

                        <div class="col-xs-3">
                            <label for="stockQtt">QDTDE. em Estoque *</label>
                            <input type="number" class="form-control stockQtt fs-no-spin"
                                id="stockQtt${productCount}" required="">
                        </div>

                        <div class="col-xs-3">
                            <label for="unitPrice">Valor Unitário *</label>
                            <input type="number" class="form-control unitPrice fs-no-spin"
                                id="unitPrice${productCount}" required="">
                        </div>

                        <div class="col-xs-3">
                            <label for="totalPrice">Valor Total *</label>
                            <input type="number" class="form-control totalPrice fs-no-spin" disabled
                                id="totalPrice${productCount}" required="">
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>                       
`);

    const addFluigToast = (title, type, timeout) => {
      FLUIGC.toast({
        title: `${title}`,
        message: "",
        type: `${type}`,
        timeout: `${timeout}`,
      });
    };

    addFluigToast("Novo Produto adicionado!", "success", "fast");

    newProduct.appendTo("#productsRegister");
    productCount++;

    newProduct.find("#delProduct").click(function () {
      $(this).closest(".product-item").remove();

      if (productCount > 2) {
        productCount--;
      }
    });

    $(document).ready(function () {
      $(".unitPrice, .stockQtt").on("input", function () {
        $(".unitPrice").each(function (index) {
          var unitValue = parseFloat($(this).val());
          var stockQuantity = parseFloat($(".stockQtt").eq(index).val());

          if (!isNaN(unitValue) && !isNaN(stockQuantity)) {
            var totalValue = unitValue * stockQuantity;
            $(".totalPrice").eq(index).val(totalValue.toFixed(2));
          } else {
            $(".totalPrice").eq(index).val("");
          }
        });
      });
    });
  });
});
