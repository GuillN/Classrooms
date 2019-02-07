import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Classrooms = new Mongo.Collection('classrooms');
// Students = new Mongo.Collection('students');

Classrooms.allow({
    insert: function (userId, doc) {
        return !!userId
    }
});

Student = new SimpleSchema({
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
            afFieldInput: {
                type: 'hidden'
            },
            afFormGroup: {
                label: false
            }
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