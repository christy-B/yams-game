import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/IUser';
import validator from 'validator';

// Interface représentant le document User avec les parties de jeu incluses
export interface UserDocument extends IUser, Document {}

// Schéma Mongoose pour le modèle User
const userSchema: Schema<UserDocument> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: { type: String, required: true },
  
},
{ timestamps: true });

// Export du modèle User
export default model<UserDocument>('User', userSchema);
