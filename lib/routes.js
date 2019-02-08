FlowRouter.route('/', {
    name: 'home',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/classrooms', {
    name: 'classrooms',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'Classrooms'});
    }
});