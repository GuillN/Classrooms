Template.Header.events({
    'click #login-buttons-logout': function (event) {
        console.log('Log out');
        setTimeout(
            () => {
                FlowRouter.go('home')
            }, 200
        );
    },
    'click #login-buttons-password': function (event) {
        console.log('Log in');
        setTimeout(
            () => {
                FlowRouter.go('classrooms')
            }, 200
        );
    }
});