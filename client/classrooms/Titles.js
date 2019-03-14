Template.Titles.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('titles')
    })
});

Template.Titles.helpers({
    goodTitles: () => {
        return Titles.find({category: 'Bon'})
    },
    badTitles: () => {
        return Titles.find({category: 'Mauvais'})
    },
    sleepTitles: () => {
        return Titles.find({category: 'Passif'})
    }
});

Template.Titles.events({

});