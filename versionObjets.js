let calcul = function () {
  let valeurDuBien = Number((document.querySelector("#A1").value = 100000));
  let valeurMobilier = Number((document.querySelector("#A6").value = 5000));
  let honorairesAgence = Number((document.querySelector("#A3").value = 0));
  let fraisNotaire = Number((document.querySelector("#A4").value = 7000));
  let fraisBancaire = Number((document.querySelector("#A5").value = 0));
  let montantAnnuelLoyer = Number((document.querySelector("#A2").value = 9000));
  let montantEmprunt = Number((document.querySelector("#A7").value = 200000));
  let fraisAministration = Number((document.querySelector("#A8").value = 1000));
  let fraisLocal = 0;
  let indemnitesEviction = Number((document.querySelector("#A10").value = 0));
  let depensesTravaux = Number((document.querySelector("#A11").value = 0));
  let chargesLocatives = Number((document.querySelector("#A12").value = 0));
  let impots = Number((document.querySelector("#A13").value = 3000));
  let primesAssurances = Number((document.querySelector("#A14").value = 0));
  let provisionsChargesCopropriete = Number(
    (document.querySelector("#A15").value = 0)
  );
  let interetsEtFraisEmprunt = Number(
    (document.querySelector("#A16").value = 0)
  );
  let deductionsSpecifiques = Number(
    (document.querySelector("#A17").value = 0)
  );
  const TX_AMORT_MOBILIER = 0.1;
  const TX_AMOR_FRAIS = 0.2;

  /* calcul du prorata*/

  var date = document.getElementById("start_date").value;
  var dateBegin = moment(date);

  var dateEnd = moment().endOf("year");

  var duration = moment.duration(dateEnd.diff(dateBegin));
  var days = Math.round(duration.asDays());

  var daysYear = 365;

  /* prorata dernière année*/

  var dateFinFrais = moment(dateBegin).add(5, "year");

  yearFrais = new Date(dateFinFrais).getFullYear();
  startDateOfTheYearFrais = moment([yearFrais]);

  var days2Frais = 365 - days;

  var dateFinMob = moment(dateBegin).add(10, "year");

  yearMob = new Date(dateFinMob).getFullYear();
  startDateOfTheYearMob = moment([yearMob]);

  var days2Mob = 365 - days;

  var dateFinImmo = moment(dateBegin).add(50, "year");

  yearImmo = new Date(dateFinImmo).getFullYear();
  startDateOfTheYearImmo = moment([yearImmo]);
  console.log(startDateOfTheYearImmo);

  var days2Immo = 365 - days;
  console.log(days2Immo);

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
  console.log(sommeChExternes);
  /*amortissement du mobilier*/

  var annuiteMobilier = valeurMobilier * TX_AMORT_MOBILIER;
  var annuiteMobProra = Math.round((annuiteMobilier * days) / daysYear);
  var annMobProrLastYear = Math.round((annuiteMobilier * days2Mob) / daysYear);
  var vnc1 = valeurMobilier - annuiteMobProra;
  var vnc = vnc1 - annuiteMobilier;
  var vncLast = valeurMobilier - annMobProrLastYear;

  tabAmortissementMob = [];
  tabAmortissementMob.push({
    annee: Number(dateBegin.format("YYYY")),
    annuiteMobilierPro: annuiteMobProra,
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
    annee: Number(dateFinMob.format("YYYY")),
    annuiteMobilierProLY: annMobProrLastYear,
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
  var annFraisLastYear = Math.round((annuiteFrais * days2Frais) / daysYear);
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
    annee: Number(dateFinFrais.format("YYYY")),
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
  const TX_AMOR_AGENCEMENT = 0.06673333333;

  const TX_REP_GROS_OEUVRE = 0.4;
  const TX_REP_FACADE = 0.2;
  const TX_REP_EQUIPEMENT = 0.2;
  const TX_REP_AGENCEMENT = 0.2;

  let partA = valeurDuBien * TX_REP_GROS_OEUVRE;
  let partB = valeurDuBien * TX_REP_FACADE;
  let partC = valeurDuBien * TX_REP_EQUIPEMENT;
  let partD = valeurDuBien * TX_REP_AGENCEMENT;

  console.log(partA, partB, partC, partD);

  var annuiteGrosOeuvre = partA * TX_AMOR_GROS_OEUVRE;
  var annuiteFacade = partB * TX_AMOR_FACADE;
  var annuiteEquipement = partC * TX_AMOR_EQUIPEMENT;
  var annuiteAgencement = partD * TX_AMOR_AGENCEMENT;

  var annuitePeriode2 =
    annuiteGrosOeuvre + annuiteFacade + annuiteEquipement + annuiteAgencement;

  var annuitePeriode3 = annuiteGrosOeuvre + annuiteFacade + annuiteEquipement;

  var annuitePeriode4 = annuiteGrosOeuvre + annuiteFacade;

  var annuitePeriode5 = annuiteGrosOeuvre;

  /*var annGrosProra = Math.trunc((annuiteGrosOeuvre * days) / daysYear);
  var annFacadeProra = Math.trunc((annuiteFacade * days) / daysYear);
  var annEquiProra = Math.trunc((annuiteEquipement * days) / daysYear);
  var annAgenProra = Math.trunc((annuiteAgencement * days) / daysYear);*/

  var annGrosProra = (annuiteGrosOeuvre * days) / daysYear;
  var annFacadeProra = (annuiteFacade * days) / daysYear;
  var annEquiProra = (annuiteEquipement * days) / daysYear;
  var annAgenProra = (annuiteAgencement * days) / daysYear;

  var sommeAnnuiteProra =
    annGrosProra + annFacadeProra + annEquiProra + annAgenProra;
  var annLastYear = (annuitePeriode2 * days2Immo) / daysYear;
  console.log(annLastYear);
  console.log(daysYear);
  var sommeAnnuiteLY = annLastYear;

  console.log(days);
  console.log("Immo:", days2Immo);

  console.log("Frais", days2Frais);
  console.log("Mob", days2Mob);

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
  console.log(tabAmorImmo.sommePer4);
  console.log(tabAmorImmo.annuiteGros);

  for (var i = 30; i < 50; i++) {
    tabAmorImmo.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      annuiteGros: annuiteGrosOeuvre,
      sommePer5: annuitePeriode5,
      vncPer5: 0,
    });
  }
  console.log(tabAmorImmo.sommePer5);

  tabAmorImmo.push({
    annee: Number(dateFinImmo.format("YYYY")),
    annuiteLY: annLastYear,
    sommePer6: sommeAnnuiteLY,
    vncPer6: 0,
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
  for (var i = 31; i < 49; i++) {
    tabAmorImmo[i].vncPer5 =
      tabAmorImmo[i - 1].vncPer5 - tabAmorImmo[i].sommePer5;
  }
  tabAmorImmo[49].vncPer5 = Math.trunc(
    tabAmorImmo[48].vncPer5 - tabAmorImmo[49].sommePer5
  );
  tabAmorImmo[50].vncPer6 = Math.trunc(
    tabAmorImmo[49].vncPer5 - tabAmorImmo[50].sommePer6
  );

  console.log(tabAmorImmo);

  /*Tâches :
  Coder une Fonction déclaration qui va récupérer les données de la fonction calcul 
  Donner la possibilité à l'utilisateur de sélectionner l'année de déclaration
*/

  /*Déclaration 2033A*/

  Decl2033A = [];
  Decl2033A.push({
    annee: Number(dateBegin.format("YYYY")),
    BrutCorporel:
      tabAmorImmo[0].valeurBrute + tabAmortissementMob[0].valeurBrute,
    AmorCorporel: Math.trunc(
      tabAmorImmo[0].sommeAnnProra + tabAmortissementMob[0].annuiteMobilierPro
    ),
    NetCorporel: Math.trunc(
      tabAmorImmo[0].vncPer1 + tabAmortissementMob[0].vnc
    ),
    BrutIncorporel: tabAmorFrais[0].valeurBrute,
    AmorIncorporel: tabAmorFrais[0].annuiteFrais,
    NetIncorporel: tabAmorFrais[0].vnc,
    Emprunt: montantEmprunt,
  });
  for (var i = 1; i < 6; i++) {
    Decl2033A.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      BrutCorporel: Math.trunc(
        tabAmorImmo[i].vncPer2 +
          tabAmorImmo[i].sommePer2 +
          (tabAmortissementMob[i].vnc + tabAmortissementMob[i].annuiteMobilier)
      ),
      AmorCorporel: Math.trunc(
        tabAmorImmo[i].sommePer2 + tabAmortissementMob[i].annuiteMobilier
      ),
      NetCorporel: Math.trunc(
        tabAmorImmo[i].vncPer2 + tabAmortissementMob[i].vnc
      ),
      BrutIncorporel: tabAmorFrais[i].vnc + tabAmorFrais[i].annuiteFrais,
      AmorIncorporel: tabAmorFrais[i].annuiteFrais,
      NetIncorporel: tabAmorFrais[i].vnc,
      Emprunt: montantEmprunt,
    });
  }
  for (var i = 6; i < 10; i++) {
    Decl2033A.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      BrutCorporel: Math.trunc(
        tabAmorImmo[i].vncPer2 +
          tabAmorImmo[i].sommePer2 +
          (tabAmortissementMob[i].vnc + tabAmortissementMob[i].annuiteMobilier)
      ),
      AmorCorporel: Math.trunc(
        tabAmorImmo[i].sommePer2 + tabAmortissementMob[i].annuiteMobilier
      ),
      NetCorporel: Math.trunc(
        tabAmorImmo[i].vncPer2 + tabAmortissementMob[i].vnc
      ),
      Emprunt: montantEmprunt,
    });
  }
  for (var i = 10; i < 15; i++) {
    Decl2033A.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Brut: Math.trunc(tabAmorImmo[i].vncPer2 + tabAmorImmo[i].sommePer2),
      Amor: Math.trunc(tabAmorImmo[i].sommePer2),
      Net: Math.trunc(tabAmorImmo[i].vncPer2),
      Emprunt: montantEmprunt,
    });
  }
  for (var i = 15; i < 20; i++) {
    Decl2033A.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Brut: Math.trunc(tabAmorImmo[i].vncPer3 + tabAmorImmo[i].sommePer3),
      Amor: Math.trunc(tabAmorImmo[i].sommePer3),
      Net: Math.trunc(tabAmorImmo[i].vncPer3),
      Emprunt: montantEmprunt,
    });
  }
  for (var i = 20; i < 30; i++) {
    Decl2033A.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Brut: Math.trunc(tabAmorImmo[i].vncPer4 + tabAmorImmo[i].sommePer4),
      Amor: Math.trunc(tabAmorImmo[i].sommePer4),
      Net: Math.trunc(tabAmorImmo[i].vncPer4),
      Emprunt: montantEmprunt,
    });
  }
  for (var i = 30; i < 50; i++) {
    Decl2033A.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Brut: Math.trunc(tabAmorImmo[i].vncPer5 + tabAmorImmo[i].sommePer5),
      Amor: Math.trunc(tabAmorImmo[i].sommePer5),
      Net: Math.trunc(tabAmorImmo[i].vncPer5),
      Emprunt: montantEmprunt,
    });
  }
  Decl2033A.push({
    annee: Number(dateFinImmo.format("YYYY")),
    Brut: Math.trunc(tabAmorImmo[50].vncPer6 + tabAmorImmo[i].sommePer6),
    Amor: Math.trunc(tabAmorImmo[50].sommePer6),
    Net: Math.trunc(tabAmorImmo[50].vncPer6),
    Emprunt: montantEmprunt,
  });
  console.log("2033A", Decl2033A);

  /*Déclaration 2033B*/

  Decl2033B = [];

  Decl2033B.push({
    annee: Number(dateBegin.format("YYYY")),
    Loyers: montantAnnuelLoyer,
    TotalChargeExte: sommeChExternes,
    Impots: impots,
    DotationAmortissement: Math.trunc(
      tabAmorFrais[0].annuiteFrais +
        tabAmorImmo[0].sommeAnnProra +
        tabAmortissementMob[0].annuiteMobilierPro
    ),
    TotalProduitExplo: montantAnnuelLoyer,
    TotalCharExploitations:
      sommeChExternes +
      impots +
      Math.trunc(
        tabAmorFrais[0].annuiteFrais +
          tabAmorImmo[0].sommeAnnProra +
          tabAmortissementMob[0].annuiteMobilierPro
      ),
    Resultat:
      montantAnnuelLoyer -
      (sommeChExternes +
        impots +
        Math.trunc(
          tabAmorFrais[0].annuiteFrais +
            tabAmorImmo[0].sommeAnnProra +
            tabAmortissementMob[0].annuiteMobilierPro
        )),
    ResultatCumule:
      montantAnnuelLoyer -
      (sommeChExternes +
        impots +
        Math.trunc(
          tabAmorFrais[0].annuiteFrais +
            tabAmorImmo[0].sommeAnnProra +
            tabAmortissementMob[0].annuiteMobilierPro
        )),
  });

  for (var i = 1; i < 5; i++) {
    var reportResultat = Decl2033B[i - 1].ResultatCumule;
    console.log(reportResultat);
    Decl2033B.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Loyers: montantAnnuelLoyer,
      TotalChargeExte: sommeChExternes,
      Impots: impots,
      DotationAmortissement: Math.trunc(
        tabAmorFrais[i].annuiteFrais +
          tabAmorImmo[i].sommePer2 +
          tabAmortissementMob[i].annuiteMobilier
      ),
      TotalProduitExplo: montantAnnuelLoyer,
      TotalCharExploitations:
        sommeChExternes +
        impots +
        Math.trunc(
          tabAmorFrais[i].annuiteFrais +
            tabAmorImmo[i].sommePer2 +
            tabAmortissementMob[i].annuiteMobilier
        ),
      Resultat:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots +
          Math.trunc(
            tabAmorFrais[i].annuiteFrais +
              tabAmorImmo[i].sommePer2 +
              tabAmortissementMob[i].annuiteMobilier
          )),
      ResultatCumule:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots -
          reportResultat +
          Math.trunc(
            tabAmorFrais[i].annuiteFrais +
              tabAmorImmo[i].sommePer2 +
              tabAmortissementMob[i].annuiteMobilier
          )),
    });
  }

  for (var i = 5; i < 10; i++) {
    var reportResultat = Decl2033B[i - 1].ResultatCumule;
    Decl2033B.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Loyers: montantAnnuelLoyer,

      TotalChargeExte: sommeChExternes,
      Impots: impots,
      DotationAmortissement: Math.trunc(
        tabAmorImmo[i].sommePer2 + tabAmortissementMob[i].annuiteMobilier
      ),
      TotalProduitExplo: montantAnnuelLoyer,
      TotalCharExploitations:
        sommeChExternes +
        impots +
        Math.trunc(
          tabAmorImmo[i].sommePer2 + tabAmortissementMob[i].annuiteMobilier
        ),
      Resultat:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots +
          Math.trunc(
            tabAmorImmo[i].sommePer2 + tabAmortissementMob[i].annuiteMobilier
          )),
      ResultatCumule:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots -
          reportResultat +
          Math.trunc(
            tabAmorImmo[i].sommePer2 + tabAmortissementMob[i].annuiteMobilier
          )),
    });
  }
  for (var i = 10; i < 15; i++) {
    var reportResultat = Decl2033B[i - 1].ResultatCumule;
    Decl2033B.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Loyers: montantAnnuelLoyer,

      TotalChargeExte: sommeChExternes,
      Impots: impots,
      DotationAmortissement: Math.trunc(tabAmorImmo[i].sommePer2),
      TotalProduitExplo: montantAnnuelLoyer,
      TotalCharExploitations:
        sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer2),
      Resultat:
        montantAnnuelLoyer -
        (sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer2)),
      ResultatCumule:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots -
          reportResultat +
          Math.trunc(tabAmorImmo[i].sommePer2)),
    });
  }
  for (var i = 15; i < 20; i++) {
    var reportResultat = Decl2033B[i - 1].ResultatCumule;
    Decl2033B.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Loyers: montantAnnuelLoyer,

      TotalChargeExte: sommeChExternes,
      Impots: impots,
      DotationAmortissement: Math.trunc(tabAmorImmo[i].sommePer3),
      TotalCharExploitations:
        sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer3),
      Resultat:
        montantAnnuelLoyer -
        (sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer3)),
      ResultatCumule:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots -
          reportResultat +
          Math.trunc(tabAmorImmo[i].sommePer3)),
    });
  }
  for (var i = 20; i < 30; i++) {
    var reportResultat = Decl2033B[i - 1].ResultatCumule;
    Decl2033B.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Loyers: montantAnnuelLoyer,

      TotalChargeExte: sommeChExternes,
      Impots: impots,
      DotationAmortissement: Math.trunc(tabAmorImmo[i].sommePer4),
      TotalCharExploitations:
        sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer4),
      Resultat:
        montantAnnuelLoyer -
        (sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer4)),
      ResultatCumule:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots -
          reportResultat +
          Math.trunc(tabAmorImmo[i].sommePer4)),
    });
  }
  for (var i = 30; i < 50; i++) {
    var reportResultat = Decl2033B[i - 1].ResultatCumule;
    Decl2033B.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      Loyers: montantAnnuelLoyer,

      TotalChargeExte: sommeChExternes,
      Impots: impots,
      DotationAmortissement: Math.trunc(tabAmorImmo[i].sommePer5),
      TotalCharExploitations:
        sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer5),
      Resultat:
        montantAnnuelLoyer -
        (sommeChExternes + impots + Math.trunc(tabAmorImmo[i].sommePer5)),
      ResultatCumule:
        montantAnnuelLoyer -
        (sommeChExternes +
          impots -
          reportResultat +
          Math.trunc(tabAmorImmo[i].sommePer5)),
    });
  }
  var reportResultat = Decl2033B[50 - 1].ResultatCumule;
  Decl2033B.push({
    annee: Number(dateFinImmo.format("YYYY")),
    Loyers: montantAnnuelLoyer,

    TotalChargeExte: sommeChExternes,
    Impots: impots,
    DotationAmortissement: Math.trunc(tabAmorImmo[50].sommePer6),
    TotalCharExploitations:
      sommeChExternes + impots + Math.trunc(tabAmorImmo[50].sommePer6),
    Resultat:
      montantAnnuelLoyer -
      (sommeChExternes + impots + Math.trunc(tabAmorImmo[50].sommePer6)),
    ResultatCumule:
      montantAnnuelLoyer -
      (sommeChExternes +
        impots -
        reportResultat +
        Math.trunc(tabAmorImmo[50].sommePer6)),
  });
  console.log("2033B:", Decl2033B);

  /*Déclaration 2033C*/

  Decl2033C = [];
  Decl2033C.push({
    annee: Number(dateBegin.format("YYYY")),
    ValeurBruteFrais: tabAmorFrais[0].valeurBrute,
    /*AugmentationsFrais:*/
    DiminutionsFrais: tabAmorFrais[0].annuiteFrais,
    ValeurBruteFinExFrais: tabAmorFrais[0].vnc,
    ValeurBruteImmo: tabAmorImmo[0].valeurBrute,
    /*AugmentationsImmo: tabAmorImmo[0].valeurBrute*/
    DiminutionsImmo: tabAmorImmo[0].sommeAnnProra,
    ValeurBruteFinExImmo: tabAmorImmo[0].vncPer1,
    ValeurBruteMob: tabAmortissementMob[0].valeurBrute,
    DiminutionsMob: tabAmortissementMob[0].annuiteMobilierPro,
    ValeurBruteFinExMob: tabAmortissementMob[0].vnc,
  });
  for (var i = 1; i < 5; i++) {
    Decl2033C.push({
      annee: Number(dateBegin.format("YYYY")) + i,
      ValeurBruteFrais: Decl2033C[i - 1].ValeurBruteFinExFrais,
      DiminutionsFrais: tabAmorFrais[i].annuiteFrais,
      ValeurBruteFinExFrais: tabAmorFrais[i].vnc,
      ValeurBruteImmo: Decl2033C[i - 1].ValeurBruteFinExImmo,
      AugmentationsImmo: tabAmorImmo[i].valeurBrute,
      DiminutionsImmo: tabAmorImmo[i].sommePer2,
      ValeurBruteFinExImmo: tabAmorImmo[i].vncPer2,
      ValeurBruteMob: Decl2033C[i - 1].ValeurBruteFinExMob,
      DiminutionsMob: tabAmortissementMob[i].annuiteMobilier,
      ValeurBruteFinExMob: tabAmortissementMob[i].vnc,
    });
  }
  for (var i = 5; i < 10; i++) {
    Decl2033C.push({
      annee: Number(dateBegin.format("YYYY")) + i,

      ValeurBruteImmo: Decl2033C[i - 1].ValeurBruteFinExImmo,
      AugmentationsImmo: tabAmorImmo[i].valeurBrute,
      DiminutionsImmo: tabAmorImmo[i].sommePer2,
      ValeurBruteFinExImmo: tabAmorImmo[i].vncPer2,
      ValeurBruteMob: Decl2033C[i - 1].ValeurBruteFinExMob,
      DiminutionsMob: tabAmortissementMob[i].annuiteMobilier,
      ValeurBruteFinExMob: tabAmortissementMob[i].vnc,
    });
  }
  for (var i = 10; i < 15; i++) {
    Decl2033C.push({
      annee: Number(dateBegin.format("YYYY")) + i,

      ValeurBruteImmo: Decl2033C[i - 1].ValeurBruteFinExImmo,
      AugmentationsImmo: tabAmorImmo[i].valeurBrute,
      DiminutionsImmo: tabAmorImmo[i].sommePer2,
      ValeurBruteFinExImmo: tabAmorImmo[i].vncPer2,
    });
  }
  for (var i = 15; i < 20; i++) {
    Decl2033C.push({
      annee: Number(dateBegin.format("YYYY")) + i,

      ValeurBruteImmo: Decl2033C[i - 1].ValeurBruteFinExImmo,
      AugmentationsImmo: tabAmorImmo[i].valeurBrute,
      DiminutionsImmo: tabAmorImmo[i].sommePer3,
      ValeurBruteFinExImmo: tabAmorImmo[i].vncPer3,
    });
  }
  for (var i = 20; i < 30; i++) {
    Decl2033C.push({
      annee: Number(dateBegin.format("YYYY")) + i,

      ValeurBruteImmo: Decl2033C[i - 1].ValeurBruteFinExImmo,
      AugmentationsImmo: tabAmorImmo[i].valeurBrute,
      DiminutionsImmo: tabAmorImmo[i].sommePer4,
      ValeurBruteFinExImmo: tabAmorImmo[i].vncPer4,
    });
  }
  for (var i = 30; i < 50; i++) {
    Decl2033C.push({
      annee: Number(dateBegin.format("YYYY")) + i,

      ValeurBruteImmo: Decl2033C[i - 1].ValeurBruteFinExImmo,
      AugmentationsImmo: tabAmorImmo[i].valeurBrute,
      DiminutionsImmo: tabAmorImmo[i].sommePer5,
      ValeurBruteFinExImmo: tabAmorImmo[i].vncPer5,
    });
  }
  Decl2033C.push({
    annee: Number(dateFinImmo.format("YYYY")),

    ValeurBruteImmo: Decl2033C[50 - 1].ValeurBruteFinExImmo,
    DiminutionsImmo: tabAmorImmo[50].sommePer6,
    ValeurBruteFinExImmo: tabAmorImmo[50].vncPer6,
  });
  console.log("2033C:", Decl2033C);
};
