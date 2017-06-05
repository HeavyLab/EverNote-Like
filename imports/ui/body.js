import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Notes } from '../api/notes.js';

import './note.js';
import './body.html';

Template.Body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('notes');
});

Template.Body.helpers({
    notes() {
        const instance = Template.instance();
        return Notes.find({}, {sort: { createdAt: -1}});
    },
});

Template.Body.events({
    // 'submit .new-note'(event) {
    //     // Empêche le navigateur de submit
    //     event.preventDefault();
    //
    //     // Recupère les valeurs des champs du formulaire
    //     const target = event.target;
    //
    //     const titre = target.titre.value;
    //     const text = target.text.value;
    //     const lien = target.lien.value;
    //     const image = target.image.value;
    //
    //     if (target.titre.value == '') {
    //         sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
    //         throw new Meteor.Error('Veuillez entrer un titre');
    //     }
    //
    //     if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
    //         sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
    //         throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
    //     }
    //
    //     // Insère une note dans la Collection mongo
    //     Meteor.call('notes.insert', titre, text, lien, image);
    //
    //     // Vide les champs du formulaire
    //     target.titre.value = '';
    //     target.text.value = '';
    //     target.lien.value = '';
    //     target.image.value = '';
    // },
    'submit .edit-note'(event) {
        // Empêche le navigateur de submit
        event.preventDefault();

        // Recupère les valeurs des champs du formulaire
        const target = event.target;

        const titre = target.titre.value;
        const text = target.text.value;
        const lien = target.lien.value;
        const image = target.image.value;

        if (target.titre.value == '') {
            sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez entrer un titre');
        }

        if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
            sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
        }

        // Insère une note dans la Collection mongo
        Meteor.call('notes.update', this._id, titre, text, lien, image);
    },
});

Template.Add.events({
    'submit .new-note'(event) {
        // Empêche le navigateur de submit
        event.preventDefault();

        // Recupère les valeurs des champs du formulaire
        const target = event.target;

        const titre = target.titre.value;
        const text = target.text.value;
        const lien = target.lien.value;
        const image = target.image.value;

        if (target.titre.value == '') {
            sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez entrer un titre');
        }

        if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
            sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
        }

        // Insère une note dans la Collection mongo
        Meteor.call('notes.insert', titre, text, lien, image);

        // Vide les champs du formulaire
        target.titre.value = '';
        target.text.value = '';
        target.lien.value = '';
        target.image.value = '';

        sAlert.success('La note a été enregistrée avec succès', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
    },
});

Template.Search.onCreated( () => {
 let instance = Template.instance();

 instance.searchQuery = new ReactiveVar();

 instance.autorun( () => {
   instance.subscribe( 'notes', instance.searchQuery.get());});
 });

Template.Search.helpers({
  query() {
    return Template.instance().searchQuery.get();
  },
  notes() {
    let requete = Template.instance().searchQuery.get();
    let notes = Notes.find({titre: { $regex : requete, $options:"i" }},{ sort: { titre: 1 } });
    if (requete !== ""){
      if ( notes ) {
        return notes;
      }
    }

  }
});

Template.Search.events({
  'keyup [name="search"]'(event, instance) {
    event.preventDefault();

    const target = event.target;

    const word = target.value;

    if ( word !== '' && event.keyCode === 13 ) {
      instance.searchQuery.set( word );
    }

    if ( word === '' ) {
      instance.searchQuery.set( word );
    }
  },
  'submit .edit-note'(event) {
      // Empêche le navigateur de submit
      event.preventDefault();

      // Recupère les valeurs des champs du formulaire
      const target = event.target;

      const titre = target.titre.value;
      const text = target.text.value;
      const lien = target.lien.value;
      const image = target.image.value;

      if (target.titre.value == '') {
          sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
          throw new Meteor.Error('Veuillez entrer un titre');
      }

      if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
          sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
          throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
      }

      // Insère une note dans la Collection mongo
      Meteor.call('notes.update', this._id, titre, text, lien, image);
  },
  'submit .recherche'(event) {
      // Empêche le navigateur de submit
      event.preventDefault();
  },
})
