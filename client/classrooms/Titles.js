Template.Titles.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('titles')
    })
});

Template.Titles.helpers({
    goodTitles: () => {
        return Titles.find({category: 'Good'})
    },
    badTitles: () => {
        return Titles.find({category: 'Bad'})
    },
    sleepTitles: () => {
        return Titles.find({category: 'Sleep'})
    }
});

Template.Titles.events({

});