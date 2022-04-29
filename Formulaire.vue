<template>
<div class="container mt-5">
<div>
<h2> Date de début d'activité LMNP</h2>
   </div> 
      <div class="form-control-range">
      
      <label for="StartDate">Date de début d'activité</label>
      <input id="start_date" type="date" required />
    </div>

 
  <form @submit.prevent="" class="container p-5" >
   <h3>J'ajoute mes valeurs</h3>
    <div class="form-group">
      
      <label for="A1">Valeur du bien immobilier :</label>
      <input v-model="valeursImmobilisable.prixDuBien" required ><br>
      <label for="A2">Montant annuel du loyer HC :</label>
      <input v-model="valeursProduit.montantAnnuelLoyer" required /><br>
      <label for="A3">Honoraires agence :</label>
      <input v-model="valeursImmobilisable.honorairesAgence"> <br>
      <label for="A4">Frais de notaire :</label>
      <input v-model="valeursImmobilisable.fraisNotaire"><br>
      <label for="A5">Frais bancaire:</label>
      <input v-model="valeursImmobilisable.fraisBancaire"><br>
      <label for="A6">Valeur du mobilier :</label>
      <input v-model="valeursImmobilisable.valeurMobilier"  required /><br>
      <label for="A7">Montant de l'emprunt:</label>
      <input v-model="valeursAutres.montantEmprunt"><br>
      <label for="A8">Frais d'aministration et de gestion</label>
      <input v-model="valeursChargesExterne.fraisAministration"><br>
      <label for="A9">Frais par local :</label>
      <input v-model="valeursChargesExterne.fraisLocal"><br>
      <label for="A10">Indemnités d'éviction et frais de relogement</label>
      <input v-model="valeursChargesExterne.indemnitesEviction"><br>
      <label for="A11">Dépenses de travaux</label>
      <input v-model="valeursChargesExterne.depensesTravaux"><br>
      <label for="A12"> Charges locatives</label>
      <input v-model="valeursChargesExterne.chargesLocatives"><br>
      <label for="A13">Impôts</label>
      <input v-model="valeursTaxes.impots"><br>
      <label for="A14">Primes d'assurances :</label>
      <input v-model="valeursChargesExterne.primesAssurances"><br>
      <label for="A15">Provisions pour charges de copropriété :</label>
      <input v-model="valeursChargesExterne.provisionsChargesCopropriete"><br>
      <label for="A16">Intérêts et frais d'emprunt :</label>
      <input v-model="valeursAutres.interetsEtFraisEmprunt"><br>
      <label for="A17"> Déductions spécifiques :</label>
      <input v-model="valeursChargesExterne.deductionsSpecifiques"><br>
    </div>

    <div @click="">
        <button type="submit" class="btn btn-primary" >Valider</button>
    </div> 
           
  </form>

</div>
<div>
  <h4> Mes valeurs amortissables</h4>
  
  <table v-for="(value,name,index) in valeursImmobilisable">
  {{index}}:{{name}} : {{value}}
  </table>
  
</div>

<div>
  <h5> Mes charges externes</h5>
  
  <table v-for="(value,name,index) in valeursChargesExterne">
  {{index}}:{{name}} : {{value}}
  </table>
  
</div>

<div>
  <h6> Mes Produits</h6>
  
  <table v-for="(value,name,index) in valeursProduit">
  {{index}}:{{name}} : {{value}}
  </table>

<div>

<div>
  <p>Impôts et taxes</p>
  
  <table v-for="(value,name,index) in valeursTaxes">
  {{index}}:{{name}} : {{value}}
  </table>
</div>
 
  
</div>
  <h8> Autres charges</h8>
  
  <table v-for="(value,name,index) in valeursAutres">
  {{index}}:{{name}} : {{value}}
  </table>
  
</div>
  {{calculer}}


</template>
<script lang="ts">


import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Formulaire',
  data(){
    let valeursImmobilisable = ref({
      prixDuBien :'',
      valeurMobilier : '',
      honorairesAgence : '',
      fraisNotaire : '',
      fraisBancaire :'',
     
    });
    let valeursChargesExterne=ref({
      fraisAministration : '',
      fraisLocal : 20,
      indemnitesEviction : '',
      depensesTravaux :'',
      chargesLocatives :"",
      primesAssurances : "",
      provisionsChargesCopropriete : "",
      deductionsSpecifiques :""
    });
    let valeursTaxes = ref({
      impots :"",
    });
    let valeursAutres =ref({
       montantEmprunt : '',
       interetsEtFraisEmprunt :"",
    });
    let valeursProduit=ref({
      montantAnnuelLoyer :'',
    })
     
   return {valeursImmobilisable, valeursChargesExterne,valeursTaxes,valeursAutres,valeursProduit};
  },
  methods:{
    calculer(){
           let A=1000;
           let B=1000;
           let tot =A+B;
   return {tot};
    } 
  }
});


</script>
<style>
label {
  display: block;
  width: 350px;
  float: left;
}

h2 {
  
  color:cadetblue;
  
  
}
h3 {
  
  color:rgb(97, 160, 95);
  
  
  
}
</style>