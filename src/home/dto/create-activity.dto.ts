import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  addarticle: { type: String },
  quantity: { type: Number },
  addgenre: { type: String },
  addtransage: { type: String },
  addprix: { type: Number },
  addreduction: { type: Number },
  addoccasion: { type: String },
  addfour: { type: String },
  adddispo: { type: String },
  addnouveaute: { type: String },
  addcoul: { type: String },
  addtail: { type: String },
  addmateri: { type: String },
  addmarque: { type: String },
  addtype: { type: String },
  addtypepro: { type: String },
  addphone: { type: String },
  addexpe: { type: String },
  notes: { type: String },
  owner: { type: String },
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
