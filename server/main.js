import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    console.log(process.env.MONGO_URL);
});
