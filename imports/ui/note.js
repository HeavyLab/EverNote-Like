import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './note.html';

Template.Note.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
});

Template.Note.events({
    'click .delete'() {
        Meteor.call('notes.remove', this._id);
        sAlert.success('La note a été supprimée avec succès', {effect: 'genie', position: 'bottom-right', timeout: 5000, onRouteClose: false, stack: true, offset: '100px'});
    },
});
