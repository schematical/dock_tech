var MetricsView = Backbone.View.extend(
{
  template: Mustache.compile ($("#metricsViewTemplate").html()),
  className: 'metricsContainer', 


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


  render: function()
  {
    var view = this.template ( );
    this.$el.html(view);
    return this;
  },
});
