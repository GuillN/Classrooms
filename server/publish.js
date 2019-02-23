Meteor.publish('classrooms', function () {
    console.log(`Publish 'classrooms' triggered`);
    const result = Classrooms.find({teacher: this.userId});
    return result
});

Meteor.publish('classroom', function (id) {
    check(id, String);
    return Classrooms.find({_id: id})
});

Meteor.methods(
    // {'deleteRoom': function(id) {
    //         console.log('Delete Classroom triggered');
    //         return Classrooms.deleteOne({_id: id});
    //     }
    // }
);