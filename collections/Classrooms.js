import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Classrooms = new Mongo.Collection('classrooms');

Classrooms.allow({
    insert: function (userId, doc) {
        return !!userId
    }
});

// TODO Add a student ID
Student = new SimpleSchema({
    first_name: {
        type: String,
        label: 'first_name'
    },
    last_name: {
        type: String,
        label: 'last_name'
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