import './Tache.scss';
// La fonction formaterDateEtHeure est exportée par défaut dans le fichier util.js
// c'est la raison pour laquelle on peut l'importer sans les accolades {} ;-)
import formaterDateEtHeure from '../code/util';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Tache({id, texte, completee, date, supprimerTache, basculerEtatTache}) {
  return (
    // Remarquez l'utilisation d'un gabarit littéral JS à l'intérieur du gabarit JSX :-0
    <div className={`Tache ${completee ? 'completee': ''}`}>
      <IconButton color="success" className='btn-padding-reduit-gauche' onClick={() => basculerEtatTache(id, completee)}>
        <CheckCircleIcon />
      </IconButton>
      <span className="texte">{texte}</span>
      <span className="date">({formaterDateEtHeure(date)})</span>
      <IconButton color="error" className='btn-padding-reduit-droite' onClick={() => supprimerTache(id)}>
        <RemoveCircleIcon />
      </IconButton>
    </div>
  );
}