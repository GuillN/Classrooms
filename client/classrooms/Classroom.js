let selectedArray = [];

Template.Classroom.onCreated(function (){
    const id = FlowRouter.getParam('id');
    console.log(selectedArray);
    // Subscribe to classroom data
    const self = this;
    self.autorun(function (){
        self.subscribe('classroom', id);
    });
    clearSelection();
});

clearSelection = function() {
    // All students from previous selection are unselected and array is blanked
    Meteor.call('falseAll', selectedArray);
    Session.set('allSelected', false);
    selectedArray = [];
};

getCurrentDate = function() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    const hh = today.getHours();
    const min = today.getMinutes();

    return dd + '/' + mm + '/' + yyyy + " " + hh + "h" + min;
};

Template.Classroom.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    },
    allSelected: () => {
        return Session.get('allSelected')
    },
    colorRed: (k) => {
        a = 'Mauvais';
        return a === k;
    },
    colorBlue: (k) => {
        a = 'Bon';
        return a === k;
    },
    colorGreen: (k) => {
        a = 'Passif';
        return a === k;
    }
});

Template.Classroom.events({
    // Actions functions
    'click #noWork': function () {
        console.log('No work triggered');
        const noWork = {
            date: getCurrentDate(),
            label: 'Pas fait',
            id: 0
        };
        Meteor.call('pushWork', selectedArray, noWork);
        clearSelection()
    },
    'click #badWork': function () {
        console.log('Bad work triggered');
        const badWork = {
            date: getCurrentDate(),
            label: 'Mal fait',
            id: 1
        };
        Meteor.call('pushWork', selectedArray, badWork);
        clearSelection()
    },
    'click #goodBehaviour': function () {
        console.log('Good behaviour triggered');
        const goodBehaviour = {
            date: getCurrentDate(),
            label: 'Participe',
            id: 2
        };
        Meteor.call('pushBehaviour', selectedArray, goodBehaviour);
        clearSelection()
    },
    'click #badBehaviour': function () {
        console.log('Bad behaviour triggered');
        const badBehaviour = {
            date: getCurrentDate(),
            label: 'Turbulent',
            id: 3
        };
        Meteor.call('pushBehaviour', selectedArray, badBehaviour);
        clearSelection()
    },
    'click #sleeping': function () {
        console.log('Sleeping triggered');
        const sleeping = {
            date: getCurrentDate(),
            label: 'Endormi',
            id: 4
        };
        Meteor.call('pushBehaviour', selectedArray, sleeping);
        clearSelection()
    },
    // Selection functions
    'click .list-elements>.fa-circle-o': function () {
        // Add id to selected array
        console.log('Select one triggered');
        selectedArray.push(this.studentId);
        Meteor.call('trueSelected', this.studentId);
        console.log(selectedArray)
    },
    'click .list-elements>.fa-check-circle-o': function () {
        // Remove id from selected array
        console.log('Deselect one triggered');
        const index = selectedArray.indexOf(this.studentId);
        selectedArray.splice(index, 1);
        Meteor.call('falseSelected', this.studentId);
        Session.set('allSelected', false);
        console.log(selectedArray)
    },
    'click .first-element>.fa-circle-o': function () {
        console.log('Select all triggered');
        const id = FlowRouter.getParam('id');
        const classroom = Classrooms.findOne({_id: id});
        Session.set('allSelected', true);
        for (let i = 0; i < classroom.students.length; i++) {
            if (!selectedArray.includes(classroom.students[i].studentId)) {
                selectedArray.push(classroom.students[i].studentId);
                Meteor.call('trueSelected', classroom.students[i].studentId);
            }
        }
        console.log(selectedArray);
    },
    'click .first-element>.fa-check-circle-o': function () {
        console.log('Deselect all triggered');
        const id = FlowRouter.getParam('id');
        const classroom = Classrooms.findOne({_id: id});
        Session.set('allSelected', false);
        for (let i = 0; i < classroom.students.length; i++) {
            selectedArray.splice(classroom.students[i].studentId);
            Meteor.call('falseSelected', classroom.students[i].studentId);
        }
        console.log(selectedArray);
    }
});