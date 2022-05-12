import './Appli.scss';
import logo from '../images/memo-logo.png';
import Controle from './Controle';
import Taches from './Taches';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';
import { useEffect, useState } from 'react';
import { observerConnexion } from '../code/utilisateur-modele';

export default function Appli() {
  // État de l'utilisateur
  const [utilisateur, setUtilisateur] = useState(null);

  // Observer le changement d'état de la connexion utilisateur
  useEffect(() => observerConnexion(setUtilisateur), []);

  // État des tâches
  const etatTaches = useState([]);
  
  // Taille complète du tableau
  const nbTotalTaches = useState([]);

  // Bouton toggle
  const filtreActuel = useState('toutes');

  return (
    utilisateur ?
      <div className="Appli">
        <header className="appli-entete">
          <img src={logo} className="appli-logo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur} />
        </header>
        <Taches etatTaches={etatTaches} utilisateur={utilisateur} filtreActuel={filtreActuel} nbTotalTaches={nbTotalTaches}/>
        <Controle etatTaches={etatTaches} utilisateur={utilisateur} filtreActuel={filtreActuel} nbTotalTaches={nbTotalTaches}/>
      </div>
    :
      <Accueil setUtilisateur={setUtilisateur} />
  );
}
