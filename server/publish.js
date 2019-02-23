Meteor.publish('classrooms', function () {
    console.log(`Publish 'classrooms' triggered`);
    const result = Classrooms.find({teacher: this.userId});
    return result
});

Meteor.publish('classroom', function (id) {
    check(id, String);
    return Classrooms.find({_id: id})
});

Meteor.methods({'student': function (id, studentId) {
    console.log(`Publish 'student' triggered`);
    check(studentId, String);
    console.log(`Searching for the student ${studentId} from class ${id}`);
    const classroom = Classrooms.findOne(id);
    console.log(`Classroom found: ${JSON.stringify(classroom)}`);
    for (let i = 0; i < classroom.students.length; i++) {
        if (classroom.students[i]._id === studentId) {
            console.log(`Student found: ${JSON.stringify(classroom.students[i])}`);
            return classroom.students[i]
        }
    }
}});