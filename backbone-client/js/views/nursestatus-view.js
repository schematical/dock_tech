var NurseStatusView = Backbone.View.extend(
{
  template: Mustache.compile ($("#nurseStatusTemplate").html()),


  render: function()
  {
    var view = this.template(this.model.for_template());
    this.$el.html(view);
    return this;
  },
}); 
