// import { Classrooms } from 'collections/Classrooms'

Meteor.publish('classrooms', function () {
    return Classrooms.find({teacher: this.userId})
});

Meteor.publish('classroom', function (id) {
    check(id, String);
    return Classrooms.find({_id: id})
});