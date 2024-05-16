import { Schema, model, Document } from 'mongoose';
import { IPatrie } from '../types/IPatrie';


export interface PatrieDocument extends IPatrie, Document { }

// Schéma Mongoose pour le modèle Patie
const patrieSchema: Schema<PatrieDocument> = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  quantityWon: { type: Number, required: true },
  winners: [{
    email: { type: String },
    quantityWon: { type: Number },
    date: { type: Date, default: Date.now }
  }]
});

// Export du modèle Patrie
export default model<PatrieDocument>('Patrie', patrieSchema);
