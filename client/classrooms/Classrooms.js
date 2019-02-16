Template.Classrooms.onCreated(function (){
    const self = this;
    self.autorun(function (){
        self.subscribe('classrooms')
    })
});

Template.Classrooms.helpers({
    classrooms: () => {
        Session.set('newClassroomHidden',true);
        return Classrooms.find({})
    },
    newClassroom:function(){
        return Session.get('newClassroomHidden')
    }
});

Template.Classrooms.events({
    'click #showNew':function(){
        Session.set('newClassroomHidden',false);
        console.log(Session)
    },
    'click #hideNew':function(){
        Session.set('newClassroomHidden',true);
    }
});