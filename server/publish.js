// import { Classrooms } from 'collections/Classrooms'

Meteor.publish('classrooms', function () {
    return Classrooms.find({teacher: this.userId})
});