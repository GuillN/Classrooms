import SimpleSchema from 'simpl-schema';
const uniqid = require('uniqid');
SimpleSchema.extendOptions(['autoform']);

Classrooms = new Mongo.Collection('classrooms');

Classrooms.allow({
    insert: function (userId, doc) {
        return !!userId
    },
    remove: function (userId, doc) {
        return !!userId
    }
});

Student = new SimpleSchema({
    _id: {
        type: String,
        autoform: {
            type: 'hidden'
        },
        autoValue: function () {
            return uniqid()
        }
    },
    first_name: {
        type: String,
        label: 'First Name'
    },
    last_name: {
        type: String,
        label: 'Last Name'
    },
    title: {
        type: String,
        label: 'Title',
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    behaviour: {
        type: Array,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    'behaviour.$': {
        type: String
    },
    work: {
        type: Array,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    'work.$': {
        type: String
    }
});

ClassroomSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    students: {
        type: Array
    },
    'students.$': {
        type: Student
    },
    teacher: {
        type: String,
        label: 'Teacher',
        autoValue: function () {
            return this.userId
        }
    }
});

Classrooms.attachSchema(ClassroomSchema);