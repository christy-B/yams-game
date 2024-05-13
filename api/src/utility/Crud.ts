import { Document, Model } from 'mongoose';

// Fonction générique pour créer un document
export async function createDocument<T extends Document>(
  model: Model<T>,
  data: Partial<T>
): Promise<T> {
  const newDocument = new model(data);
  return await newDocument.save();
}

// Fonction générique pour mettre à jour un document
export async function updateDocument<T extends Document>(
  model: Model<T>,
  id: string, 
  data: any
): Promise<T | null> {
  // Utiliser findByIdAndUpdate pour mettre à jour le document
  const updatedDocument = await model.findByIdAndUpdate(
    id, data, {new: true}
  );

  return updatedDocument;
}
