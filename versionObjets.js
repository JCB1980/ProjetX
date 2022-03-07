let calcul = function () {
  let valeurDuBien = Number((document.querySelector("#A1").value = 240000));
  let valeurMobilier = Number((document.querySelector("#A6").value = 9000));
  let honorairesAgence = Number((document.querySelector("#A3").value = 5000));
  let fraisNotaire = Number((document.querySelector("#A4").value = 5000));
  let fraisBancaire = Number((document.querySelector("#A5").value = 500));
  let montantAnnuelLoyer = Number((document.querySelector("#A2").value = 9000));
  let montantEmprunt = Number((document.querySelector("#A7").value = 1000));
  let fraisAministration = Number((document.querySelector("#A8").value = 500));
  let fraisLocal = 20;
  let indemnitesEviction = Number((document.querySelector("#A10").value = 600));
  let depensesTravaux = Number((document.querySelector("#A11").value = 900));
  let chargesLocatives = Number((document.querySelector("#A12").value = 900));
  let impots = Number((document.querySelector("#A13").value = 750));
  let primesAssurances = Number((document.querySelector("#A14").value = 987));
  let provisionsChargesCopropriete = Number(
    (document.querySelector("#A15").value = 566)
  );
  let interetsEtFraisEmprunt = Number(
    (document.querySelector("#A16").value = 2000)
  );
  let deductionsSpecifiques = Number(
    (document.querySelector("#A17").value = 700)
  );
  const TX_AMORT_MOBILIER = 0.1;
  const TX_AMOR_FRAIS = 0.2;

  /* calcul du prorata*/

  var date = document.getElementById("start_date").value;
  var dateBegin = moment(date);
  console.log("Date de début d'activité", dateBegin.format("DD/MM/YYYY"));

  var dateEnd = moment().endOf("year");
  console.log("Date de fin d'activité", dateEnd.format("DD/MM/YYYY"));

  var duration = moment.duration(dateEnd.diff(dateBegin));
  var days = duration.asDays();
  console.log(Math.round(days));
  var daysYear = 365;

  /* prorata dernière année*/

  var dateFin = moment(dateBegin).add(5, "year");
  console.log(dateFin.get("year"));

  year = new Date(dateFin).getFullYear();
  startDateOfTheYear = moment([year]);

  console.log(startDateOfTheYear.format("DD/MM/YYYY"));

  var durationEnd = moment.duration(dateFin.diff(startDateOfTheYear));
  console.log(durationEnd);
  var days2 = durationEnd.asDays();
  console.log(Math.round(days2));
  var daysYear = 365;

  /* charges externes*/

  const CH_EXT = {
    administratio: fraisAministration,
    local: fraisLocal,
    eviction: indemnitesEviction,
    travaux: depensesTravaux,
    charges: chargesLocatives,
    assurances: primesAssurances,
    provision: provisionsChargesCopropriete,
    interets: interetsEtFraisEmprunt,
    deduc: deductionsSpecifiques,
    taxes: impots,
  };

  var sommeChExternes = 0;
  for (var valeurs in CH_EXT) {
    sommeChExternes = sommeChExternes + CH_EXT[valeurs];
  }
  console.log(CH_EXT);
  console.log(sommeChExternes);

  /*amortissement du mobilier*/

  var annuiteMobilier = valeurMobilier * TX_AMORT_MOBILIER;
  var annuiteMobProra = Math.round((annuiteMobilier * days) / daysYear);
  var annMobProrLastYear = Math.round((annuiteMobilier * days2) / daysYear);
  var vnc1 = valeurMobilier - annuiteMobProra;
  var vnc = vnc1 - annuiteMobilier;
  var vncLast = valeurMobilier - annMobProrLastYear;

  tabAmortissementMob = [];
  tabAmortissementMob.push({
    annee: Number(dateBegin.format("YYYY")),
    annuiteMobilier: annuiteMobProra,
    vnc: vnc1,
    valeurBrute: valeurMobilier,
  });
  for (var i = 1; i < 10; i++) {
    tabAmortissementMob.push({
      annee: Number(dateBegin.format("YYYY")) + i, // On peut initialiser la bonne année directement
      annuiteMobilier: annuiteMobilier,
      vnc: vnc,
    });
  }
  tabAmortissementMob.push({
    annee: Number(dateFin.format("YYYY")) + 5,
    annuiteMobilier: annMobProrLastYear,
    vnc: vncLast,
  });

  tabAmortissementMob[1].vnc =
    valeurMobilier - tabAmortissementMob[1].annuiteMobilier; // C'est là qu'on commence à bien voir l'interet de nommer plutot qu'indicer

  for (var i = 1; i < tabAmortissementMob.length; i++) {
    tabAmortissementMob[i].vnc =
      tabAmortissementMob[i - 1].vnc - tabAmortissementMob[i].annuiteMobilier;
  }

  console.log(tabAmortissementMob);

  /*Frais d'établissement*/

  var fraisEtablissement =
    Number(fraisNotaire) + Number(fraisBancaire) + Number(honorairesAgence);
  var annuiteFrais =
    (Number(fraisNotaire) + Number(fraisBancaire) + Number(honorairesAgence)) *
    TX_AMOR_FRAIS;
  var annuiteFraisProra = Math.round((annuiteFrais * days) / daysYear);
  var annFraisLastYear = Math.round((annuiteFrais * days2) / daysYear);
  var vnc1f = fraisEtablissement - annuiteFraisProra;
  var vnc2 = vnc1f - annuiteFrais;
  var vncLast2 = fraisEtablissement - annFraisLastYear;

  const tabAmorFrais = [];
  tabAmorFrais.push({
    annee: Number(dateBegin.format("YYYY")),
    annuiteFrais: annuiteFraisProra,
    vnc: vnc1f,
    valeurBrute: fraisEtablissement,
  });

  for (var i = 1; i < 5; i++) {
    tabAmorFrais.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteFrais: annuiteFrais,
      vnc: vnc2,
    });
  }
  tabAmorFrais.push({
    annee: Number(dateFin.format("YYYY")),
    annuiteFrais: annFraisLastYear,
    vnc: vncLast2,
  });

  tabAmorFrais[1].vnc = fraisEtablissement - tabAmorFrais[1].annuiteFrais;

  for (var i = 1; i < tabAmorFrais.length; i++) {
    tabAmorFrais[i].vnc =
      tabAmorFrais[i - 1].vnc - tabAmorFrais[i].annuiteFrais;
  }
  console.log(tabAmorFrais);

  /*Amortissement immobilier*/

  const TX_AMOR_GROS_OEUVRE = 0.02;
  const TX_AMOR_FACADE = 0.0333;
  const TX_AMOR_EQUIPEMENT = 0.05;
  const TX_AMOR_AGENCEMENT = 0.0667;

  const TX_REP_GROS_OEUVRE = 0.4;
  const TX_REP_FACADE = 0.2;
  const TX_REP_EQUIPEMENT = 0.2;
  const TX_REP_AGENCEMENT = 0.2;

  let partA = valeurDuBien * TX_REP_GROS_OEUVRE;
  let partB = valeurDuBien * TX_REP_FACADE;
  let partC = valeurDuBien * TX_REP_EQUIPEMENT;
  let partD = valeurDuBien * TX_REP_AGENCEMENT;

  console.log(partA, partB, partC, partD);

  var annuiteGrosOeuvre = Math.round(partA * TX_AMOR_GROS_OEUVRE);
  var annuiteFacade = Math.round(partB * TX_AMOR_FACADE);
  var annuiteEquipement = Math.round(partC * TX_AMOR_EQUIPEMENT);
  var annuiteAgencement = Math.round(partD * TX_AMOR_AGENCEMENT);

  var annuitePeriode2 =
    annuiteGrosOeuvre + annuiteFacade + annuiteEquipement + annuiteAgencement;

  var annuitePeriode3 = annuiteGrosOeuvre + annuiteFacade + annuiteEquipement;

  var annuitePeriode4 = annuiteGrosOeuvre + annuiteFacade;

  var annuitePeriode5 = annuiteGrosOeuvre;

  var annGrosProra = Math.round((annuiteGrosOeuvre * days) / daysYear);
  var annFacadeProra = Math.round((annuiteFacade * days) / daysYear);
  var annEquiProra = Math.round((annuiteEquipement * days) / daysYear);
  var annAgenProra = Math.round((annuiteAgencement * days) / daysYear);

  var sommeAnnuiteProra =
    annGrosProra + annFacadeProra + annEquiProra + annAgenProra;

  var annStrucProrLastYear = Math.round((annuiteGrosOeuvre * days2) / daysYear);

  var sommeAnnProraLastYear = annStrucProrLastYear;

  const tabAmorImmo = [];
  tabAmorImmo.push({
    annee: Number(dateBegin.format("YYYY")),
    annuiteGrosPro: annGrosProra,
    annuiteFacadePro: annFacadeProra,
    annuiteEquipPro: annEquiProra,
    annuiteAgenPro: annAgenProra,
    sommeAnnProra: sommeAnnuiteProra,
    valeurBrute: valeurDuBien,
    vncPer1: 0,
  });
  for (var i = 1; i < 15; i++) {
    tabAmorImmo.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteGros: annuiteGrosOeuvre,
      annuiteFac: annuiteFacade,
      annuiteEquip: annuiteEquipement,
      annuiteAgen: annuiteAgencement,
      sommePer2: annuitePeriode2,
      vncPer2: 0,
    });
  }
  for (var i = 15; i < 20; i++) {
    tabAmorImmo.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteGros: annuiteGrosOeuvre,
      annuiteFac: annuiteFacade,
      annuiteEquip: annuiteEquipement,
      sommePer3: annuitePeriode3,
      vncPer3: 0,
    });
  }
  for (var i = 20; i < 30; i++) {
    tabAmorImmo.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteGros: annuiteGrosOeuvre,
      annuiteFac: annuiteFacade,
      sommePer4: annuitePeriode4,
      vncPer4: 0,
    });
  }

  for (var i = 30; i < 50; i++) {
    tabAmorImmo.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteGros: annuiteGrosOeuvre,
      sommePer5: annuitePeriode5,
      vncPer5: 0,
    });
  }

  tabAmorImmo.push({
    annee: Number(dateFin.format("YYYY")) + 45,
    annuiteStrucLY: annStrucProrLastYear,
    vncLastYear: 0,
    sommeLast: annStrucProrLastYear,
  });

  tabAmorImmo[0].vncPer1 = valeurDuBien - tabAmorImmo[0].sommeAnnProra;

  tabAmorImmo[1].vncPer2 = tabAmorImmo[0].vncPer1 - tabAmorImmo[1].sommePer2;

  for (var i = 2; i < 15; i++) {
    tabAmorImmo[i].vncPer2 =
      tabAmorImmo[i - 1].vncPer2 - tabAmorImmo[i].sommePer2;
  }

  tabAmorImmo[15].vncPer3 = tabAmorImmo[14].vncPer2 - tabAmorImmo[15].sommePer3;

  for (var i = 16; i < 20; i++) {
    tabAmorImmo[i].vncPer3 =
      tabAmorImmo[i - 1].vncPer3 - tabAmorImmo[i].sommePer3;
  }

  tabAmorImmo[20].vncPer4 = tabAmorImmo[19].vncPer3 - tabAmorImmo[20].sommePer4;

  for (var i = 21; i < 30; i++) {
    tabAmorImmo[i].vncPer4 =
      tabAmorImmo[i - 1].vncPer4 - tabAmorImmo[i].sommePer4;
  }

  tabAmorImmo[30].vncPer5 = tabAmorImmo[29].vncPer4 - tabAmorImmo[30].sommePer5;
  for (var i = 31; i < 50; i++) {
    tabAmorImmo[i].vncPer5 =
      tabAmorImmo[i - 1].vncPer5 - tabAmorImmo[i].sommePer5;
  }

  console.table(tabAmorImmo);
  console.log(tabAmorImmo);
};

/*Tâches :
  Coder une Fonction déclaration qui va récupérer les données de la fonction calcul 
  Donner la possibilité à l'utilisateur de sélectionner l'année de déclaration
*/

/*Déclaration 2033A*/

var immoCorBrut =
  tabAmorImmo[0].valeurBrute + tabAmortissementMob[0].valeurBrute;
console.log(immoCorBrut);
/*var immoCorpoAmor = TAB_AMOR_IMMO[0][9] + TAB_AMORT_MOBILIER[0][1];
  var immoCorpNetex = immoCorpoBrut - immoCorpoAmor;
  var immoIncorBrut = TAB_AMOR_FRAIS[0][2];
  var immoIncorpAmor = TAB_AMOR_FRAIS[0][1];
  var imIncNetex = immoIncorBrut - immoIncorpAmor;*/

Decl2033A = [];
Decl2033A.push({
  immoCorpoBrut: immoCorBrut,
  /*immoCorpoAmor: tabAmorimmo[0].sommeAnnProra,
  immoCorpNetex: tabAmorImmo[0].vncPer1,*/
});

console.log(Decl2033A);

/*immoIncorBrut:
    immoIncorpAmor:
    imIncNetex:
    Emprunt: montantEmprunt,
    montantAnnuelLoyer:
    )}*/

console.table("2033A:", Tab2033A);

/*Déclaration 2033B

var Serv = montantAnnuelLoyer;
var CharExt = TabCharExt;
var ImpTaxes=TabImpo;
var DotAmor=
var DefiAntRepo

Tab2033B =[Prod,CharExt,Imp,DotAmor,DefiAntRepo]

/*Déclaration 2033C

  var Autres;
  var DimiImmoCorpo;
  var Construction;
  var AutreImmoCorp;
  var DimiConst;
  var DimiAutrImmo;
  var AutresFinex;
  var ConstrucFinex;
  var AutreImmoCorpoFinex;

  Tab2033C = [
    Autres,
    DimiImmoCorpo,
    Construction,
    AutreImmoCorp,
    DimiConst,
    DimiAutrImmo,
    AutresFinex,
    ConstrucFinex,
    AutreImmoCorpoFinex,
  ];*/
