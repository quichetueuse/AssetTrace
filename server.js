import express from 'express';
import { Blockchain } from './blockchain.js';

const app = express();
app.use(express.json());

// Création d'une blockchain vierge au démarrage du serveur
const maBlockchain = new Blockchain();

// Endpoint qui ajoute à la blockchain les données du paquet installé
app.post('/api/log-paquet', (req, res) => {
    const { assetIp, paquet, statut, date } = req.body;
    
    console.log(`[PAQUET REÇU] ${paquet} (${statut}) le ${date} depuis ip ${assetIp}`);

    // Ajoute le nouveau bloc
    const nouveauBloc = maBlockchain.addBlock({
        assetIp: assetIp,
        paquet: paquet,
        statut: statut,
        dateInstallation: date
    });

    console.log(`[BLOCKCHAIN] Nouveau bloc ajouté ! Index : ${nouveauBloc.index}, Hash : ${nouveauBloc.hash}`);

    res.status(200).json({ 
        success: true, 
        message: `Bloc #${nouveauBloc.index} créé avec succès pour le paquet ${paquet} !`,
        blockHash: nouveauBloc.hash
    });
});

// Endpoint qui permet de voir la blockchain
app.get('/blockchain', (req, res) => {
    res.status(200).json({
        longueur: maBlockchain.chain.length,
        chaine: maBlockchain.chain
    });
});

// Demarrage du serveur
app.listen(3000, () => {
    console.log('API blockchain en écoute le port 3000...');
});
