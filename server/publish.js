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
            const previousTitle = student.title;
            let label;
            if (bad) {
                if (previousTitle !== undefined && previousTitle !== 'Mauvais titre manquant') {
                    const realPreviousTitle = Titles.findOne({teacher: this.userId, label: previousTitle});
                    if (realPreviousTitle.category === 'Mauvais') {
                        return previousTitle
                    } else {
                        label = findBadTitle();
                        // remove taken
                        Titles.update({teacher: this.userId, label: previousTitle}, {$set: {taken: false}})
                    }
                } else {
                    label = findBadTitle()
                }
                return label
            }
            else if (good) {
                if (previousTitle !== undefined && previousTitle !== 'Bon titre manquant') {
                    const realPreviousTitle = Titles.findOne({teacher: this.userId, label: previousTitle});
                    if (realPreviousTitle.category === 'Bon') {
                        return previousTitle
                    } else {
                        label = findGoodTitle();
                        // remove taken
                        Titles.update({teacher: this.userId, label: previousTitle}, {$set: {taken: false}})
                    }
                } else {
                    label = findGoodTitle()
                }
                return label
            }
            else if (sleep) {
                if (previousTitle !== undefined && previousTitle !== 'Titre passif manquant') {
                    const realPreviousTitle = Titles.findOne({teacher: this.userId, label: previousTitle});
                    if (realPreviousTitle.category === 'Passif') {
                        return previousTitle
                    } else {
                        label = findSleepTitle();
                        // remove taken
                        Titles.update({teacher: this.userId, label: previousTitle}, {$set: {taken: false}})
                    }
                } else {
                    label = findSleepTitle()
                }
                return label
            }
            else{
                if (previousTitle !== undefined && previousTitle !== 'Titre passif manquant' && previousTitle !== 'Bon titre manquant' && previousTitle !== 'Mauvais titre manquant') {
                    const realPreviousTitle = Titles.findOne({teacher: this.userId, label: previousTitle});
                    label = '';
                    // remove taken
                    Titles.update({teacher: this.userId, label: previousTitle}, {$set: {taken: false}})
                }
                return ''
            }
        }
    }
};

findBadTitle = function () {
    const title = Titles.findOne({teacher: this.userId, category: 'Mauvais', taken: false});
    let label;
    if (title === undefined) {
        label = 'Mauvais titre manquant'
    } else {
        label = title.label
    }
    Titles.update({teacher: this.userId, label: label}, {$set: {taken: true}});
    console.log(title);
    return label
};

findGoodTitle = function () {
    const title = Titles.findOne({teacher: this.userId, category: 'Bon', taken: false});
    let label;
    if (title === undefined) {
        label = 'Bon titre manquant'
    } else {
        label = title.label
    }
    Titles.update({teacher: this.userId, label: label}, {$set: {taken: true}});
    console.log(title);
    return label
};

findSleepTitle = function () {
    const title = Titles.findOne({teacher: this.userId, category: 'Passif', taken: false});
    let label;
    if (title === undefined) {
        label = 'Titre passif manquant'
    } else {
        label = title.label
    }
    Titles.update({teacher: this.userId, label: label}, {$set: {taken: true}});
    console.log(title);
    return label
};