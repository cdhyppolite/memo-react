import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';

// Sous-composants
import FrmSuppression from './FrmSuppression';

export default function Controle({etatTaches, utilisateur, filtreActuel, nbTotalTaches}) {

  // Bouton toggle
  const [etatFiltre, setEtatFiltre] = filtreActuel;
  
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  
  const nbTachesIncompletes = (etatFiltre!=true) ?
    etatTaches[0].map(tache => tache.fini===false).filter(Boolean).length :
    nbTotalTaches[0]-etatTaches[0].length;

  const gererFiltreBtn = (event, nouvelEtatFiltre) => {
    // console.log("nouvelEtatFiltre: ",nouvelEtatFiltre,etatFiltre);
    if (nouvelEtatFiltre!=null)
      setEtatFiltre(nouvelEtatFiltre);
  };

  // État du formulaire de supression
  const [ouvert, setOuvert] = useState(false);

  function gererOuvert () {
    setOuvert(true);
  };
  function gereSupprimerCompletees() {
    tacheModele.supprimerCompletees(uid).then(
      () => setTaches(taches.filter(
        tache => tache.fini === false
      ))
    );
  }

  return (
    <footer className="Controle">
      <ToggleButtonGroup
        // color="primary" 
        size="small" 
        value={etatFiltre} 
        exclusive={true}
        onChange={gererFiltreBtn}
      >
        <ToggleButton value='toutes'>Toutes</ToggleButton>
        <ToggleButton value={true}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        {nbTachesIncompletes !=0 ?  nbTachesIncompletes+' tâches à faire': 'Aucune tâche à faire'}
      </span>

      <IconButton 
        aria-label="Supprimer toutes les tâches complétées"
        color="error" 
        onClick={gererOuvert}
        title="Supprimer toutes les tâches complétées"
      >
        <DeleteIcon/>
      </IconButton>

      <FrmSuppression ouvert={ouvert} setOuvert={setOuvert}
      gererActionSuppression={gereSupprimerCompletees}
      texte1={"Vous êtes sous le point de supprimer toutes les tâches complétées."}
      texte2={"Voulez-vous vraiment effectuer cette action?"}
      />
    </footer>
  );
}