let amortissement = function () {
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
  const TX_AMORT_STRUCTURE = 0.02;
  const TX_AMORT_MENUISERIES = 0.04;
  const TX_AMORT_CHAUFFAGE = 0.04;
  const TX_AMORT_ETANCHEITE = 0.07;
  const TX_AMORT_RAVAL = 0.07;
  const TX_AMORT_ELEC = 0.04;
  const TX_AMORT_PLOMB = 0.04;
  const TX_AMORT_ASCEN = 0.04;

  const DUREE_AMORT_MOBILIER = 11;
  const DUREE_AMORT_FRAIS = 6;
  const DUREE_AMORT_STRUC = 51;
  const DUREE_AMORT_MENUI = 26;
  const DUREE_AMORT_CHAUFF = 26;
  const DUREE_AMORT_ETANCH = 16;
  const DUREE_AMORT_RAVAL = 16;
  const DUREE_AMORT_ELEC = 26;
  const DUREE_AMORT_PLOMB = 26;
  const DUREE_AMORT_ASC = 15;

  const TX_REP_STRUCT = 0.824;
  const TX_REP_MENUI = 0.034;
  const TX_REP_CHAUFF = 0.032;
  const TX_REP_ETAN = 0.01;
  const TX_REP_RAVAL = 0.021;
  const TX_REP_ELECT = 0.042;
  const TX_REP_PLOM = 0.037;
  const TX_REP_ASCE = 0.028;

  let partA = valeurDuBien * TX_REP_STRUCT;
  let partB = valeurDuBien * TX_REP_MENUI;
  let partC = valeurDuBien * TX_REP_CHAUFF;
  let partD = valeurDuBien * TX_REP_ETAN;
  let partE = valeurDuBien * TX_REP_RAVAL;
  let partF = valeurDuBien * TX_AMORT_ELEC;
  let partG = valeurDuBien * TX_AMORT_PLOMB;
  let partH = valeurDuBien * TX_REP_ASCE;

  /* calcul du prorata*/

  var date = document.getElementById("start_date").value;
  var dateBegin = moment(date);
  console.log("Date de début d'activité", dateBegin.format("DD/MM/YYYY"));

  var dateEnd = moment().endOf("year");
  console.log("Date e fin d'activité", dateEnd.format("DD/MM/YYYY"));

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
  });
  for (var i = 1; i < 10; i++) {
    tabAmortissementMob.push({
      annee: Number(dateBegin.format("YYYY")) + i, // On peut initialiser la bonne année directement
      annuiteMobilier: annuiteMobilier,
      vnc: vnc,
    });
  }
  tabAmortissementMob.push({
    annee: dateFin,
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
  });

  for (var i = 1; i < 5; i++) {
    tabAmorFrais.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteFrais: annuiteFrais,
      vnc: vnc2,
    });
  }
  tabAmorFrais.push({
    annee: dateFin,
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

  var annuiteAscenseur = document.getElementById("A18").checked
    ? Math.round(partH * TX_AMORT_ASCEN)
    : 0;

  var annuiteStructure = Math.round(partA * TX_AMORT_STRUCTURE);

  var annuiteMenuiserie = Math.round(partB * TX_AMORT_MENUISERIES);

  var annuiteChauffage = Math.round(partC * TX_AMORT_CHAUFFAGE);

  var annuiteEtancheite = Math.round(partD * TX_AMORT_ETANCHEITE);

  var annuiteRavalement = Math.round(partE * TX_AMORT_RAVAL);

  var annuiteElectricite = Math.round(partF * TX_AMORT_ELEC);

  var annuitePlomberie = Math.round(partG * TX_AMORT_PLOMB);

  var annuiteImmobilier =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var annStrucProra = Math.round((annuiteStructure * days) / daysYear);
  var annChaufProra = Math.round((annuiteChauffage * days) / daysYear);
  var annElecProra = Math.round((annuiteElectricite * days) / daysYear);
  var annEtanProra = Math.round((annuiteEtancheite * days) / daysYear);
  var annPlomProra = Math.round((annuitePlomberie * days) / daysYear);
  var annMenuiProra = Math.round((annuiteMenuiserie * days) / daysYear);
  var annRavalPropra = Math.round((annuiteRavalement * days) / daysYear);
  var annAscProra = Math.round((annuiteAscenseur * days) / daysYear);
  var sommeAnnuiteProra =
    annStrucProra +
    annChaufProra +
    annElecProra +
    annEtanProra +
    annPlomProra +
    annMenuiProra +
    annRavalPropra +
    annAscProra;

  var annStrucProrLastYear = Math.round((annuiteStructure * days2) / daysYear);
  var annChauProLastYear = Math.round((annuiteChauffage * days2) / daysYear);
  var annElecProLastYear = Math.round((annuiteElectricite * days2) / daysYear);
  var annEtanProrLastYear = Math.round((annuiteEtancheite * days2) / daysYear);
  var annPlomProrLastYear = Math.round((annuitePlomberie * days2) / daysYear);
  var annMenProrLastYear = Math.round((annuiteMenuiserie * days2) / daysYear);
  var annRavProrLastYear = Math.round((annuiteRavalement * days2) / daysYear);
  var annAscProrLastYear = Math.round((annuiteAscenseur * days2) / daysYear);
  var sommeAnnProraLastYear =
    annStrucProrLastYear +
    annChauProLastYear +
    annElecProLastYear +
    annEtanProrLastYear +
    annPlomProrLastYear +
    annMenProrLastYear +
    annRavProrLastYear +
    annAscProrLastYear;

  var vncAnne1 = valeurDuBien - sommeAnnuiteProra;
  var vncImmo = vncAnne1 - annuiteImmobilier;
  var vncLast = valeurDuBien - sommeAnnProraLastYear;

  const tabAmorImmo = [];
  tabAmorImmo.push({
    annee: Number(dateBegin.format("YYYY")),
    annuiteStPro: annStrucProra,
    annuiteChauPro: annChaufProra,
    annuiteElecPro: annElecProra,
    annuitePloPro: annPlomProra,
    annuiteMenPro: annMenuiProra,
    annuiteEtaPro: annEtanProra,
    annuiteRavPr: annRavalPropra,
    annuiteAscPro: annAscProra,
    vncAnnee1Immo: vncAnne1,
  });

  for (var i = 1; i < 50; i++) {
    tabAmorImmo.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteStruct: annuiteStructure,
      annuiteChauf: annuiteChauffage,
      annuiteElec: annuiteElectricite,
      annuitePlom: annuitePlomberie,
      annuiteMenui: annuiteMenuiserie,
      annuiteEtanch: annuiteEtancheite,
      annuiteRava: annuiteRavalement,
      annuiteAsc: annuiteAscenseur,
      annuiteTotale: annuiteImmobilier,
      vncImmoAnnuel: vncImmo,
    });
  }

  tabAmorImmo.push({
    annee: dateFin,
    annuiteStrucLY: annStrucProrLastYear,
    annuiteChauLY: annChauProLastYear,
    annuiteElecLY: annElecProLastYear,
    annuitePlomLY: annPlomProrLastYear,
    annuiteMenLY: annMenProrLastYear,
    annuiteEtanLY: annEtanProrLastYear,
    annuiteRavLY: annRavProrLastYear,
    annuiteAscLY: annAscProrLastYear,
    vncLastYear: vncLast,
  });

  for (var i = 0; i < tabAmorImmo.length; i++) {
    if (i >= 16) {
      tabAmorImmo.annuiteRava = 0;
    }
  }

  tabAmorImmo[2].vncImmoAnnuel =
    tabAmorImmo[1].vncImmoAnnuel - tabAmorImmo[2].annuiteTotale;

  for (var i = 2; i < tabAmorImmo.length; i++) {
    tabAmorImmo[i].vncImmoAnnuel =
      tabAmorImmo[i - 1].vncImmoAnnuel - tabAmorImmo[i].annuiteTotale;
  }
  console.log(tabAmorImmo);
};

/*Déclaration 2033A

  var immoCorpoBrut = TAB_AMOR_IMMO[0][10] + TAB_AMORT_MOBILIER[0][2];
  var immoCorpoAmor = TAB_AMOR_IMMO[0][9] + TAB_AMORT_MOBILIER[0][1];
  var immoCorpNetex = immoCorpoBrut - immoCorpoAmor;
  var immoIncorBrut = TAB_AMOR_FRAIS[0][2];
  var immoIncorpAmor = TAB_AMOR_FRAIS[0][1];
  var imIncNetex = immoIncorBrut - immoIncorpAmor;

  Tab2033A = [
    immoCorpoBrut,
    immoCorpoAmor,
    immoCorpNetex,
    immoIncorBrut,
    immoIncorpAmor,
    imIncNetex,
    montantEmprunt,
    montantAnnuelLoyer,
  ];

  console.table("2033A:", Tab2033A);

  Déclaration 2033B

var Serv = montantAnnuelLoyer;
var CharExt = TabCharExt;
var ImpTaxes=TabImpo;
var DotAmor=
var DefiAntRepo

Tab2033B =[Prod,CharExt,Imp,DotAmor,DefiAntRepo]

  Déclaration 2033C

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
