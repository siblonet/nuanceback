export interface BefreePays {
  _id?: string;
  nom: string;
  telcode: string;
  created?: Date;
}

export interface BefreeCategorie {
  _id?: string;
  name: string;
  pays: BefreePays;
  created?: Date;
}

export interface BefreeCooperative {
  _id?: string;
  nom: string;
  certificate: [{ photo: string }];
  categorie: BefreeCategorie;
  created?: Date;
}


export interface BefreeAgrulter {
  _id?: string;
  prenom: string;
  nom: string;
  numero_telephone: string;
  identifiant_interne_exploitation: string;
  numero_etat_civil: string;
  numero_piece_identite: string;
  numero_securite_sociale: string;
  numero_identification_national: string;
  genre: string;
  annee_naissance: string;
  localite: {
    name: string;
    description: string
  };
  district: {
    name: string;
    description: string
  };
  region_inspection: {
    name: string;
    description: string
  };
  cooperative: BefreeCooperative;
  document: string;
  qrcode: string;
  finger_print: string;
  signature: string;
  created?: Date;
}

export interface BefreeAgrulture {
  _id?: string;
  superficie_exploitation: string;
  type_exploitation_agricole: string;
  nombre_unite_agricole: string;
  nombre_culture_certifiees: string;
  inspecteur: {
    name: string;
    description: string;
  };
  prenom_proprietaire_exploitation: string;
  nom_proprietaire_exploitation: string;
  numero_telephone_proprietaire_exploitation: string;
  numero_identification_national_proprietaire_exploitation: string;
  genre_proprietaire_exploitation: string;
  nombre_travailleurs_permanents: string;
  estimation_travailleurs_temporaires: string;
  annee_inspection_interne: string;
  mois_inspection_interne: string;
  jour_inspection_interne: string;
  variete_produit_agricole: string;
  superficie_produits_agricoles: string;
  estimation_totale_recolte: string;
  recolte_totale_annee_precedente: string;
  volume_vendu: string;
  croissance_recolte: string;
  rendement: string;
  rendement_annee_precedente: string;
  identifiant_unite_agricole: string;
  superficie_unite_agricole: string;
  latitute: string;
  longitude: string;
  verification_latitute: string;
  verification_longitude: string;
  produit_agricole: string;
  agriculter: BefreeAgrulter;
  created?: Date;
}
