Meteor.publish('classrooms', function () {
    console.log(`Publish 'classrooms' triggered`);
    return Classrooms.find({teacher: this.userId})
});

Meteor.publish('classroom', function (id) {
    check(id, String);
    return Classrooms.find({_id: id})
});

Meteor.publish('titles', function () {
    return Titles.find({teacher: this.userId})
});

Meteor.methods({'editName': function (id, name) {
        return Classrooms.update({'_id': id}, {$set: {'name': name}})
    }
});

Meteor.methods({'editFirst': function (studentId, name) {
        return Classrooms.update({'students.studentId': studentId}, {$set: {'students.$.first_name': name}})
    }
});
Meteor.methods({'editLast': function (studentId, name) {
        return Classrooms.update({'students.studentId': studentId}, {$set: {'students.$.last_name': name}})
    }
});

Meteor.methods({'trueSelected': function (studentId) {
        return Classrooms.update({'students.studentId': studentId}, {$set: {'students.$.selected': true}})
    }
});

Meteor.methods({'falseSelected': function (studentId) {
        return Classrooms.update({'students.studentId': studentId}, {$set: {'students.$.selected': false}})
    }
});

Meteor.methods({'falseAll': function (idArray) {
        for (let i = 0; i < idArray.length; i++) {
            Classrooms.update({'students.studentId': idArray[i]}, {$set: {'students.$.selected': false}})
        }
    }
});

Meteor.methods({'pushWork': function (idArray, element) {
        for (let i = 0; i < idArray.length; i++) {
            console.log(element);
            Classrooms.update({'students.studentId': idArray[i]}, {$push: {'students.$.work': element}});
            const title = setTitle(idArray[i]);
            console.log(`Setting title: ${title}`);
            Classrooms.update({'students.studentId': idArray[i]}, {$set: {'students.$.title': title}})
        }
    }
});

Meteor.methods({'pushBehaviour': function (idArray, element) {
        for (let i = 0; i < idArray.length; i++) {
            console.log(element);
            Classrooms.update({'students.studentId': idArray[i]}, {$push: {'students.$.behaviour': element}});
            const title = setTitle(idArray[i]);
            console.log(`Setting title: ${title}`);
            Classrooms.update({'students.studentId': idArray[i]}, {$set: {'students.$.title': title}})
        }
    }
});

setTitle = function (id) {
    let classroom = Classrooms.findOne({'students.studentId': id});
    for (let i = 0; i < classroom.students.length; i++) {
        if (classroom.students[i].studentId === id) {
            let student = classroom.students[i];
            console.log(student);
            let workPoints = 0, behavPoints = 0, sleepPoints = 0;
            let bad = false, good = false, sleep = false;
            if (student.work) {
                for (let i = 0; i < student.work.length; i++) {
                    const elem = student.work[i];
                    if (elem.id === 0) {
                        workPoints -= 2;
                    }
                    if (elem.id === 1) {
                        workPoints -= 1;
                    }
                }
            }
            if (student.behaviour) {
                for (let i = 0; i < student.behaviour.length; i++) {
                    const elem = student.behaviour[i];
                    if (elem.id === 2) {
                        behavPoints += 1;
                    }
                    if (elem.id === 3) {
                        behavPoints -= 1;
                    }
                    if (elem.id === 4) {
                        sleepPoints += 1;
                    }

                }
            }
            if (workPoints < -6) {
                bad = true;
            }
            if (behavPoints > 6) {
                good = true;
            }
            if (behavPoints < -6) {
                bad = true;
            }
            if (sleepPoints >= 3) {
                sleep = true;
            }
            if (bad) {
                const title = Titles.findOne({teacher: this.userId, category: 'Bad', taken: false});
                const label = title.label;
                Titles.update({teacher: this.userId, label: label}, {$set: {taken: true}});
                console.log(title);
                return label
            }
            else if (good) {
                const title = Titles.findOne({teacher: this.userId, category: 'Good', taken: false});
                const label = title.label;
                Titles.update({teacher: this.userId, label: label}, {$set: {taken: true}});
                console.log(title);
                return label
            }
            else if (sleep) {
                const title = Titles.findOne({teacher: this.userId, category: 'Sleep', taken: false});
                const label = title.label;
                Titles.update({teacher: this.userId, label: label}, {$set: {taken: true}});
                console.log(title);
                return label
            }
            else{
                return ''
            }
        }
    }
};