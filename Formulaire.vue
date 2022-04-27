<template>
<div class="container mt-5">
  <h2>Date de début d'activité LMNP</h2>
    <form @submit.prevent="" class="container p-5" >
      <div class="form-control-range">
      
      <label for="StartDate">Date de début d'activité</label>
      <input id="start_date" type="date" required />
    </div>
  <h3>Mes charges</h3>
  
    <div class="form-group">
      
      <label for="A1">Valeur du bien immobilier :</label>
      <input v-model="valeurs.prixDuBien" required ><br>
      <label for="A2">Montant annuel du loyer HC :</label>
      <input v-model="valeurs.montantAnnuelLoyer" required /><br>
      <label for="A3">Honoraires agence :</label>
      <input v-model="valeurs.honorairesAgence"> <br>
      <label for="A4">Frais de notaire :</label>
      <input v-model="valeurs.fraisNotaire"><br>
      <label for="A5">Frais bancaire:</label>
      <input v-model="valeurs.fraisBancaire"><br>
      <label for="A6">Valeur du mobilier :</label>
      <input v-model="valeurs.valeurMobilier"  required /><br>
      <label for="A7">Montant de l'emprunt:</label>
      <input v-model="valeurs.montantEmprunt"><br>
      <label for="A8">Frais d'aministration et de gestion</label>
      <input v-model="valeurs.fraisAministration"><br>
      <label for="A9">Frais par local :</label>
      <input v-model="valeurs.fraisLocal"><br>
      <label for="A10">Indemnités d'éviction et frais de relogement</label>
      <input v-model="valeurs.indemnitesEviction"><br>
      <label for="A11">Dépenses de travaux</label>
      <input v-model="valeurs.depensesTravaux"><br>
      <label for="A12"> Charges locatives</label>
      <input v-model="valeurs.chargesLocatives"><br>
      <label for="A13">Impôts</label>
      <input v-model="valeurs.impots"><br>
      <label for="A14">Primes d'assurances :</label>
      <input v-model="valeurs.primesAssurances"><br>
      <label for="A15">Provisions pour charges de copropriété :</label>
      <input v-model="valeurs.provisionsChargesCopropriete"><br>
      <label for="A16">Intérêts et frais d'emprunt :</label>
      <input v-model="valeurs.interetsEtFraisEmprunt"><br>
      <label for="A17"> Déductions spécifiques :</label>
      <input v-model="valeurs.deductionsSpecifiques"><br>
    </div>
    <div @click="('')">
        <button type="submit" class="btn btn-primary" >calculer</button>
    </div> 
     
      
      
   

  </form>

</div>
<div>
  <h4>
    <p>La valeur du bien est de : {{valeurs.prixDuBien}} euros</p>
    <p>La valeur du mobilier est de : {{valeurs.valeurMobilier}} euros</p>

  </h4>
  
</div>

</template>
<script lang="ts">


import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Formulaire',
  data(){
    let valeurs = ref({
      prixDuBien :'',
      valeurMobilier : '',
      honorairesAgence : '',
      fraisNotaire : '',
      fraisBancaire :'',
      montantAnnuelLoyer :'',
      montantEmprunt : '',
      fraisAministration : '',
      fraisLocal : 20,
      indemnitesEviction : '',
      depensesTravaux :'',
      chargesLocatives :"",
      impots :"",
      primesAssurances : "",
      provisionsChargesCopropriete : "",
      interetsEtFraisEmprunt :"",
      deductionsSpecifiques :""
    });
  
  
    
      ;
     
  
 return {valeurs};
  }
});

   
</script>
<style>
label {
  display: block;
  width: 350px;
  float: left;
}

h2,h3 {
  font-size: 5;
  color:cadetblue;
  width: 500px;
  font-size: 22px;
  
}
</style>