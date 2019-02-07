FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/classrooms', {
    name: 'classrooms',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Classrooms'});
    }
});