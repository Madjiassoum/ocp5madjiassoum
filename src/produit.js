let url = "http://localhost:3000/api/teddies";
function $_GET(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}


const API_UN_PRODUIT = `http://localhost:3000/api/teddies/${$_GET(
  "id"
)}`;

document.addEventListener("DOMContentLoaded", () => {
  const produitSeul = document.getElementById("produit");
  if (produitSeul) {
    fetch(API_UN_PRODUIT)
      .then((res) => res.json())
      .then((response) => {
        renderProduit(response);

        //! Bouton ajouter au panier
        let ajouterPanier = document.querySelector(".btnEnvoyer");
        ajouterPanier.addEventListener("click", (event) => {
          event.preventDefault();

          // let _id = urlSearchParams.get("id");
          const idUrl = window.location.search;
          console.log(idUrl);
          //! methode 1
          // const leId = idUrl.slice(1);
          // console.log(leId);
          //!  methode 2
          let urlSearchParams = new URLSearchParams(idUrl);
          console.log(urlSearchParams);

          // selection id #quantiteProduit
          const varQte = document.querySelector("#quantiteProduit");
          const valVarQte = varQte.value;

          // selection id #choix_couleur
          const varCouleur = document.querySelector("#choix_couleur");
          const valVarCouleur = varCouleur.value;

          // Affichage ou calcul Prix total
          const prixTotal = valVarQte * (response.price / 100);

          //Création d'un objet représentant le produit sélectionné
          let reponse = {
            _id: response._id,
            title: response.name,
            colors: valVarCouleur,
            price: response.price / 100,
            quantity: 1 * valVarQte,
            prixCetteQuantite: prixTotal,
          };
          console.log(reponse);
          // selection id produit
          const leId = urlSearchParams.get("id");

          // console.log(prixTotal);

          console.log(
            leId +
              " " +
              response.name +
              " " +
              valVarCouleur +
              " " +
              valVarQte +
              " " +
              response.price / 100 +
              "€ " +
              prixTotal
          );

          //! LOCAL STORAGE
          /* declaration de la variable monStockage dans laquelle on met les clés*/
          let monStockage = JSON.parse(localStorage.getItem("produit"));
          // console.log(monStockage);
          let addPdtLocalStorage = () => {
            /*ajout dans le tableau de l'objet avec les values choisi par l'utilisateur*/
            monStockage.push(reponse);
            /*Transformation en forme JSON 
                et envoi dans le local storage   */
            localStorage.setItem("produit", JSON.stringify(monStockage));
            console.log(monStockage);
          };

          // ! fonction popupConfirmation
          const popupConfirmation = () => {
            if (
              window.confirm(
                response.name +
                  ", " +
                  valVarCouleur +
                  `: bien ajouté au panier.
                Cliquez sur Ok = voir PANIER ou Annuler = retour Accueil `
              )
            ) {
              window.location.href = "panier.html";
            } else {
              window.location.href = "../index.html";
            }
          };
          // ! s'il y a deja produits enreg dans localstorage
          if (monStockage) {
            addPdtLocalStorage();
            popupConfirmation();
          }
          // ! s'il n'y a pas de produits enreg dans local storage
          else {
            monStockage = [];
            addPdtLocalStorage();
            popupConfirmation();
          }
        });
      });
  }

  function renderProduit(produit) {
    produitSeul.innerHTML = `    
      <p class="photo"><img src="${produit.imageUrl}" alt=""></p>           
      <h2 id="title" class="title">${produit.name}</h2>
      <div class="lesOptions">
        <form>
          <label for="choix_couleur">Choix couleur</label> 
          <select id="choix_couleur" name="choix_couleur">
            ${produit.colors
              .map((color) => `<option>${color}</option>`)
              .join(", ")}
          </select>
        </form>        
        <form>
          <label for="quantiteProduit">Choix quantité:</label>
          <select name="quantite" id="quantiteProduit">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option> 
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>  
            <option value="15">15</option>                      
          </select>
        </form>
      </div>
      <p id="price" class="price">${produit.price / 100} €</p>               
      <p class="description">${produit.description}</p>              
      <div class="container divbtn">
        <button id="btnEnvoyer" class="btnEnvoyer btn ajout" type="submit">
          Ajout au panier
        </button>         
      </div>  
        `;
  }
});
