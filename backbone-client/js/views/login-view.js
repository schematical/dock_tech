var LoginView = Backbone.View.extend(
{
  template: Mustache.compile ($("#loginViewTemplate").html()),


  render: function()
  {
    var view = this.template ( );
    this.$el.html(view);
    return this;
  },


  events:
  {
    "click .login": "authenticate_nurse",
  },


  /* Event Handlers */
  authenticate_nurse: function()
  {
    var name     = this.$("#username").val();
    var password = this.$("#password").val();

    var nurse = window.application.nurses.findWhere({name: name, password: password});

    if (nurse)
    {
      window.application.active_nurse = nurse;
      window.router.navigate("disposables", {trigger: true}); 
    }
    else
    {
      this.$(".alert").removeClass("alert-hidden");
    }
  },
}); 
