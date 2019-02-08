Meteor.subscribe('classrooms');

Template.Classrooms.helpers({
    classrooms: () => {
        return Classrooms.find({})
    }
});