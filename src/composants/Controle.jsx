import './Controle.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';

// Sous-composants
import FrmSuppression from './FrmSuppression';

export default function Controle({etatTaches, utilisateur}) {  

  const [ouvert, setOuvert] = useState(null);

  function gererOuvert () {
    setOuvert(true);
  };
  function gereSupprimerCompletees() {
    // alert('À implémenter au point B du TP#2');
    tacheModele.supprimerCompletees(utilisateur.uid);
  }

  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'}>Toutes</ToggleButton>
        <ToggleButton value={true}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        ?? tâches actives
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