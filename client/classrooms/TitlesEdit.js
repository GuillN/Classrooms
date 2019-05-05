Template.TitlesEdit.onCreated(function () {
    const self = this;
    self.autorun(function () {
        self.subscribe('titles')
    })
});

Template.TitlesEdit.helpers({
    goodTitles: () => {
        return Titles.find({category: 'Bon'})
    },
    badTitles: () => {
        return Titles.find({category: 'Mauvais'})
    },
    sleepTitles: () => {
        return Titles.find({category: 'Passif'})
    },
    premiumManTitles: () => {
        return Titles.find({category: 'Premium', gender: 'Garçon'}, {sort: {position: 1}})
    },
    premiumWomanTitles: () => {
        return Titles.find({category: 'Premium', gender: 'Fille'}, {sort: {position: 1}})
    }
});

Template.TitlesEdit.events({
    'keypress .edit-pos': function (evt) {
        if(evt.which === 13) {
            const pos = evt.target.value;
            const id = this._id;
            Meteor.call('editPos', id, pos)
        }
    },
    'keypress .edit-title': function (evt) {
        if (evt.which === 13) {
            const name = evt.target.value;
            const id = this._id;
            console.log(`Edit title: ${name}, ${id}`);
            Meteor.call('editTitle', id, name)
        }
    },
    'click .fa-trash': function () {
        const id = this._id;
        console.log(`Delete title: ${this.label}`);
        Meteor.call('deleteTitle', id)
    }
});