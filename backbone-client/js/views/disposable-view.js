/* Collection Partial */
var DisposablePartialView = Backbone.View.extend(
{
  template: Mustache.compile ($("#disposablePartialTemplate").html()),
  tagName: "tr",


  render: function()
  {
    var view = this.template(this.model.for_template());
    this.$el.html(view);
    return this;
  },


  events:
  {
    "click .showDisposable": "get_disposable",
  },


  /* Event Handlers */
  get_disposable: function()
  {
    window.router.navigate("disposables/"+this.model.get('device_id'), {trigger: true});
  },

  /* TODO monitor change and update div */
}); 



/* Collection */
var DisposableCollectionView = Backbone.View.extend(
{
  template: Mustache.compile ($("#disposableCollectionTemplate").html()),


  /* TODO move to sidebar logic */
  events:
  {
    "click .showScanner"    : "show_scanner",
    "click .showDisposables": "show_disposables",
    "click .showMetrics"    : "show_metrics",
  },


  show_scanner: function()
  {
    window.router.navigate("scanner", {trigger: true});
  },

  show_disposables: function()
  {
    window.router.navigate("disposables", {trigger: true});
  },

  show_metrics: function()
  {
    window.router.navigate("metrics", {trigger: true});
  },


  initialize: function()
  {
    var self = this; /* Scope in the closure */

    this.listenTo(this.collection, "add", function (disposable) {
      /* Not DRY */
      self.$('.disposableCollection').append(new DisposablePartialView({model:disposable}).render().el);
      ;
    });
  },


  render: function()
  {
    /* Container for list */
    this.$el.html(this.template());

    /* Reference class inside partial.. TODO find better way for this */
    _.each(this.collection.models, function (disposable) {
      this.$('.disposableCollection').append(new DisposablePartialView({model:disposable}).render().el);
    }, this);

    return this;
  },

  /* TODO Watch collection members for add/removal */
});



/* Show */
var DisposableView = Backbone.View.extend(
{
  template: Mustache.compile ($("#disposableTemplate").html()),


  render: function()
  {
    var view = this.template(this.model.toJSON());
    this.$el.html(view);
    return this;
  },
}); 

