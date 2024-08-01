import "../api/viaApiCep";

document.getElementById("phoneNumber").addEventListener("input", function (e) {
  var input = e.target.value.replace(/\D/g, "");

  var formatted = "";

  if (input.length > 0) {
    if (input.length <= 2) {
      formatted = "(" + input;
    } else if (input.length <= 6) {
      formatted = "(" + input.substring(0, 2) + ") " + input.substring(2);
    } else if (input.length <= 10) {
      formatted =
        "(" +
        input.substring(0, 2) +
        ") " +
        input.substring(2, 6) +
        "-" +
        input.substring(6);
    } else {
      formatted =
        "(" +
        input.substring(0, 2) +
        ") " +
        input.substring(2, 7) +
        "-" +
        input.substring(7, 11);
    }
  }

  e.target.value = formatted;
});
