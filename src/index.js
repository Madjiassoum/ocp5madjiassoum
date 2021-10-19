let URL_API_PRODUITS = "http://localhost:3000/api/teddies";
document.addEventListener("DOMContentLoaded", () => {
  const produitsListe = document.getElementById("container-produits");
  if (produitsListe) {
    fetch(URL_API_PRODUITS)
      .then((res) => res.json())
      .then((response) => {
        response.forEach((produit, index) => {
          produitsListe.innerHTML += afficherProduits(produit, index);
        });
        function afficherProduits(produit, index) {
          return `
        <div class="produit"}">            
          <p class="photo"><img src="${produit.imageUrl}" alt=""></p>           
          <h2 class="title">${produit.name}</h2>      
          <p class="price">${produit.price / 100} €</p>               
          <p class="description">${produit.description}</p>                
          <p class="ahref">
              <a href="./pages/produit.html?id=${
                produit._id
              }" class="button">Voir ce produit</a>                     
          </p>            
        </div>
        `;
        }
      })
      .catch((erreur) => console.log(erreur));
  }
  // console.log(produitsListe);
  
});
