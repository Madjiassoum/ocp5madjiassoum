let divCom = document.querySelector(".confiCommande");
console.log(divCom);
let montantCom = document.querySelector('.montantComSpan')
console.log('montant total commande')
console.log(montantCom);
let numeroCom = document.querySelector('.numComSpan');
console.log('mon numero de commande')
console.log(numeroCom)
// localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

/* Date & heure de la commande */
let dhms = new Date();
let date =
  dhms.getDate() + "-" + (dhms.getMonth() + 1) + "-" + dhms.getFullYear();
let hours = dhms.getHours() + ":" + dhms.getMinutes() + ":" + dhms.getSeconds();
let DateEtHeure = date + " " + hours;
let afficherDate = document.querySelector(".dateHeureCom span");
afficherDate.textContent = DateEtHeure;
console.log("Mon heure de la commande" )
console.log(dhms);

//  const envoiPanierFormulaire = { monStockage, prixTotal, Formulaire };

//  console.log(' je le btn envoiPanierFormulaire ')
//  console.log(envoiPanierFormulaire)

