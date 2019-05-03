Template.Student.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id);
        self.subscribe('titles')
    })
});

Template.Student.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    },
    student: () => {
        const id = FlowRouter.getParam('id');
        const studentId = FlowRouter.getParam('studentId');
        const classroom = Classrooms.findOne(id);
        for (let i = 0; i < classroom.students.length; i++) {
            if (classroom.students[i].studentId === studentId) {
                Session.set('karma', classroom.students[i].karma);
                Session.set('gender', classroom.students[i].gender);
                Session.set('classroomId', classroom._id);
                return classroom.students[i]
            }
        }
    },
    titles: () => {
        const karma = Session.get('karma');
        const gender = Session.get('gender');
        console.log('find titles ' + karma + ' ' + gender);
        return Titles.find({category: karma, taken: false, gender: gender})
    }
});

Template.Student.events({
    'click #giveTitle': function () {
        const id = Session.get('classroomId');
        const studentId = FlowRouter.getParam('studentId');
        Meteor.call('giveTitle', studentId, this.label);
        FlowRouter.go('/classroom/'+id)
    }
});

Template.Student.studentChart = function() {
    let goodArray = [];
    let badArray = [];
    let sleepArray = [];
    for (let month = 0; month < 12; month++) {
        goodArray[month] = 0;
        badArray[month] = 0;
        sleepArray[month] = 0;
    }

    const id = FlowRouter.getParam('id');
    const studentId = FlowRouter.getParam('studentId');
    const classroom = Classrooms.findOne(id);
    for (let i = 0; i < classroom.students.length; i++) {
        if (classroom.students[i].studentId === studentId) {
            // student found - search in work
            if (classroom.students[i].work) {
                for (let j = 0; j < classroom.students[i].work.length; j++) {
                    const date = classroom.students[i].work[j].date;
                    const type = classroom.students[i].work[j].id;
                    const month = parseInt(date.slice(3, 5));
                    let pos;
                    if (month < 9) {
                        pos = month + 3
                    } else {
                        pos = month - 9
                    }
                    if (type === 5) {
                        goodArray[pos] += 2
                    }
                    if (type === 0) {
                        badArray[pos] += 2
                    }
                    if (type === 1) {
                        badArray[pos] += 1
                    }
                }
            }
            console.log('out of loop');
            // search in behavior
            if (classroom.students[i].behaviour) {
                for (let j = 0; j < classroom.students[i].behaviour.length; j++) {
                    const date = classroom.students[i].behaviour[j].date;
                    const type = classroom.students[i].behaviour[j].id;
                    const month = parseInt(date.slice(3, 5));
                    if (month < 9) {
                        pos = month + 3
                    } else {
                        pos = month - 9
                    }
                    if (type === 2) {
                        goodArray[pos] += 1
                    }
                    if (type === 3) {
                        badArray[pos] += 1
                    }
                    if (type === 4) {
                        sleepArray[pos] += 1
                    }
                }
            }
            if (classroom.students[i].behaviour || classroom.students[i].work) {
                return {
                    chart: {
                        type: 'column'
                    },

                    title: {
                        text: 'Résumé de l\'élève'
                    },

                    credits: {
                        enabled: false
                    },

                    xAxis: {
                        categories: [
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug'
                        ]
                    },

                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },

                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },

                    series: [{
                        name: 'Positif',
                        data: goodArray,
                        color: '#16528E'

                    }, {
                        name: 'Négatif',
                        data: badArray,
                        color: '#E54B4B'

                    }, {
                        name: 'Passif',
                        data: sleepArray,
                        color: '#329832'
                    }]
                };
            }
        }
    }
};