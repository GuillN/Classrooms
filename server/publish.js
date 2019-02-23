Meteor.publish('classrooms', function () {
    console.log(`Publish 'classrooms' triggered`);
    const result = Classrooms.find({teacher: this.userId});
    return result
});

Meteor.publish('classroom', function (id) {
    check(id, String);
    return Classrooms.find({_id: id})
});

// TODO Get student from MongoDB
Meteor.publish('student', function (id, name) {
    console.log(`Publish 'student' triggered`);
    check(name, String);
    console.log(`Searching for the student ${name} from class ${id}`);
    const classroom = Classrooms.findOne(id);
    console.log(`Classroom found: ${JSON.stringify(classroom)}`);
    const selector = {last_name: {$in: classroom.students}};
    const options = {fields: {last_name: name}};

    // console.log(`Result: ${result}`);
    // console.log(`Result.first_name: ${result.first_name}`);
    // console.log(`Result.last_name: ${result.last_name}`);
    // console.log(`Result.stringify: ${JSON.stringify(result)}`);
    return Meteor.users.find(selector,  options);
});