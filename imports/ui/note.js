import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './note.html';

Template.note.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
});

Template.note.events({
    'click .delete'() {
        Meteor.call('notes.remove', this._id);
    },
});
