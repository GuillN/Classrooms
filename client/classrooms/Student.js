Template.Student.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id);
    })
});

Template.Student.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    },
    student: () => {
        const id = FlowRouter.getParam('id');
        const studentId = FlowRouter.getParam('studentId');
        const classroom = Classrooms.findOne(id);
        for (let i = 0; i < classroom.students.length; i++) {
            if (classroom.students[i].studentId === studentId) {
                console.log(`Student found: ${JSON.stringify(classroom.students[i])}`);
                return classroom.students[i]
            }
        }
    }
});