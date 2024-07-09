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

//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@
//agricole @@@@@@@@@@

export interface BefreeAgrulter {
  _id?: string;
  prenom: string;
  nom: string;
  numero_telephone: string;
  identifiant_interne_exploitation: string;
  numero_etat_civil: string;
  numero_securite_sociale: string;
  numero_identification_national: string;
  genre: string;
  annee_naissance: string;
  cooperative: BefreeCooperative;
  document: string;
  qrcode: string;
  finger_print: string;
  signature: string;
  created?: Date;
}


export interface BefreeExploitationAgricole {
  _id?: string;
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
  identifiant_national_exploitation_agricole: string;
  nombre_unites_agricoles_pour_cette_exploitation: string;
  superficie_exploitation: string;
  type_exploitation_agricole: string;
  nombre_unite_agricole: string;
  nombre_culture_certifiees: string;
  agriculter: BefreeAgrulter;
  latitute: string;
  longitude: string;
  created?: Date;

}


export interface BefreeTravailleurAgricole {
  _id?: string;
  nombre_travailleur_permanent: string;
  estimation_nombre_travailleurs_temporaires: string;
  agriculter: BefreeAgrulter;
  created?: Date;

}



export interface BefreeInspecteurAgricole {
  _id?: string;
  prenom: string;
  nom: string;
  annee_inspection_interne: string,
  mois_inspection_interne: string,
  jour_inspection_interne: string,
  agriculter: BefreeAgrulter;
  created?: Date;
}


export interface BefreeProprieteurAgricole {
  _id?: string;
  prenom: string;
  nom: string;
  numero_telephone: string,
  numero_identification_national: string,
  genre: string,
  agriculter: BefreeAgrulter;
  created?: Date;
}


export interface BefreeExtraExploitationAgricole {
  _id?: string;
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
  verification_latitute: string;
  verification_longitude: string;
  produit_agricole: string;
  agriculter: BefreeAgrulter;
  created?: Date;
}
