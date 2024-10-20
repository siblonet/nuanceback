import * as mongoose from 'mongoose';


export const BefreePaysSchema = new mongoose.Schema({
  nom: String,
  nomen: String,
  telcode: String,
  created: { type: Date, default: Date.now },
})


export const BefreeCategorieSchema = new mongoose.Schema({
  name: String,
  nomen: String,
  pays: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreePays',
  },
  created: { type: Date, default: Date.now },
})


export const BefreeCooperativeSchema = new mongoose.Schema({
  nom: String,
  nomen: String,
  certificate: [{ photo: String }],
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeCategorie',
  },
  created: { type: Date, default: Date.now },
})



//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@

export const BefreeAgrulterSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  numero_telephone: String,
  identifiant_interne_exploitation: String,
  numero_etat_civil: String,
  numero_securite_sociale: String,
  numero_identification_national: String,
  genre: String,
  annee_naissance: String,
  cooperative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeCooperative',
  },
  document: String,
  qrcode: String,
  finger_print: String,
  signature: String,
  created: { type: Date, default: Date.now },
})


export const BefreeExploitationAgricoleSchema = new mongoose.Schema({
  localite: {
    name: String,
    description: String
  },
  district: {
    name: String,
    description: String
  },
  region_inspection: {
    name: String,
    description: String
  },
  identifiant_national_exploitation_agricole: String,
  nombre_unites_agricoles_pour_cette_exploitation: String,
  superficie_exploitation: String,
  type_exploitation_agricole: String,
  nombre_unite_agricole: String,
  nombre_culture_certifiees: String,
  agriculter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeAgrulter',
  },
  latitute: String,
  longitude: String,
  created: { type: Date, default: Date.now },

})


export const BefreeTravailleurAgricoleSchema = new mongoose.Schema({
  nombre_travailleur_permanent: String,
  estimation_nombre_travailleurs_temporaires: String,
  agriculter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeAgrulter',
  },
  created: { type: Date, default: Date.now },

})



export const BefreeInspecteurAgricoleSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  annee_inspection_interne: String,
  mois_inspection_interne: String,
  jour_inspection_interne: String,
  agriculter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeAgrulter',
  },
  created: { type: Date, default: Date.now },
})


export const BefreeProprieteurAgricoleSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  numero_telephone: String,
  numero_identification_national: String,
  genre: String,
  agriculter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeAgrulter',
  },
  created: { type: Date, default: Date.now },
})


export const BefreeExtraExploitationAgricoleSchema = new mongoose.Schema({
  variete_produit_agricole: String,
  superficie_produits_agricoles: String,
  estimation_totale_recolte: String,
  recolte_totale_annee_precedente: String,
  volume_vendu: String,
  croissance_recolte: String,
  rendement: String,
  rendement_annee_precedente: String,
  identifiant_unite_agricole: String,
  superficie_unite_agricole: String,
  verification_latitute: String,
  verification_longitude: String,
  produit_agricole: String,
  agriculter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeAgrulter',
  },
  created: { type: Date, default: Date.now },
})

//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
