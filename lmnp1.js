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
  let ProvisionsChargesCopropriété = Number(document.querySelector("#A15").value);
  let IntérêtsEtFraisEmprunt = Number(document.querySelector("#A16").value);
  let DéductionsSpécifiques = Number(document.querySelector("#A17").value);
  
var coche = function(){
    let selectAsc = document.getElementById("A18").value;
  }
console.log(coche);

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

 /* prorata dernière année*/

  var dateFin = moment(dateBegin).add(5,"year");
  console.log(dateFin.get("year"));;
  
  year = (new Date(dateFin)).getFullYear();
  startDateOfTheYear = moment([year]);
    
  console.log(startDateOfTheYear.format("DD/MM/YYYY"));
    
  var durationEnd = moment.duration(dateFin.diff(startDateOfTheYear));
  console.log(durationEnd);
  var days2 = durationEnd.asDays();
  console.log(Math.round(days2));
  var DaysYear = 365;

  /* charges externes*/

  const TabCharExt = [];
  var sommeCharge=0;
  
  for (var i = 0; i < 51; i++) { TabCharExt.push([ Number(dateBegin.format("YYYY")), FraisAministration , FraiLocal, IndemnitésEviction, DépensesTravaux, ChargesLocatives, PrimesAssurances, ProvisionsChargesCopropriété, IntérêtsEtFraisEmprunt, DéductionsSpécifiques,sommeCharge ]); }
  
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
  for (var i = 0; i < 51; i++) { TabImpo.push([ Number(dateBegin.format("YYYY")), Impots ]); }
  
   for (var i = 1; i < TabImpo.length; i++) { TabImpo[i][0] = TabImpo[0][0]+i; }
  
  console.table(TabImpo);



  /*amortissement du mobilier*/

  var annuiteMobilier = ValeurMobilier * txAmortMobilier;
  var AnnuiteMobProra = Math.round((annuiteMobilier * days) / DaysYear);
  var AnnMobProrLastYear =Math.round((annuiteMobilier * days2) / DaysYear);
  var VNC1 = ValeurMobilier - AnnuiteMobProra;
  var VNC = VNC1 - annuiteMobilier;
  var VNCLast = ValeurMobilier-AnnMobProrLastYear;

  console.log(AnnMobProrLastYear);
  console.log(VNCLast);
  
  function coche(){
    if(document.getElementById("#A18").checked) {
        annuiteAscenseur
    }
    else{
     annuiteAscenseur=0
  }};

  console.log(coche);

  const tableauAmorMobilier = [
    [Number(dateBegin.format("YYYY")), AnnuiteMobProra, VNC1]
  ];
  for (var i = 1; i < 10; i++) { tableauAmorMobilier.push([ Number(dateBegin.format("YYYY")), annuiteMobilier, VNC ]); }
  for (var i= 11; i==11;i++){tableauAmorMobilier.push([dateFin,AnnMobProrLastYear, VNCLast])}
 
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
  var AnnFraisLastYear =Math.round((annuiteFrais * days2) / DaysYear);
  var VNC1F = FraisEtablissement - AnnuiteFraisProra;
  var VNC2 = 0
  var VNCLast2 = FraisEtablissement-AnnFraisLastYear;
  
  const tableauAmorFrais = [
    /*[0,0,FraisEtablissement],*/
    [Number(dateBegin.format("YYYY")), AnnuiteFraisProra, VNC1F],
  ];
     for (var i = 1; i < 5; i++) {tableauAmorFrais.push([ Number(dateBegin.format("YYYY")), annuiteFrais, VNC2]); }
     for (var i= 6; i==6;i++){tableauAmorFrais.push([dateFin,AnnFraisLastYear, VNCLast2])}
     
     for (var i = 0; i < tableauAmorFrais.length; i++) { tableauAmorFrais[i][0] = tableauAmorFrais[0][0]+i; }
      
    tableauAmorFrais[0][2] = FraisEtablissement - tableauAmorFrais[0][1];
    for (var i = 1; i < tableauAmorFrais.length; i++) {
        tableauAmorFrais[i][2] = tableauAmorFrais[i-1][2] - tableauAmorFrais[i][1];
        }
    console.table(tableauAmorFrais); 
    
    
  var annuiteAscenseur = Math.round(partH * txamortAscenseur);
  
  let annuiteStructure = Math.round(partA * txamortStructure);

  let annuiteMenuiserie = Math.round(partB * txamortMenuiseries);

  let annuiteChauffage = Math.round (partC * txamortChauffage);

  let annuiteEtancheite = Math.round(partD * txamortEtancheite);

  let annuiteRavalement = Math.round(partE * txamortRavalement);

  let annuiteElectricite = Math.round(partF * txamortElectricite);

  let annuitePlomberie = Math.round(partG * txamortPlomberie);

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
  
  var annStrucProrLastYear =Math.round((annuiteStructure * days2) / DaysYear);
  var annChauProLastYear =Math.round((annuiteChauffage * days2) / DaysYear);
  var annElecProLastYear =Math.round((annuiteElectricite * days2) / DaysYear);
  var annEtanProrLastYear =Math.round((annuiteEtancheite * days2) / DaysYear);
  var annPlomProrLastYear =Math.round((annuitePlomberie * days2) / DaysYear);
  var annMenProrLastYear =Math.round((annuiteMenuiserie * days2) / DaysYear);
  var annRavProrLastYear =Math.round((annuiteRavalement * days2) / DaysYear);
  var annAscProrLastYear =Math.round((annuiteAscenseur* days2) / DaysYear);

  var yes = document.querySelector('input[value="oui"]');
  console.log(yes.onchange);


  const tabAmorImmo = [
        [
    Number(dateBegin.format("YYYY")),
    annStrucProra,
    annChaufProra,
    annElecProra,
    annPlomProra,
    annMenuiProra,
    annEtanProra,
    annRavalPropra,
    annAscProra,
    /*sumannuite,
    VNC,*/
  ]];
  for (var i = 1; i <= 49; i++) { tabAmorImmo.push([ Number(dateBegin.format("YYYY")),
annuiteStructure,
annuiteChauffage,
annuiteElectricite,
annuitePlomberie,
annuiteMenuiserie,
annuiteEtancheite,
annuiteRavalement,
annuiteAscenseur,
/*sumannuite,
VNC*/
]);

}
  for (var i= 50; i==50;i++){tabAmorImmo.push([dateFin,annStrucProrLastYear,annChauProLastYear,annElecProLastYear,annPlomProrLastYear,annMenProrLastYear,annEtanProrLastYear,annRavProrLastYear,annAscProrLastYear])}
  for (var i = 0; i < tabAmorImmo.length; i++) { tabAmorImmo[i][0] = tabAmorImmo[0][0]+i; 
}

for (var i =0;i<tabAmorImmo.length;i++){
  if(i>=16){
for (var j =1 ;j<8; j++) {
    tabAmorImmo[i].splice(6,1,0);
    tabAmorImmo[i].splice(7,1,0);
    tabAmorImmo[i].splice(8,1,0);
  if(i>=26){
    for (var j =1 ;j<8; j++) {
      tabAmorImmo[i].splice(2,1,0);
      tabAmorImmo[i].splice(3,1,0);
      tabAmorImmo[i].splice(4,1,0);
      tabAmorImmo[i].splice(5,1,0);
  }}}}}

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

/*Déclaration 2033A*/

var ImmoCorpoBrut = tabAmorImmo[0][10]+tableauAmorMobilier[0][2];
var ImmoCorpoAmor= tabAmorImmo[0][9]+tableauAmorMobilier[0][1];
var ImmoCorpNetex = ImmoCorpoBrut-ImmoCorpoAmor;
var ImmoIncorBrut = tableauAmorFrais[0][2];
var ImmoIncorpAmor= tableauAmorFrais[0][1];
var ImIncNetex = ImmoIncorBrut-ImmoIncorpAmor;


Tab2033A=[ImmoCorpoBrut,ImmoCorpoAmor,ImmoCorpNetex,ImmoIncorBrut,ImmoIncorpAmor,ImIncNetex,MontantEmprunt,montantAnnuelLoyer]

console.table("2033A:",Tab2033A);

/*Déclaration 2033B

var Serv = montantAnnuelLoyer;
var CharExt = TabCharExt;
var ImpTaxes=TabImpo;
var DotAmor=
var DefiAntRepo

Tab2033B =[Prod,CharExt,Imp,DotAmor,DefiAntRepo]*/

/*Déclaration 2033C*/

var Autres
var DimiImmoCorpo
var Construction
var AutreImmoCorp
var DimiConst
var DimiAutrImmo
var AutresFinex
var ConstrucFinex
var AutreImmoCorpoFinex

Tab2033C=[Autres,DimiImmoCorpo,Construction,AutreImmoCorp,DimiConst,DimiAutrImmo, AutresFinex,ConstrucFinex,AutreImmoCorpoFinex]




  console.log("annuité mobilier:" + annuiteMobilier);
  console.log("annuite frais :" + annuiteFrais);
  console.log("Annuité immobilier:" + annuiteImmobilier);

  document.getElementById("annuiteImmobilier").innerHTML = annuiteImmobilier;
  document.getElementById("annuiteFrais").innerHTML = annuiteFrais;
  document.getElementById("annuiteMobilier").innerHTML = annuiteMobilier;
};
