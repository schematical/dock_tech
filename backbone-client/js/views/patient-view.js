/* Individual */
var PatientPartialView = Backbone.View.extend(
{
  template: Mustache.compile ($("#patientPartialTemplate").html()),


  render: function()
  {
    var view = this.template(this.model.toJSON());
    this.$el.html(view);
    return this;
  },


  events:
  {
    "click .showPatient": "get_patient",
  },


  /* Event Handlers */
  get_patient: function()
  {
    /* route there/app view state */
    console.info("switch to show for ", this.model);
  },

  /* TODO monitor change and update div */
}); 



/* Collection */
var PatientCollectionView = Backbone.View.extend(
{
  template: Mustache.compile ($("#patientCollectionTemplate").html()),


  initialize: function()
  {
    var self = this; /* Scope in the closure */

    this.listenTo(this.collection, "add", function (patient) {
      /* Not DRY */
      self.$('.patientCollection').append(new PatientPartialView({model:patient}).render().el);
      ;
    });
  },


  render: function()
  {
    /* Container for list */
    this.$el.html(this.template());

    /* Reference class inside partial.. TODO find better way for this */
    _.each(this.collection.models, function (patient) {
      this.$('.patientCollection').append(new PatientPartialView({model:patient}).render().el);
    }, this);

    return this;
  },

  /* TODO Watch collection members for add/removal */
});
