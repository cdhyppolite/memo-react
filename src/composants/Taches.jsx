import Tache from './Tache';
import './Taches.scss';
import * as tacheModele from '../code/tache-modele';
import { useState, useEffect } from 'react';
import {alignment} from './Controle';

export default function Taches({etatTaches, utilisateur, filtreActuel}) {
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  const [tri, setTri] = useState(['date', true]);
  // Bouton toggle
  const [etatFiltre, setEtatFiltre] = filtreActuel;

  /**
   * On cherche les tâches une seule fois après l'affichage du composant
   */
  useEffect(() => 
    tacheModele.lireTout(uid, tri).then(
      taches => setTaches(taches)
    )
  , [setTaches, uid, tri]);

  /**
   * Gérer le formulaire d'ajout de nouvelle tâche en appelant la méthode 
   * d'intégration Firestore appropriée, puis actualiser les tâches en faisant 
   * une mutation de l'état 'taches'.
   * @param {string} uid Identifiant Firebase Auth de l'utilisateur connecté
   * @param {Event} e Objet Event JS qui a déclenché l'appel
   */
  function gererAjoutTache(uid, e) {
    // Prévenir le formulaire d'être soumit (et de faire une requête HTTP 
    // qui causerait une actualisation de la page !!!)
    e.preventDefault();
    // Récupérer la valeur de la boîte de texte
    const texte = e.target.texteTache.value;
    // Si le texte est vide, oublie ça ;-)
    if(texte.trim() !== '') {
      // Bonne idée : vider le formulaire pour la prochaine tâche
      e.target.reset();
      // Insérer la tâche dans Firestore
      tacheModele.creer(uid, {nom: texte, fini: false}).then(

        (etatFiltre=="toutes") ?
        // Actualiser l'état des taches en remplaçant le tableau des taches par
        // une copie du tableau auquel on joint la tâche qu'on vient d'ajouter 
        // dans Firestore (et qui est retournée par la fonction creer()).
        tache => setTaches([tache, ...taches])
        :
        // Relire le tableau complet depuis firebase car le tableau actuel ne
        // contient que les tâches selon le filtre précédent
        tacheModele.lireTout(uid,tri).then(
          taches => setTaches(taches)
        )
      );
      // Changer le buton
      setEtatFiltre("toutes");
    }
  }

  /**
   * Supprime une tâche
   * @param {string} idTache Identifiant Firestore de la tâche à supprimer
   */
  function supprimerTache(idTache) {
    tacheModele.supprimer(utilisateur.uid, idTache).then(
      // On filtre le tableau des tâches localement et on met à jour l'état React "taches"
      () => setTaches(taches.filter(
        tache => tache.id !== idTache
      ))
    );
  }

  /**
   * Fait basculer l'état de la tâche (complétée <--> non-complétée)
   * @param {string} idTache Identifiant Firestore de la tâche à faire basculer
   * @param {bool} etatCompletee état actuel de la tâche
   */
  function basculerEtatTache(idTache, etatCompletee) {
    tacheModele.basculer(utilisateur.uid, idTache, etatCompletee).then(
      // On modifie le tableau des tâches localement et on met à jour l'état React "taches"
      () => setTaches(
        taches.map((tache) => {
          if(tache.id === idTache) {
            tache.fini = !etatCompletee;
          }
          return tache;
        })
      )
    )
  }

  return (
    <section className="Taches">
      <form onSubmit={e => gererAjoutTache(uid, e)}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          autoFocus={true} 
        />
      </form>
      <div className="titre-liste-taches">
        <span className="texte" onClick={() => setTri(['nom', !tri[1]])}>Tâche</span>
        <span className="date" onClick={() => setTri(['date', !tri[1]])}>Date d'ajout</span>
      </div>
      <div className="liste-taches">
        {
          taches.map(tache => <Tache  key={tache.id} {... tache} 
            supprimerTache={supprimerTache} 
            basculerEtatTache={basculerEtatTache} />)
        }
      </div>
    </section>
  );
}