Template.Titles.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('titles')
    })
});

Template.Titles.helpers({
    goodManTitles: () => {
        return Titles.find({category: 'Bon', gender: 'Garçon'})
    },
    badManTitles: () => {
        return Titles.find({category: 'Mauvais', gender: 'Garçon'})
    },
    sleepManTitles: () => {
        return Titles.find({category: 'Passif', gender: 'Garçon'})
    },
    goodWomanTitles: () => {
        return Titles.find({category: 'Bon', gender: 'Fille'})
    },
    badWomanTitles: () => {
        return Titles.find({category: 'Mauvais', gender: 'Fille'})
    },
    sleepWomanTitles: () => {
        return Titles.find({category: 'Passif', gender: 'Fille'})
    }
});

Template.Titles.events({

});