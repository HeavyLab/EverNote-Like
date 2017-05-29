import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Notes } from '../api/notes.js';

import './note.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('notes');
});

Template.body.helpers({
    notes() {
        const instance = Template.instance();
        return Notes.find({}, {sort: { createdAt: -1}});
    },
});

Template.body.events({
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
    },
});
