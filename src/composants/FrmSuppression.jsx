// Boite de dialogue
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

export default function FrmSuppression({ id=null, ouvert, setOuvert, gererActionSuppression, texte1, texte2 }) {

    function gererFermer () {
        setOuvert(false);
    }
    
    function gererSupprimer() {
        setOuvert(false);
        if (id==null) {
            // Supprimer plusieurs taches
            // alert("id null");
            gererActionSuppression();
        } else {
            // Supprimer une tâche
            gererActionSuppression(id);
        }
    }
    return (
        <div>
          <Dialog
            open={ouvert}
            onClose={gererFermer}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {texte1}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              {texte2} Cette action est irréversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={gererFermer}>Annuler</Button>
              <Button onClick={gererSupprimer} autoFocus> Supprimer </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}