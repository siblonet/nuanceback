import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  addarticle: { type: String },
  quantity: { type: Number },
  quanvend: {
    type: Number,
    default: 0
  },
  addgenre: { type: String },
  addprix: { type: Number },
  addreduction: { type: Number },
  addoccasion: { type: String },
  addcoul: { type: String },
  addmarque: { type: String },
  barcode: { type: String },
  notes: { type: String },
  owner: { type: String, default: "nuance" },
  image: [{ ima: { type: String } }],  // Corrected the type for 'ima'
  created: { type: Date, default: Date.now }
});

//export default mongoose.model('Article', ArticleSchema);


export const AnnonceSchema = new mongoose.Schema({
  which: { type: String },
  owner: { type: String },
  image: { type: String },  // Corrected the type for 'ima'
  created: { type: Date, default: Date.now }
});

export const VersionAvailabeSchema = new mongoose.Schema({
  version: { type: Number },
  owner: { type: String, default: "nuance" },
  url: { type: String },  // Corrected the type for 'ima'
  created: { type: Date, default: Date.now }
});
