/* declaration de la variable monStockage 
 dans laquelle on met les clés*/
let monStockage = JSON.parse(localStorage.getItem("produit"));

// console.log(monStockage);
// ! Affichage des produits du panier
let monPanier = document.querySelector(".container-recap");
// console.log(monPanier);

// si le panier est vide: Afficher le panier est vide
if (monStockage === null || monStockage == 0) {
  const panierVide = `
 <div class="messagePanierVide">
     <div><span>Oups!</span> Votre panier est vide !<br>
     Dans <i>Accueil en haut</i>, <br> faites un clic et choisir un produit.</div>
 </div> 
 `;
  // ! Mis les class en display none
  // cacher titre h2 sous h1
  const h2_h1 = document.querySelector(".h2_sous_h1");
  h2_h1.style.display = "none";
  const bouton_divbtn = document.querySelector(".divbtn");
  // console.log(bouton_divbtn);
  bouton_divbtn.style.display = "none";

  // cacher zone pour coordonnées
  const section_form = document.querySelector(".section-form");
  // console.log(section_form);
  section_form.style.display = "none";

  // injection du html du message panier vide
  monPanier.innerHTML = panierVide;
}
// pour afficher toute la page
else {
  /* si le panier n'est pas vide:afficher les produits ds localStorage */
  let reponsePanier = [];
  // todo
  for (j = 0; j < monStockage.length; j++) {
    reponsePanier =
      reponsePanier +
      ` <div class="container-recap">
          <p>${monStockage[j].title}</p>
          <p>${monStockage[j].colors}</p>
          <p>${monStockage[j].quantity}</p>
          <p>${monStockage[j].price} €</p>
          <p>${monStockage[j].prixCetteQuantite} €</p>
          <button class="petitBouton">suppr</button>
        </div>      
      `;
  }
  if (j == monStockage.length) {
    //injection html dans la page panier
    monPanier.innerHTML = reponsePanier;
  }
  // console.log("Il y a " + monStockage.length + " produits dans votre panier");
  // console.log(monStockage);
  // console.log(monStockage[2]);



// //? calcul du prix total

let totalPanierC = [];
// aller chercher prix dans le panier
for (let m = 0; m < monStockage.length; m++) {
  let prixTotalArticle = monStockage[m].prixCetteQuantite;
  totalPanierC.push(prixTotalArticle);
  // console.log(totalPanierC);
}
// additionner les prix du tableau
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = totalPanierC.reduce(reducer, 0);
// console.log(prixTotal);

// Le prix total du panier
const affichePrixHtml = `
  <div id="totalColonne" class="totalColonne contain-totaux">
    <span class="textPT">Total à payer</span>
    <span id="insertPrixTotal" class="insertPrixTotal">${prixTotal} €</span>
  </div>
`;
// injection dans html
monPanier.insertAdjacentHTML("beforeend", affichePrixHtml);
// ! affichage du prixTotal dans le localStorage
localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}

// ! suppression du panier
let emptyButton = document.getElementById("supcontenu");
emptyButton.addEventListener("click", function () {
  localStorage.clear("prixPanier");
  window.location.reload();
});

// ! btn_supp debut
// selection des boutons supp article
let btn_supprimer = document.querySelectorAll(".petitBouton");
// console.log(btn_supprimer);
for (let l = 0; l < btn_supprimer.length; l++) {
  btn_supprimer[l].addEventListener("click", (event) => {
    event.preventDefault();

    // selection id de l'article à supprimer
    let indice_a_supprimer = monStockage[l]._id;
    console.log("indice_a_supprimer");
    console.log(btn_supprimer);
    console.log(indice_a_supprimer);

    // methode filter
    monStockage = monStockage.filter((el) => el._id !== indice_a_supprimer);
    console.log(monStockage);

    // envoi variable dans le local storage
    localStorage.setItem("produit", JSON.stringify(monStockage));
    // monStockage = localStorage.getItem("produit");
    // monStockage = JSON.parse(monStockage);
    alert("Tout produit de ce même ID va être supprimé");
    window.location.href = "panier.html";
  });
}

// ! btn_supp fin

//TODO ******SECTION de FORM

let nom = document.querySelector("#name");
let prenom = document.querySelector("#prename");
let email = document.querySelector("#email");
let adresse = document.querySelector("#text");
let ville = document.querySelector("#city");

//
let validFormulaire = document.querySelector(".confirm-formulaire");
function validInput(input) {
  let vilNomPrenomRegex =
    /^[a-zA-ZéèîïÉÈÎÏ][a-zA-Zéèêàçîï-]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zA-Zéèêàçîï]+)?$/;

  // let vilNomPrenomRegex = /^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$/;
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let adresseRegex = /^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/;
  let villeRegex = /^[A-Z][A-Za-zÀ-ÿ\ -]+$/;

  if (nom.value.length === 0 || !vilNomPrenomRegex.test(nom.value)) {
    nom.style.borderColor = "red";
    nom_m.textContent = `Champ nom vide ou format invalide`;
    nom_m.style.color = "red";
  } else if (
    prenom.value.length === 0 ||
    !vilNomPrenomRegex.test(prenom.value)
  ) {
    prenom.style.borderColor = "red";
    prenom_m.textContent = `Champ prénom vide ou format invalide`;
    prenom_m.style.color = "red";
  } else if (email.value.length === 0 || !emailRegex.test(email.value)) {
    email.style.borderColor = "red";
    email_m.textContent = `Champ Email vide ou format invalide`;
    email_m.style.color = "red";
  } else if (adresse.value.length === 0 || !adresseRegex.test(adresse.value)) {
    adresse.style.borderColor = "red";
    adresse_m.textContent = `Champ Adresse est vide ou format invalide`;
    adresse_m.style.color = "red";
  } else if (ville.value.length === 0 || !vilNomPrenomRegex.test(ville.value)) {
    ville.style.borderColor = "red";
    ville_m.textContent = `Champ Ville est vide ou format invalide`;
    ville_m.style.color = "red";
  }
}

validFormulaire.addEventListener("click", function (event) {
  event.preventDefault();
  validInput();

  class FormulaireStruc {
    constructor(nom, prenom, email, adresse, ville) {
      this.nom = document.querySelector("#name").value;
      this.prenom = document.querySelector("#prename").value;
      this.email = document.querySelector("#email").value;
      this.adresse = document.querySelector("#text").value;
      this.ville = document.querySelector("#city").value;
    }
  }
  // ? Appel instance de classe
  const Formulaire = new FormulaireStruc();
  // console.log("Mon Formulaire est");
  // console.log(Formulaire);
  // console.log(validFormulaire);
  // todo bas
  let vilNomPrenomRegex =
    /^[a-zA-ZéèîïÉÈÎÏ][a-zA-Zéèêàçîï-]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zA-Zéèêàçîï]+)?$/;

  // let vilNomPrenomRegex = /^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$/;
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let adresseRegex = /^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/;
  if (
    vilNomPrenomRegex.test(nom.value) &&
    vilNomPrenomRegex.test(prenom.value) &&
    emailRegex.test(email.value) &&
    adresseRegex.test(adresse.value) &&
    vilNomPrenomRegex.test(ville.value) === true
  ) {
    localStorage.setItem("Formulaire", JSON.stringify(Formulaire));
    alert("Formulaire bien rempli, et commande passée");
     window.location.href = "confirmation.html";
  } else {
    alert(
      "Veuillez bien remplir ce champ en rouge SVP il y a soit un format peut-être non accepté !"
    );
  }
  // todo HAUT
  /* Envoi produits selectionnés "monStockage" et
  contenu formulaire "Formulaires" vers le server */
  const envoiPanierFormulaire = { monStockage, prixTotal, Formulaire };
  console.log("envoiPanierFormulaire");
  console.log(envoiPanierFormulaire);

  //todo Envoi de l'objet "envoiPanierFormulaire" vers le server
  // // let url = "https://oc-p5-api.herokuapp.com/api/teddies";
  // function send() {
  //   const Formulaire = new FormulaireStruc(
  //     document.querySelector("#name").value,
  //     document.querySelector("#prename").value,
  //     document.querySelector("#email").value,
  //     document.querySelector("#text").value,
  //     document.querySelector("#city").value
  //   );

  function sendFormData(data) {
    fetch("https://ocp5-api.herokuapp.com/api/teddies/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envoiPanierFormulaire),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        storeIdName(response);
      })
      .catch((error) => alert("Erreur : " + error));
  }  

  localStorage.setItem("Formulaire", JSON.stringify(Formulaire));
  });

//! mettre le contenu du local storage dans les champs formulaire
/**prendre la key dans le localStorage et
 *  la mettre dans 1 variable*/
const coordDuLocalStorage = localStorage.getItem("Formulaire");
// console.log("contenu du coordDuLocalStorage");
// console.log(coordDuLocalStorage);
//  conversion chaine de caractere en objet javascript

const coordDuLocalStorageT = JSON.parse(coordDuLocalStorage);
if (coordDuLocalStorageT == null) {
  console.log("Le local storage a pour valeur nulle");
} else {
  document.querySelector("#name").value = coordDuLocalStorageT.nom;
  document.querySelector("#prename").value = coordDuLocalStorageT.prenom;
  document.querySelector("#email").value = coordDuLocalStorageT.email;
  document.querySelector("#text").value = coordDuLocalStorageT.adresse;
  document.querySelector("#city").value = coordDuLocalStorageT.ville;
}
