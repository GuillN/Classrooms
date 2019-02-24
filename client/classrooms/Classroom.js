let selectedArray = [];

Template.Classroom.onCreated(function (){
    const id = FlowRouter.getParam('id');
    console.log(selectedArray);
    // Subscribe to classroom data
    const self = this;
    self.autorun(function (){
        self.subscribe('classroom', id);
    });
    // All students from previous selection are unselected and array is blanked
    Meteor.call('falseAll', selectedArray);
    selectedArray = [];
});

Template.Classroom.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    }
});

// TODO Link buttons to DB
Template.Classroom.events({
    'click #noWork': function () {
        console.log('No work triggered');
        const noWork = {
            date: new Date.now(),
            label: 'No Work',
            id: 0
        };
        Meteor.call('pushNoWork', selectedArray, noWork)
    },
    'click #badWork': function () {
        console.log('Bad work triggered');
        const badWork = {
            date: new Date.now(),
            label: 'Bad Work',
            id: 1
        }
    },
    'click #goodBehaviour': function () {
        console.log('Good behaviour triggered');
        const goodBehaviour = {
            date: new Date.now(),
            label: 'Good Behaviour',
            id: 2
        }
    },
    'click #badBehaviour': function () {
        console.log('Bad behaviour triggered');
        const badBehaviour = {
            date: new Date.now(),
            label: 'Bad Behaviour',
            id: 3
        }
    },
    'click #sleeping': function () {
        console.log('Sleeping triggered');
        const sleeping = {
            date: new Date.now(),
            label: 'sleeping',
            id: 4
        }
    },
    'click .fa-circle-o': function () {
        // Add id to selected array
        selectedArray.push(this.studentId);
        Meteor.call('trueSelected', this.studentId);
        console.log(selectedArray)
    },
    'click .fa-check-circle-o': function () {
        // Remove id from selected array
        selectedArray.splice(this.studentId);
        Meteor.call('falseSelected', this.studentId);
        console.log(selectedArray)
    }
});