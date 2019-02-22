Template.Student.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        const name = FlowRouter.getParam('last_name');
        self.subscribe('classroom', id);
        self.subscribe('student', id, name)
    })
});

Template.Student.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    },
    student: () => {
        const id = FlowRouter.getParam('id');
        const name = FlowRouter.getParam('last_name');
        // TODO Get student from local db
    }
});