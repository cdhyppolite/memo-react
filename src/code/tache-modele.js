import { bdFirestore, collUtil, collTaches } from './init';
import { query, orderBy, collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc, Timestamp, where } from "firebase/firestore";

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
    // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
    // date du serveur Firestore.
    tache.date = Timestamp.fromDate(new Date());
    let collRef = collection(bdFirestore, collUtil, uid, collTaches);
    let docRef = await addDoc(collRef, tache);
    let nouveauDoc = await getDoc(docRef);
    return { id: nouveauDoc.id, ...nouveauDoc.data() };
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Array} tri tableau contenant le champ de tri et le sens du tri  
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid, tri, filtre) {
    if (filtre != null) {
        console.log('lireToutFiltre: ' + filtre)
        return getDocs(query(collection(bdFirestore, collUtil, uid, collTaches),
            where("fini", "==", filtre),
            orderBy(tri[0], tri[1] ? 'desc' : 'asc')
        )).
        then(
            qs => qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );
    } else {
        return getDocs(query(collection(bdFirestore, collUtil, uid, collTaches),
            orderBy('fini', 'asc'),
            orderBy(tri[0], tri[1] ? 'desc' : 'asc'))).
        then(
            qs => qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );
    }
}

/**
 * Supprimer une tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {string} idTache identifiant de la tâche à supprimer
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function supprimer(uid, idTache) {
    let docRef = doc(bdFirestore, collUtil, uid, collTaches, idTache);
    return await deleteDoc(docRef);
}

/**
 * Basculer l'état complétée d'une tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {string} idTache identifiant de la tâche à faire basculer
 * @param {bool} etatCompletee etat actuel de la tâche à faire basculer
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function basculer(uid, idTache, etatCompletee) {
    let docRef = doc(bdFirestore, collUtil, uid, collTaches, idTache);
    return await updateDoc(docRef, { fini: !etatCompletee });
}

/**
 * Supprimer toutes les tâches copléter pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function supprimerCompletees(uid) {
    const collRef = collection(bdFirestore, collUtil, uid, collTaches);

    const listeTachesCompletes = await getDocs(query(collRef, where("fini", "==", true)));
    listeTachesCompletes.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc);
        deleteDoc(doc.ref);
    });

}