// All routes are protected
FlowRouter.triggers.enter([function (context, redirect) {
    if(!Meteor.userId()){
        FlowRouter.go('home')
    }
}]);

// Homepage route
FlowRouter.route('/', {
    name: 'home',
    action() {
        if (Meteor.userId()){
            FlowRouter.go('classrooms')
        }
        GAnalytics.pageview();
        BlazeLayout.render('HomeLayout');
    }
});

// Classroom list page route
FlowRouter.route('/classrooms', {
    name: 'classrooms',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'Classrooms'});
    }
});

// Single classroom page route
FlowRouter.route('/classroom/:id', {
    name: 'classroom',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'Classroom'})
    }
});

// Single edit classroom page route
FlowRouter.route('/classroom/:id/edit', {
    name: 'classroom-edit',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'ClassroomEdit'})
    }
});

// Student page route
FlowRouter.route('/classroom/:id/student/:studentId', {
    name: 'student',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'Student'})
    }
});

// Titles page route
FlowRouter.route('/titles', {
    name: 'titles',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'Titles'})
    }
});

// Titles edit page route
FlowRouter.route('/titles/edit', {
    name: 'titles-edit',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', {main: 'TitlesEdit'})
    }
});