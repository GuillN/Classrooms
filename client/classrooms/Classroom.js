Template.Classroom.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id);
    })
});

Template.Classroom.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    }
});

// TODO Student selector
// TODO Link buttons to DB
Template.Classroom.events({
    'click #noWork': function () {
        console.log('No work triggered');
        const noWork = {
            date: new Date.now(),
            label: 'No Work',
            id: 0
        }
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
    }
});