Template.Classroom.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id)
    })
});

Template.Classroom.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    }
});