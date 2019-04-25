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

Meteor.methods({'editTitle': function (id, name) {
        return Titles.update({_id: id}, {$set: {label: name}})
    }
});

Meteor.methods({'deleteTitle': function (id) {
        return Titles.remove({_id: id})
    }
});

Meteor.methods({'editName': function (id, name) {
        return Classrooms.update({'_id': id}, {$set: {'name': name}})
    }
});

Meteor.methods({'deleteClassroom': function (id) {
        // Clear titles
        const classroom = Classrooms.findOne({_id: id});
        let titles = classroom.students.map(student => {
            if (student.title) {
                Classrooms.update({'students.studentId': student.studentId}, {$set: {'students.$.title': ''}});
                return Titles.findOne({label: student.title})._id
            } else {
                return ' '
            }
        });
        for (i in titles) {
            if (titles[i] !== ' ') {
                Titles.update({_id: titles[i]}, {$set: {taken: false}})
            }
        }
        Classrooms.remove({_id: id});
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

Meteor.methods({'giveTitle': function (studentId, label) {
        Titles.update({label: label}, {$set: {taken: true}});
        Classrooms.update({'students.studentId': studentId}, {$set: {'students.$.title': label, 'students.$.needsTitle': false}})
    }
});

Meteor.methods({'pushWork': function (idArray, element) {
        for (let i = 0; i < idArray.length; i++) {
            console.log(element);
            const id = idArray[i];
            Classrooms.update({'students.studentId': id}, {$push: {'students.$.work': element}});
            const karma = findKarma(id);
            setKarma(karma, id)
        }
    }
});

Meteor.methods({'pushBehaviour': function (idArray, element) {
        for (let i = 0; i < idArray.length; i++) {
            console.log(element);
            const id = idArray[i];
            Classrooms.update({'students.studentId': id}, {$push: {'students.$.behaviour': element}});
            const karma = findKarma(id);
            setKarma(karma, id)
        }
    }
});

findKarma = function (id) {
    let classroom = Classrooms.findOne({'students.studentId': id});
    for (let i = 0; i < classroom.students.length; i++) {
        if (classroom.students[i].studentId === id) {
            let student = classroom.students[i];
            console.log(student);
            let goodPoints = 0, badPoints = 0, sleepPoints = 0;
            let bad = false, good = false, sleep = false;
            if (student.work) {
                for (let i = 0; i < student.work.length; i++) {
                    const elem = student.work[i];
                    if (elem.id === 0) {
                        badPoints += 2;
                    }
                    if (elem.id === 1) {
                        badPoints += 1;
                    }
                    if (elem.id === 5) {
                        goodPoints += 2;
                    }
                }
            }
            if (student.behaviour) {
                for (let i = 0; i < student.behaviour.length; i++) {
                    const elem = student.behaviour[i];
                    if (elem.id === 2) {
                        goodPoints += 1;
                    }
                    if (elem.id === 3) {
                        badPoints += 1;
                    }
                    if (elem.id === 4) {
                        sleepPoints += 1;
                    }

                }
            }
            if (badPoints >= 6) {
                bad = true;
            }
            if (goodPoints >= 6) {
                good = true;
            }
            if (sleepPoints >= 3) {
                sleep = true;
            }
            let label;
            if (bad) {
                label = 'Mauvais';
                return label
            }
            else if (good) {
                label = 'Bon';
                return label
            }
            else if (sleep) {
                label = 'Passif';
                return label
            }
            else{
                return ''
            }
        }
    }
};

setKarma = function (karma, id) {
    if (karma === 'Mauvais' || karma === 'Bon' || karma === 'Passif') {
        let classroom = Classrooms.findOne({'students.studentId': id});
        for (student in classroom.students) {
            // console.log(student);
            // console.log(classroom.students[student].studentId);
            if (classroom.students[student].studentId === id) {
                // console.log('student: ' + id);
                const prevKarma = classroom.students[student].karma;
                const prevTitle = classroom.students[student].title;
                // console.log('prev karma: ' + prevKarma);
                // console.log('prev karma: ' + prevTitle);
                Classrooms.update({'students.studentId': id}, {$set: {'students.$.karma': karma}});
                if (prevKarma !== karma || prevTitle === undefined) {
                    // console.log('Change Of KARMA !!');
                    Classrooms.update({'students.studentId': id}, {$set: {'students.$.needsTitle': true, 'students.$.title': undefined}});
                    if (prevTitle !== undefined) {
                        Titles.update({label: prevTitle}, {$set: {taken: false}})
                    }
                }
                break
            }
        }
    }
};