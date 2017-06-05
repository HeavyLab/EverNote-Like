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
    },
});
