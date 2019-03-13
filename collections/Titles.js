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
        type: String
    },
    category: {
        type: String,
        allowedValues: ['Good', 'Bad', 'Sleep']
    },
    taken: {
        type: Boolean,
        defaultValue: false
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