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
  let Impôts = Number(document.querySelector("#A13").value);
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

  /* Valeurs charges annuelles*/

  const TabValeur = [
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration /* a exécuter cinquante fois*/,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration ,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
    [
      Number(dateBegin.format("YYYY")),
      montantAnnuelLoyer,
      MontantEmprunt,
      FraisAministration,
      FraiLocal,
      IndemnitésEviction,
      DépensesTravaux,
      ChargesLocatives,
      Impôts,
      PrimesAssurances,
      ProvisionsChargesCopropriété,
      IntérêtsEtFraisEmprunt,
      DéductionsSpécifiques,
    ],
  ];

  /*TabValeur[1][0] = 2023;*/
  /*var n = TabValeur[0];*/
  /*var x = 0;
  for (var i = 0; i < TabValeur.length; i++) {
    n++;
    x += n;
    console.log(n);
  }*/
  /*let removed = TabValeur.splice([1][0], 0, "2023");
  console.table(removed);*/
  console.table(TabValeur);

  /*amortissement du mobilier*/

  var annuiteMobilier = ValeurMobilier * txAmortMobilier;
  var AnnuiteMobProra = Math.round((annuiteMobilier * days) / DaysYear);
  var VNC1 = ValeurMobilier - AnnuiteMobProra;
  var VNC = VNC1 - annuiteMobilier;

  /*var annee = 1;*/

  var tableauAmorMobilier = [
    [dateBegin.format("YYYY"), AnnuiteMobProra, VNC1],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
    [dateBegin.format("YYYY"), annuiteMobilier, VNC],
  ];

  console.table(tableauAmorMobilier);

  /* Amortissement frais*/
  
  var annuiteFrais =
    (Number(FraisNotaire) + Number(FraisBancaire) + Number(HonorairesAgence)) *
    txamortFrais;
  var AnnuiteFraisProra = Math.round((annuiteFrais * days) / DaysYear);
  var VNC1F = FraisAministration - AnnuiteFraisProra;
  var VNC2 = VNC1F - annuiteFrais;

  const tableauAmorFrais = [
    [dateBegin.format("YYYY"), AnnuiteFraisProra, VNC1F],
    [dateBegin.format("YYYY"), annuiteFrais, VNC2],
    [dateBegin.format("YYYY"), annuiteFrais, VNC2],
    [dateBegin.format("YYYY"), annuiteFrais, VNC2],
    [dateBegin.format("YYYY"), annuiteFrais, VNC2],
  ];
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
  var TotAn1 =
    annStrucProra +
    annChaufProra +
    annElecProra +
    annEtanProra +
    annPlomProra +
    annMenuiProra +
    annRavalPropra +
    annAscProra;
  var TotAn2 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn3 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn4 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn5 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn6 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn7 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn8 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn9 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn10 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn11 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);

  var TotAn12 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);
  var TotAn13 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);
  var TotAn14 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);
  var TotAn15 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuiteEtancheite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteRavalement) +
    Number(annuiteAscenseur);
  var TotAn16 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn17 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn18 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn19 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn20 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn21 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn22 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn23 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn24 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);
  var TotAn25 =
    Number(annuiteStructure) +
    Number(annuiteChauffage) +
    Number(annuiteElectricite) +
    Number(annuitePlomberie) +
    Number(annuiteMenuiserie) +
    Number(annuiteAscenseur);

  var TotAn26 = annuiteStructure;
  var TotAn27 = annuiteStructure;
  var TotAn28 = annuiteStructure;
  var TotAn29 = annuiteStructure;
  var TotAn30 = annuiteStructure;
  var TotAn31 = annuiteStructure;
  var TotAn32 = annuiteStructure;
  var TotAn33 = annuiteStructure;
  var TotAn34 = annuiteStructure;
  var TotAn35 = annuiteStructure;
  var TotAn36 = annuiteStructure;
  var TotAn37 = annuiteStructure;
  var TotAn38 = annuiteStructure;
  var TotAn39 = annuiteStructure;
  var TotAn40 = annuiteStructure;
  var TotAn41 = annuiteStructure;
  var TotAn42 = annuiteStructure;
  var TotAn43 = annuiteStructure;
  var TotAn44 = annuiteStructure;
  var TotAn45 = annuiteStructure;
  var TotAn46 = annuiteStructure;
  var TotAn47 = annuiteStructure;
  var TotAn48 = annuiteStructure;
  var TotAn49 = annuiteStructure;
  var TotAn50 = annuiteStructure;

  const tabAmorImmo = [
    [
      dateBegin.format("YYYY"),
      annStrucProra,
      annChaufProra,
      annElecProra,
      annEtanProra,
      annPlomProra,
      annMenuiProra,
      annRavalPropra,
      annAscProra,
      TotAn1,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn2,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn3,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn4,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn5,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn6,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn7,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn8,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn9,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn10,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn11,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn12,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn13,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn14,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuiteEtancheite,
      annuitePlomberie,
      annuiteMenuiserie,
      annuiteRavalement,
      annuiteAscenseur,
      TotAn15,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn16,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn17,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn18,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn19,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn20,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn21,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn22,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn23,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuiteChauffage,
      annuiteElectricite,
      annuitePlomberie,
      annuiteMenuiserie,
      TotAn24,
    ],
    [
      dateBegin.format("YYYY"),
      annuiteStructure,
      annuitePlomberie,
      annuiteChauffage,
      annuiteElectricite,
      annuiteMenuiserie,
      TotAn25,
    ],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn26],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn27],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn28],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn29],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn30],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn31],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn32],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn33],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn34],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn35],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn36],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn37],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn38],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn39],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn40],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn41],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn42],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn43],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn44],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn45],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn46],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn47],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn48],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn49],
    [dateBegin.format("YYYY"), annuiteStructure, TotAn50],
  ];
  console.table(tabAmorImmo);

  console.log("annuité mobilier:" + annuiteMobilier);
  console.log("annuite frais :" + annuiteFrais);
  console.log("Annuité immobilier:" + annuiteImmobilier);

  document.getElementById("annuiteImmobilier").innerHTML = annuiteImmobilier;
  document.getElementById("annuiteFrais").innerHTML = annuiteFrais;
  document.getElementById("annuiteMobilier").innerHTML = annuiteMobilier;
};
