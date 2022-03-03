let amortissement = function () {
  let valeurDuBien = Number((document.querySelector("#A1").value = 240000));
  let valeurMobilier = Number((document.querySelector("#A6").value = 9000));
  let honorairesAgence = Number((document.querySelector("#A3").value = 5000));
  let fraisNotaire = Number((document.querySelector("#A4").value = 5000));
  let fraisBancaire = Number((document.querySelector("#A5").value = 500));
  let montantAnnuelLoyer = Number((document.querySelector("#A2").value = 9000));
  let montantEmprunt = Number(document.querySelector("#A7").value);
  let fraisAministration = Number(document.querySelector("#A8").value);
  let fraisLocal = 20;
  let indemnitesEviction = Number(document.querySelector("#A10").value);
  let depensesTravaux = Number((document.querySelector("#A11").value = 900));
  let chargesLocatives = Number(document.querySelector("#A12").value);
  let impots = Number((document.querySelector("#A13").value = 750));
  let primesAssurances = Number(document.querySelector("#A14").value);
  let provisionsChargesCopropriete = Number(
    document.querySelector("#A15").value
  );
  let interetsEtFraisEmprunt = Number(document.querySelector("#A16").value);
  let deductionsSpecifiques = Number(document.querySelector("#A17").value);

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

  const TAB_CHAR_EXT = [];
  var sommeCharge = 0;

  for (var i = 0; i < 51; i++) {
    TAB_CHAR_EXT.push([
      Number(dateBegin.format("YYYY")),
      fraisAministration,
      fraisLocal,
      indemnitesEviction,
      depensesTravaux,
      chargesLocatives,
      primesAssurances,
      provisionsChargesCopropriete,
      interetsEtFraisEmprunt,
      deductionsSpecifiques,
      sommeCharge,
    ]);
  }

  for (var i = 1; i < TAB_CHAR_EXT.length; i++) {
    TAB_CHAR_EXT[i][0] = TAB_CHAR_EXT[0][0] + i;
  }

  for (var i = 0; i < TAB_CHAR_EXT.length; i++) {
    var somme = 0;
    var uneAnnee = TAB_CHAR_EXT[i];
    for (var j = 1; j <= 10; j++) {
      somme += uneAnnee[j];
    }
    uneAnnee[11] = somme;
  }

  console.table(TAB_CHAR_EXT);

  /*Charges Impôts*/

  const TAB_IMPOTS = [];
  for (var i = 0; i < 51; i++) {
    TAB_IMPOTS.push([Number(dateBegin.format("YYYY")), impots]);
  }

  for (var i = 1; i < TAB_IMPOTS.length; i++) {
    TAB_IMPOTS[i][0] = TAB_IMPOTS[0][0] + i;
  }

  console.table(TAB_IMPOTS);

  /*amortissement du mobilier*/

  var annuiteMobilier = valeurMobilier * TX_AMORT_MOBILIER;
  var annuiteMobProra = Math.round((annuiteMobilier * days) / daysYear);
  var annMobProrLastYear = Math.round((annuiteMobilier * days2) / daysYear);
  var vnc1 = valeurMobilier - annuiteMobProra;
  var vnc = vnc1 - annuiteMobilier;
  var vncLast = valeurMobilier - annMobProrLastYear;

  const TAB_AMORT_MOBILIER = [
    [Number(dateBegin.format("YYYY")), annuiteMobProra, vnc1],
  ];

  for (var i = 1; i < 10; i++) {
    TAB_AMORT_MOBILIER.push([
      Number(dateBegin.format("YYYY")),
      annuiteMobilier,
      vnc,
    ]);
  }
  for (var i = 11; i == 11; i++) {
    TAB_AMORT_MOBILIER.push([dateFin, annMobProrLastYear, vncLast]);
  }

  /* boucle temporel*/
  for (var i = 0; i < TAB_AMORT_MOBILIER.length; i++) {
    TAB_AMORT_MOBILIER[i][0] = TAB_AMORT_MOBILIER[0][0] + i;
  }

  TAB_AMORT_MOBILIER[0][2] = valeurMobilier - TAB_AMORT_MOBILIER[0][1];

  for (var i = 1; i < TAB_AMORT_MOBILIER.length; i++) {
    TAB_AMORT_MOBILIER[i][2] =
      TAB_AMORT_MOBILIER[i - 1][2] - TAB_AMORT_MOBILIER[i][1];
  }
  console.table(TAB_AMORT_MOBILIER);

  /* Amortissement frais*/

  var fraisEtablissement =
    Number(fraisNotaire) + Number(fraisBancaire) + Number(honorairesAgence);
  var annuiteFrais =
    (Number(fraisNotaire) + Number(fraisBancaire) + Number(honorairesAgence)) *
    TX_AMOR_FRAIS;
  var annuiteFraisProra = Math.round((annuiteFrais * days) / daysYear);
  var annFraisLastYear = Math.round((annuiteFrais * days2) / daysYear);
  var vnc1f = fraisEtablissement - annuiteFraisProra;
  var vnc2 = 0;
  var vncLast2 = fraisEtablissement - annFraisLastYear;

  const TAB_AMOR_FRAIS = [
    [Number(dateBegin.format("YYYY")), annuiteFraisProra, vnc1f],
  ];
  for (var i = 1; i < 5; i++) {
    TAB_AMOR_FRAIS.push([Number(dateBegin.format("YYYY")), annuiteFrais, vnc2]);
  }
  for (var i = 6; i == 6; i++) {
    TAB_AMOR_FRAIS.push([dateFin, annFraisLastYear, vncLast2]);
  }

  for (var i = 0; i < TAB_AMOR_FRAIS.length; i++) {
    TAB_AMOR_FRAIS[i][0] = TAB_AMOR_FRAIS[0][0] + i;
  }

  TAB_AMOR_FRAIS[0][2] = fraisEtablissement - TAB_AMOR_FRAIS[0][1];
  for (var i = 1; i < TAB_AMOR_FRAIS.length; i++) {
    TAB_AMOR_FRAIS[i][2] = TAB_AMOR_FRAIS[i - 1][2] - TAB_AMOR_FRAIS[i][1];
  }
  console.table(TAB_AMOR_FRAIS);

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

  var annStrucProrLastYear = Math.round((annuiteStructure * days2) / daysYear);
  var annChauProLastYear = Math.round((annuiteChauffage * days2) / daysYear);
  var annElecProLastYear = Math.round((annuiteElectricite * days2) / daysYear);
  var annEtanProrLastYear = Math.round((annuiteEtancheite * days2) / daysYear);
  var annPlomProrLastYear = Math.round((annuitePlomberie * days2) / daysYear);
  var annMenProrLastYear = Math.round((annuiteMenuiserie * days2) / daysYear);
  var annRavProrLastYear = Math.round((annuiteRavalement * days2) / daysYear);
  var annAscProrLastYear = Math.round((annuiteAscenseur * days2) / daysYear);

  const TAB_AMOR_IMMO = [
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
    ],
  ];
  for (var i = 1; i < 50; i++) {
    TAB_AMOR_IMMO.push([
      Number(dateBegin.format("YYYY")),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteEtancheite,
      annuiteRavalement,
      annuiteAscenseur,
    ]);
  }
  for (var i = 50; i == 50; i++) {
    TAB_AMOR_IMMO.push([dateFin, annStrucProrLastYear]);
  }

  for (var i = 0; i < TAB_AMOR_IMMO.length; i++) {
    TAB_AMOR_IMMO[i][0] = TAB_AMOR_IMMO[0][0] + i;
  }

  for (var i = 0; i < TAB_AMOR_IMMO.length; i++) {
    if (i >= 16) {
      for (var j = 1; j < 8; j++) {
        TAB_AMOR_IMMO[i].splice(6, 1, 0);
        TAB_AMOR_IMMO[i].splice(7, 1, 0);
        TAB_AMOR_IMMO[i].splice(8, 1, 0);
        if (i >= 26) {
          for (var j = 1; j < 8; j++) {
            TAB_AMOR_IMMO[i].splice(2, 1, 0);
            TAB_AMOR_IMMO[i].splice(3, 1, 0);
            TAB_AMOR_IMMO[i].splice(4, 1, 0);
            TAB_AMOR_IMMO[i].splice(5, 1, 0);
          }
        }
      }
    }
  }

  for (var i = 0; i < TAB_AMOR_IMMO.length; i++) {
    var somme = 0;
    var uneAnnee = TAB_AMOR_IMMO[i];
    for (var j = 1; j <= 8; j++) {
      somme += uneAnnee[j];
    }
    uneAnnee[9] = somme;
  }

  TAB_AMOR_IMMO[0][10] = valeurDuBien - TAB_AMOR_IMMO[0][9];

  for (var i = 1; i < TAB_AMOR_IMMO.length; i++) {
    TAB_AMOR_IMMO[i][10] = TAB_AMOR_IMMO[i - 1][10] - TAB_AMOR_IMMO[i][9];
  }

  console.table(TAB_AMOR_IMMO);

  /*Déclaration 2033A*/

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

  /*Déclaration 2033B

var Serv = montantAnnuelLoyer;
var CharExt = TabCharExt;
var ImpTaxes=TabImpo;
var DotAmor=
var DefiAntRepo

Tab2033B =[Prod,CharExt,Imp,DotAmor,DefiAntRepo]*/

  /*Déclaration 2033C*/

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
  ];

  document.getElementById("TAB_AMOR_IMMO").innerHTML = TAB_AMOR_IMMO;
  document.getElementById("TAB_AM").innerHTML = annuiteFrais;
  document.getElementById("annuiteMobilier").innerHTML = annuiteMobilier;
};
