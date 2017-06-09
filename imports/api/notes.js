import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Notes._ensureIndex( { titre: 1, text: 1, lien: 1, image: 1, hashtag: 1, createdAt: 1, owner: 1, username: 1 } );

    Meteor.publish('notes', function notesPublication() {
        return Notes.find({
            owner: this.userId,
        });
    });

    Meteor.publish('search', function(searchValue){
        if(!searchValue) {
            return Notes.find({});
        }
    });
}

Meteor.methods({
    'notes.insert'(titre, text, lien, image, hashtag) {
        check(titre, String);
        check(text, String);
        check(lien, String);
        check(image, String);
        check(hashtag, [String]);

        let date = new Date();
        let dateFormat = moment(date).format("MM.DD.YYYY");

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Notes.insert(
            {
                titre,
                text,
                lien,
                image,
                hashtag,
                createdAt: new Date(),
                dateSearch: dateFormat,
                owner: Meteor.userId(),
                username: Meteor.user().username,
            });
        },
        'notes.remove'(noteId) {
            check(noteId, String);
            Notes.remove(noteId);
        },

        'notes.update'(noteId, titre, text, lien, image, hashtag) {
            check(noteId, String);
            check(titre, String);
            check(text, String);
            check(lien, String);
            check(image, String);
            check(hashtag, [String]);

            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            Notes.update(
                {'_id': noteId},
                {$set:
                    {'titre':titre,
                    'text':text,
                    'lien':lien,
                    'image':image,
                    'hashtag': hashtag}
                });
            },
        });
