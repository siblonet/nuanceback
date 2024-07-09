import * as mongoose from 'mongoose';


export const BefreePaysSchema = new mongoose.Schema({
  nom: String,
  telcode: String,
  created: { type: Date, default: Date.now },
})


export const BefreeCategorieSchema = new mongoose.Schema({
  name: String,
  pays: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreePays',
  },
  created: { type: Date, default: Date.now },
})


export const BefreeCooperativeSchema = new mongoose.Schema({
  nom: String,
  certificate: [{ photo: String }],
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeCategorie',
  },
  created: { type: Date, default: Date.now },
})


export const BefreeAgrulterSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  numero_telephone: String,
  identifiant_interne_exploitation: String,
  numero_etat_civil: String,
  numero_piece_identite: String,
  numero_securite_sociale: String,
  numero_identification_national: String,
  genre: String,
  annee_naissance: String,
  localite: {
    name: String,
    description: String,
  },
  district: {
    name: String,
    description: String,
  },
  region_inspection: {
    name: String,
    description: String,
  },
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

export const BefreeAgrultureSchema = new mongoose.Schema({
  superficie_exploitation: String,
  type_exploitation_agricole: String,
  nombre_unite_agricole: String,
  nombre_culture_certifiees: String,
  inspecteur: {
    name: String,
    description: String,
  },
  prenom_proprietaire_exploitation: String,
  nom_proprietaire_exploitation: String,
  numero_telephone_proprietaire_exploitation: String,
  numero_identification_national_proprietaire_exploitation: String,
  genre_proprietaire_exploitation: String,
  nombre_travailleurs_permanents: String,
  estimation_travailleurs_temporaires: String,
  annee_inspection_interne: String,
  mois_inspection_interne: String,
  jour_inspection_interne: String,
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
  latitute: String,
  longitude: String,
  verification_latitute: String,
  verification_longitude: String,
  produit_agricole: String,
  agriculter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BefreeAgrulter',
  },
  created: { type: Date, default: Date.now },
})



