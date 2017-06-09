import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Notes } from '../api/notes.js';

import './note.js';
import './body.html';

Template.Body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('notes');
});

Template.Body.helpers({
    notes() {
        const instance = Template.instance();
        return Notes.find({}, {sort: { createdAt: -1}});
    },
});

Template.Body.events({
    'submit .edit-note'(event) {
        // Empêche le navigateur de submit
        event.preventDefault();

        // Recupère les valeurs des champs du formulaire
        const target = event.target;

        const titre = target.titre.value;
        const text = target.text.value;
        const descriptionLien = target.descriptionLien.value;
        const lien = target.lien.value;
        const image = target.image.value;
        const hashtag = target.hashtag.value.split(',');

        if (target.titre.value == '') {
            sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez entrer un titre');
        }

        if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
            sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
        }

        // Insère une note dans la Collection mongo
        Meteor.call('notes.update', this._id, titre, text, descriptionLien, lien, image, hashtag);

        sAlert.success('La note a été modifiée avec succès', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
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
        const descriptionLien = target.descriptionLien.value;
        const lien = target.lien.value;
        const image = target.image.value;
        const hashtag = target.hashtag.value.split(',');

        if (target.titre.value == '') {
            sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez entrer un titre');
        }

        if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
            sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
        }

        if (target.descriptionLien.value != '' && target.lien.value == '') {
            sAlert.error('Saisissez un lien', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
        }

        if (target.descriptionLien.value == '' && target.lien.value != '') {
            sAlert.error('Saisissez une description du lien', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
            throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
        }

        // Insère une note dans la Collection mongo
        Meteor.call('notes.insert', titre, text, descriptionLien, lien, image, hashtag);

        // Vide les champs du formulaire
        target.titre.value = '';
        target.text.value = '';
        target.lien.value = '';
        target.image.value = '';
        target.hashtag.value = '';

        sAlert.success('La note a été enregistrée avec succès', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
    },
});

Template.Search.onCreated( () => {
    let instance = Template.instance();

    instance.searchQuery = new ReactiveVar();
    instance.look = new ReactiveVar();

    instance.autorun( () => {
        instance.subscribe( 'notes', instance.searchQuery.get());});
    });

    Template.Search.helpers({
        query() {
            return Template.instance().searchQuery.get();
        },
        notes() {
            let requete = Template.instance().searchQuery.get();
            let look = Template.instance().look.get();
            if (look == "Titre") {
                let notes = Notes.find({titre: { $regex : requete, $options:"i" }},{ sort: { titre: 1 } });

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            } else if (look == "Contenu") {
                let notes = Notes.find({text: { $regex : requete, $options:"i" }},{ sort: { titre: 1 } });

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            } else if (look == "Hashtag") {
                let notes = Notes.find({hashtag: { $regex : requete, $options:"i" }},{ sort: { titre: 1 } });

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            } else if (look == "Date: création") {

                let notes = Notes.find({dateSearch: requete},{ sort: { titre: 1 } } );

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            } else if (look == "Date: avant") {
                let notes = Notes.find({dateSearch: { $lte : requete }},{ sort: { titre: 1 } } );

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            } else if (look == "Date: après") {
                let notes = Notes.find({dateSearch: { $gte : requete }},{ sort: { titre: 1 } } );

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            } else if (look == "Date: entre") {
                splittedDate = requete.split("-");
                // let notes = Notes.find({dateSearch: { $gte : splittedDate[0] }},{ sort: { titre: 1 } } );

                let notes = Notes.find({$and:[{dateSearch:{$gte:splittedDate[0]}},{dateSearch:{$lte:splittedDate[1]}}]},{ sort: { titre: 1 } } );

                if (requete !== ""){
                    if ( notes ) {
                        return notes;
                    }
                }
            }
        }
    });

    Template.Search.events({
        'submit .recherche'(event, instance) {
            event.preventDefault();

            const target = event.target;

            const word = target.search.value;
            const type = target.look.value;

            if ( word !== '' ) {
                instance.searchQuery.set( word );
                instance.look.set( type );
            }

            if ( word === '' ) {
                instance.searchQuery.set( word );
                instance.look.set( type );
            }
        },
        'submit .edit-note'(event) {
            // Empêche le navigateur de submit
            event.preventDefault();

            // Recupère les valeurs des champs du formulaire
            const target = event.target;

            const titre = target.titre.value;
            const text = target.text.value;
            const descriptionLien = target.descriptionLien.value;
            const lien = target.lien.value;
            const image = target.image.value;
            const hashtag = target.hashtag.value.split(',');

            if (target.titre.value == '') {
                sAlert.error('Veuillez entrer un titre', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
                throw new Meteor.Error('Veuillez entrer un titre');
            }

            if (! target.titre.value == '' && target.text.value == '' && target.lien.value == '' && target.image.value == '') {
                sAlert.error('Veuillez ajouter au moins du texte, un lien ou une image', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
                throw new Meteor.Error('Veuillez ajouter au moins du texte, un lien ou une image');
            }

            // Insère une note dans la Collection mongo
            Meteor.call('notes.update', this._id, titre, text, descriptionLien, lien, image, hashtag);

            sAlert.success('La note a été modifiée avec succès', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
        },
    })
