import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Titles = new Mongo.Collection('titles');

Titles.allow({
    insert: function (userId, doc) {
        return !!userId
    },
    remove: function (userId, doc) {
        return !!userId
    },
    update: function (userId, doc) {
        return true
    }
});

Title = new SimpleSchema({
    label: {
        type: String,
        label: 'Nom'
    },
    category: {
        type: String,
        label: 'Catégorie',
        allowedValues: ['Bon', 'Mauvais', 'Passif', 'Premium'],
        defaultValue: 'Bon'
    },
    taken: {
        type: Boolean,
        defaultValue: false
    },
    takenBy: {
        type: Array,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    'takenBy.$': {
        type: String
    },
    position: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6],
        defaultValue: 0
    },
    gender: {
        type: String,
        allowedValues: ['Garçon', 'Fille'],
        defaultValue: 'Garçon'
    },
    teacher: {
        type: String,
        label: 'Teacher',
        autoValue: function () {
            return this.userId
        }
    }
});

Titles.attachSchema(Title);