// ! suppression du panier
let emptyButton = document.getElementById("supcontenu");
emptyButton.addEventListener("click", function () {
  localStorage.clear("prixPanier");
  window.location.reload();
});
