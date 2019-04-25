const titleArray = ['Bonjour tout le monde!',
                    'Bonjour mes anges!',
                    'Bonjour les petits choux!'];

Template.MainTitle.onCreated(function () {
    const randInt = Math.floor(Math.random() * titleArray.length);
    Session.set('title', titleArray[randInt])
});

Template.MainTitle.helpers({
    title: () => {
        return Session.get('title')
    }
});