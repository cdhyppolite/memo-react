import './Tache.scss';
// La fonction formaterDateEtHeure est exportée par défaut dans le fichier util.js
// c'est la raison pour laquelle on peut l'importer sans les accolades {} ;-)
import formaterDateEtHeure from '../code/util';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState, useEffect } from 'react';

// Sous-composants
import FrmSuppression from './FrmSuppression';

export default function Tache({id, nom, fini, date, supprimerTache, basculerEtatTache}) {

  const [ouvert, setOuvert] = useState(null);

  function gererOuvert () {
    setOuvert(true);
  };

  function gererSupprimerTache() {
    supprimerTache(id);
  }

  return (
    // Remarquez l'utilisation d'un gabarit littéral JS à l'intérieur du gabarit JSX :-0
    <div className={`Tache ${fini ? 'completee': ''}`}>
      <IconButton color="success" className='btn-padding-reduit-gauche' onClick={() => basculerEtatTache(id, fini)}>
        <CheckCircleIcon />
      </IconButton>
      <span className="texte">{nom}</span>
      <span className="date">({formaterDateEtHeure(date)})</span>
      <IconButton color="error" className='btn-padding-reduit-droite' onClick={gererOuvert}>
        <RemoveCircleIcon />
      </IconButton>
      <FrmSuppression ouvert={ouvert} setOuvert={setOuvert}
      gererActionSuppression={gererSupprimerTache}
      texte1={"Voulez-vous vraiment supprimer cette tâche?"}
      texte2={"Elle sera perdue à jamais."}
      />
    </div>
  );
}