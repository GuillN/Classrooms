Template.Header.events({
    'click #login-buttons-logout': function (event) {
        console.log('Log out');
        setTimeout(
            () => {
                console.log(`let's go home`);
                FlowRouter.go('home')
            }, 1000
        );
    },
    'click #login-buttons-password': function (event) {
        console.log('Log in');
        setTimeout(
            () => {
                console.log(`let's go in`);
                FlowRouter.go('classrooms')
            }, 1200
        );
    }
});