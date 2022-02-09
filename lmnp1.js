let amortissement = function () {
  let valeurDuBien = document.querySelector("#A1").value;
  let montantAnnuelLoyer = Number(document.querySelector("#A2").value);
  let HonorairesAgence = document.querySelector("#A3").value;
  let FraisNotaire = document.querySelector("#A4").value;
  let FraisBancaire = document.querySelector("#A5").value;
  let ValeurMobilier = document.querySelector("#A6").value;
  let MontantEmprunt = Number(document.querySelector("#A7").value);
  let FraisAministration = Number(document.querySelector("#A8").value);
  let FraiLocal = 20; 
  let IndemnitésEviction = Number(document.querySelector("#A10").value);
  let DépensesTravaux = Number(document.querySelector("#A11").value);
  let ChargesLocatives = Number(document.querySelector("#A12").value);
  let Impots = Number(document.querySelector("#A13").value);
  let PrimesAssurances = Number(document.querySelector("#A14").value);
  let ProvisionsChargesCopropriété = Number(
    document.querySelector("#A15").value
  );
  let IntérêtsEtFraisEmprunt = Number(document.querySelector("#A16").value);
  let DéductionsSpécifiques = Number(document.querySelector("#A17").value);

  const txAmortMobilier = 0.1;
  const txamortFrais = 0.2;
  const txamortStructure = 0.02;
  const txamortMenuiseries = 0.04;
  const txamortChauffage = 0.04;
  const txamortEtancheite = 0.07;
  const txamortRavalement = 0.07;
  const txamortElectricite = 0.04;
  const txamortPlomberie = 0.04;
  const txamortAscenseur = 0.04;

  const dureeAmortMobilier = 11;
  const dureeAmortFrais = 6;
  const dureeAmortStructure = 51;
  const dureeAmortMenuiserie = 26;
  const dureeAmortChauffage = 26;
  const dureeAmortEtancheite = 16;
  const dureeAmortRavalement = 16;
  const dureeAmortElect = 26;
  const dureeAmortPlomberie = 26;
  const dureeAmortAscenseur = 15;

  const TxRepartitionStructOuvrage = 0.824;
  const TxRepartitionMenuiseries = 0.034;
  const TxRepartitionChauffage = 0.032;
  const TxRepartitionEtancheite = 0.01;
  const TxRepartitionRavalement = 0.021;
  const TxRepartitionElectricite = 0.042;
  const TxRepartitionPlomberie = 0.037;
  const TxRepartitionAscenseur = 0.028;

  let partA = valeurDuBien * TxRepartitionStructOuvrage;
  let partB = valeurDuBien * TxRepartitionMenuiseries;
  let partC = valeurDuBien * TxRepartitionChauffage;
  let partD = valeurDuBien * TxRepartitionEtancheite;
  let partE = valeurDuBien * TxRepartitionRavalement;
  let partF = valeurDuBien * TxRepartitionElectricite;
  let partG = valeurDuBien * TxRepartitionPlomberie;
  let partH = valeurDuBien * TxRepartitionAscenseur;

  /* calcul du prorata*/

  var date = document.getElementById("start_date").value;
  var dateBegin = moment(date);
  console.log(dateBegin.format("DD/MM/YYYY"));

  var dateEnd = moment().endOf("year");
  console.log(dateEnd.format("DD/MM/YYYY"));

  var duration = moment.duration(dateEnd.diff(dateBegin));
  var days = duration.asDays();
  console.log(Math.round(days));
  var DaysYear = 365;

  var datefin = moment(dateBegin).add(5,"year").calendar();
  console.log(datefin);

  /* charges externes*/

  const TabCharExt = [];
  var sommeCharge=0;
  
  for (var i = 0; i < 50; i++) { TabCharExt.push([ Number(dateBegin.format("YYYY")), montantAnnuelLoyer, MontantEmprunt, FraisAministration , FraiLocal, IndemnitésEviction, DépensesTravaux, ChargesLocatives, PrimesAssurances, ProvisionsChargesCopropriété, IntérêtsEtFraisEmprunt, DéductionsSpécifiques,sommeCharge ]); }
  
  for (var i = 1; i < TabCharExt.length; i++) { TabCharExt[i][0] = TabCharExt[0][0]+i; }
  
  for (var i = 0; i < TabCharExt.length; i++) {
    var somme = 0;
    var uneAnnee = TabCharExt[i];
    for (var j =1 ;j<=11; j++) { 
      somme += uneAnnee[j];
   }
   uneAnnee[12]=somme
  }

  
    console.table(TabCharExt);

  /*Charges Impôts*/

  const TabImpo = [];
  for (var i = 0; i < 50; i++) { TabImpo.push([ Number(dateBegin.format("YYYY")), Impots ]); }
  
   for (var i = 1; i < TabImpo.length; i++) { TabImpo[i][0] = TabImpo[0][0]+i; }
  
  console.table(TabImpo);



  /*amortissement du mobilier*/

  var annuiteMobilier = ValeurMobilier * txAmortMobilier;
  var AnnuiteMobProra = Math.round((annuiteMobilier * days) / DaysYear);
  var VNC1 = ValeurMobilier - AnnuiteMobProra;
  var VNC = VNC1 - annuiteMobilier;
  
  /* boucle push*/

  const tableauAmorMobilier = [
    [Number(dateBegin.format("YYYY")), AnnuiteMobProra, VNC1]
  ];
  for (var i = 1; i < 10; i++) { tableauAmorMobilier.push([ Number(dateBegin.format("YYYY")), annuiteMobilier, VNC ]); }
  
  /* boucle temporel*/
  for (var i = 0; i < tableauAmorMobilier.length; i++) { tableauAmorMobilier[i][0] = tableauAmorMobilier[0][0]+i; }
  
  tableauAmorMobilier[0][2] = ValeurMobilier - tableauAmorMobilier[0][1];
  
  for (var i = 1; i < tableauAmorMobilier.length; i++) {
    tableauAmorMobilier[i][2] = tableauAmorMobilier[i-1][2] - tableauAmorMobilier[i][1];
  }
    console.table(tableauAmorMobilier);

  /* Amortissement frais*/
  var FraisEtablissement = Number(FraisNotaire) + Number(FraisBancaire) + Number(HonorairesAgence)
  var annuiteFrais =
    (Number(FraisNotaire) + Number(FraisBancaire) + Number(HonorairesAgence)) *
    txamortFrais;
  var AnnuiteFraisProra = Math.round((annuiteFrais * days) / DaysYear);
  var VNC1F = FraisEtablissement - AnnuiteFraisProra;
  var VNC2 = 0
  
  const tableauAmorFrais = [
    [Number(dateBegin.format("YYYY")), AnnuiteFraisProra, VNC1F],
  ];
     for (var i = 1; i < 5; i++) {tableauAmorFrais.push([ Number(dateBegin.format("YYYY")), annuiteFrais, VNC2]); }
  
     for (var i = 0; i < tableauAmorFrais.length; i++) { tableauAmorFrais[i][0] = tableauAmorFrais[0][0]+i; }
      
    tableauAmorFrais[0][2] = FraisEtablissement - tableauAmorFrais[0][1];
    for (var i = 1; i < tableauAmorFrais.length; i++) {
        tableauAmorFrais[i][2] = tableauAmorFrais[i-1][2] - tableauAmorFrais[i][1];
        }
    console.table(tableauAmorFrais); 
    
    
  var annuiteAscenseur = partH * txamortAscenseur;
  var yes = document.querySelector('input[value="oui"]');
  console.log(yes);
  yes.onchange = function () {
    if (yes.checked) {
      annuiteAscenseur;
    } else {
      annuiteAscenseur = 0;
    }
  };
  console.log(yes.onchange);
  let annuiteStructure = partA * txamortStructure;

  let annuiteMenuiserie = partB * txamortMenuiseries;

  let annuiteChauffage = partC * txamortChauffage;

  let annuiteEtancheite = partD * txamortEtancheite;

  let annuiteRavalement = partE * txamortRavalement;

  let annuiteElectricite = partF * txamortElectricite;

  let annuitePlomberie = partG * txamortPlomberie;

  var annuiteImmobilier =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var annStrucProra = Math.round((annuiteStructure * days) / DaysYear);
  var annChaufProra = Math.round((annuiteChauffage * days) / DaysYear);
  var annElecProra = Math.round((annuiteElectricite * days) / DaysYear);
  var annEtanProra = Math.round((annuiteEtancheite * days) / DaysYear);
  var annPlomProra = Math.round((annuitePlomberie * days) / DaysYear);
  var annMenuiProra = Math.round((annuiteMenuiserie * days) / DaysYear);
  var annRavalPropra = Math.round((annuiteRavalement * days) / DaysYear);
  var annAscProra = Math.round((annuiteAscenseur * days) / DaysYear);
  
 
  var VNC = valeurDuBien
  sumannuite=0

  const tabAmorImmo = [[
    Number(dateBegin.format("YYYY")),
    annStrucProra,
    annChaufProra,
    annElecProra,
    annEtanProra,
    annPlomProra,
    annMenuiProra,
    annRavalPropra,
    annAscProra,
    sumannuite,
    VNC,
  ]];
  for (var i = 1; i < 50; i++) { tabAmorImmo.push([ Number(dateBegin.format("YYYY")),
annuiteStructure,
annuiteChauffage,
annuiteElectricite,
annuitePlomberie,
annuiteMenuiserie,
annuiteEtancheite,
annuiteRavalement,
annuiteAscenseur,
sumannuite,
VNC
]);
}
   
  for (var i = 0; i < tabAmorImmo.length; i++) { tabAmorImmo[i][0] = tabAmorImmo[0][0]+i; 
}

  for (var i = 0; i < tabAmorImmo.length; i++) {
    var somme = 0;
    var uneAnnee = tabAmorImmo[i];
    for (var j =1 ;j<=8; j++) { 
      somme += uneAnnee[j];
   }
   uneAnnee[9]=somme
}

tabAmorImmo[0][10] = valeurDuBien - tabAmorImmo[0][9];
for (var i = 1; i < tabAmorImmo.length; i++) {
  tabAmorImmo[i][10] = tabAmorImmo[i-1][10] - tabAmorImmo[i][9];
}

console.table(tabAmorImmo);

  console.log("annuité mobilier:" + annuiteMobilier);
  console.log("annuite frais :" + annuiteFrais);
  console.log("Annuité immobilier:" + annuiteImmobilier);

  document.getElementById("annuiteImmobilier").innerHTML = annuiteImmobilier;
  document.getElementById("annuiteFrais").innerHTML = annuiteFrais;
  document.getElementById("annuiteMobilier").innerHTML = annuiteMobilier;
};
