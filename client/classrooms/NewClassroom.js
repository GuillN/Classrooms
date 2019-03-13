Template.NewClassroom.events({
    'click .form-group>.btn-primary': function () {
        Session.set('newClassroomHidden', true)
    }
});