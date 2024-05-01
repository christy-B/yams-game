import mongoose from 'mongoose';
import 'dotenv/config';

// Fonction asynchrone de connexion à la base de données MongoDB
async function DB(): Promise<void> {
  try {
    // Connexion à la base de données MongoDB
    await mongoose.connect(process.env.DB as string, {
      authSource: 'admin', // Spécifie l'authentification sur la base de données admin
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', (error as Error).message);
    process.exit(1); // Quitte le processus avec un échec en cas d'erreur
  }
}

export default DB;
