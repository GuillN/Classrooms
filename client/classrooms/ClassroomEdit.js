Template.ClassroomEdit.onCreated(function (){
    const self = this;
    self.autorun(function (){
        const id = FlowRouter.getParam('id');
        self.subscribe('classroom', id)
    })
});

Template.ClassroomEdit.helpers({
    classroom: () => {
        const id = FlowRouter.getParam('id');
        return Classrooms.findOne({_id: id})
    }/*,
    // TODO student inline editing
    postOptions : function() {
        return {
            collection: "classrooms",
            field: "name",
            removeEmpty: true,
            acceptEmpty: true,
            placeholder: "Post title",
            substitute: '<i class="fa fa-pencil"></i>'
        }
    }*/
});