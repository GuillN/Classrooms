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
    },
    update: function (userId, doc) {
        return true
    }
});

WorkElement = new SimpleSchema({
    id: {
        type: Number
    },
    label: {
        type: String
    },
    date: {
        type: String
    }
});

// Todo change title String to Number
Student = new SimpleSchema({
    studentId: {
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
        label: 'Prénom'
    },
    last_name: {
        type: String,
        label: 'Nom'
    },
    title: {
        type: String,
        label: 'Title',
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    selected: {
        type: Boolean,
        autoform: {
            type: 'hidden'
        },
        defaultValue: false
    },
    behaviour: {
        type: Array,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    'behaviour.$': {
        type: WorkElement
    },
    work: {
        type: Array,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    'work.$': {
        type: WorkElement
    }
});

ClassroomSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Nom de la classe'
    },
    students: {
        type: Array,
        label: 'Élèves'
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