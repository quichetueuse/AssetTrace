// --- TESTONS LA BLOCKCHAIN ---
const maSuperBlockchain = new Blockchain();

console.log("Ajout du log d'installation de curl...");
maSuperBlockchain.addBlock({ paquet: "curl", statut: "Réussie" });

console.log("Ajout du log d'installation de git...");
maSuperBlockchain.addBlock({ paquet: "git", statut: "Réussie" });

// Afficher toute la blockchain
console.log(JSON.stringify(maSuperBlockchain, null, 4));

// Vérifier si la chaîne est valide
console.log("La blockchain est-elle valide ? ", maSuperBlockchain.isChainValid());
