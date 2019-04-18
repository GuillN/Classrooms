Template.Student.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id);
        self.subscribe('titles')
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
                Session.set('karma', classroom.students[i].karma);
                Session.set('gender', classroom.students[i].gender);
                Session.set('classroomId', classroom._id);
                return classroom.students[i]
            }
        }
    },
    titles: () => {
        const karma = Session.get('karma');
        const gender = Session.get('gender');
        return Titles.find({category: karma, taken: false, gender: gender})
    }
});

Template.Student.events({
    'click #giveTitle': function () {
        const id = Session.get('classroomId');
        const studentId = FlowRouter.getParam('studentId');
        Meteor.call('giveTitle', studentId, this.label);
        FlowRouter.go('/classroom/'+id)
    }
});