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
  
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  
  const nbTachesIncompletes = etatTaches[0].map(tache => tache.fini===false).filter(Boolean).length;

  // Bouton toggle
  const [alignment, setAlignment] = useState('toutes');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // État du formulaire de supression
  const [ouvert, setOuvert] = useState(false);

  function gererOuvert () {
    setOuvert(true);
  };
  function gereSupprimerCompletees() {
    // alert('À implémenter au point B du TP#2');
    tacheModele.supprimerCompletees(utilisateur.uid).then(
      () => setTaches(taches.filter(
        tache => tache.fini === false
      ))
    );
  }

  function gererFiltrer(filtre) {
    // const tab = tacheModele.lireTout(uid, ['date', true], null);
    // console.log(tab);

    if (filtre!=null) {
      tacheModele.lireTout(uid, ['date', true], null).then(
        taches => setTaches(taches.filter(
          tache => tache.fini === filtre
        ))
      )
    } else {
      tacheModele.lireTout(uid, ['date', true], null).then(
        taches => setTaches(taches)
      )
    }
  }

  return (
    <footer className="Controle">
      <ToggleButtonGroup
        // color="primary" 
        size="small" 
        value={alignment} 
        exclusive={true}
        onChange={handleChange}
      >
        <ToggleButton value='toutes' onClick={() => gererFiltrer(null)}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={() => gererFiltrer(true)}>Complétées</ToggleButton>
        <ToggleButton value={false} onClick={() => gererFiltrer(false)} >Actives</ToggleButton>
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