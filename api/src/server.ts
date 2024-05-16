import Express from "express";
import { join } from 'path';
import { routerUser } from "./routes/User";
import { routerAuth } from "./routes/Auth";
import routerPatrie from "./routes/Patrie";
import routerDice from "./routes/Dice";
import { Auth } from "./middleware/Auth";
import DB from "./utility/DB";
import 'dotenv/config';
import cors from 'cors';

// Récupérer le port des variables d'environnement ou préciser une valeur par défaut
const PORT = process.env.PORT || 5050;

// Créer l'objet Express
const app = Express();
app.use(Express.json());

//connexiondb
DB();

// Configuration du middleware CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, // Autoriser l'envoi des cookies
};

app.use(cors(corsOptions));

// Endpoint
app.use('/api/user', routerUser);
app.use('/api/user', routerAuth);
app.use('/api/patries', Auth, routerPatrie);
app.use('/api/dice', Auth, routerDice)


// Server des fichiers statiques
app.use('/public', Express.static(join('assets')));

// Lancer le serveur
app.listen(PORT,
  () => {
    console.info("API Listening on port " + PORT);
  }
);