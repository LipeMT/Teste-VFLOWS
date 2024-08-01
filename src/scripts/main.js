import "./view/modal.js";
import "./view/supplierDataForm.js";
import "./view/products.js";
import "./view/attachedDocuments.js";

$(document).ready(function () {
  $(".valorunitario, .qdtdeemestoque").on("input", function () {
    $(".valorunitario").each(function (index) {
      var unitValue = parseFloat($(this).val());
      var stockQuantity = parseFloat($(".qdtdeemestoque").eq(index).val());

      if (!isNaN(unitValue) && !isNaN(stockQuantity)) {
        var totalValue = unitValue * stockQuantity;
        $(".valortotal").eq(index).val(totalValue.toFixed(2));
      } else {
        $(".valortotal").eq(index).val("");
      }
    });
  });
});
