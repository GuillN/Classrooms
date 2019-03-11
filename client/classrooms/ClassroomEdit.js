Template.ClassroomEdit.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id)
    })
});

Template.ClassroomEdit.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    }
});

Template.ClassroomEdit.events({
    'click #delete': function () {
        console.log('Delete classroom');
        const id = FlowRouter.getParam('id');
        Classrooms.remove({_id: id});
        FlowRouter.go('classrooms')
    },
    'keypress .edit-first': function (evt, template) {
        if (evt.which === 13) {
            const name = evt.target.value;
            const id = this.studentId;
            console.log('Edit first name: ' + name + id);
            Meteor.call('editFirst', id, name)
        }
    },
    'keypress .edit-last': function (evt) {
        if (evt.which === 13) {
            const name = evt.target.value;
            const id = this.studentId;
            console.log('Edit last name: ' + name + id);
            Meteor.call('editLast', id, name)
        }
    },
    'keypress .edit-name': function (evt) {
        if (evt.which === 13) {
            const name = evt.target.value;
            const id = FlowRouter.getParam('id');
            console.log('Edit class name: ' + name + id);
            Meteor.call('editName', id, name)
        }
    }
});