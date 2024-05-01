import Express from "express";
import { join } from 'path';
import { routerUser } from "./routes/User";
import { routerAuth } from "./routes/Auth";
import routerPatrie from "./routes/Patrie";
import { Auth } from "./middleware/Auth";
import DB from "./utility/DB";
import 'dotenv/config';

// Récupérer le port des variables d'environnement ou préciser une valeur par défaut
const PORT = process.env.PORT || 5050;

// Créer l'objet Express
const app = Express();
app.use(Express.json());

//connexiondb
DB();

// Endpoint
app.use('/api/user', routerUser);
app.use('/api/user', routerAuth);
app.use('/api/patries', Auth, routerPatrie);

// Server des fichiers statiques
app.use('/public', Express.static(join('assets')));
app.use(cors());

// Lancer le serveur
app.listen(PORT,
    () => {
        console.info("API Listening on port " + PORT);
    }
);