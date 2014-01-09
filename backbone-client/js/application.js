$(document).ready(function()
{
  window.application = new ApplicationView   ( );
  window.router      = new ApplicationRouter ( );

  /* TODO use pushState + web server handling restful urls with index.html
     ala http://stackoverflow.com/questions/7624373/preferred-way-of-creating-links-with-backbone-js/7624684#7624684
     and http://stackoverflow.com/questions/14548204/backbone-pushstate-history-not-working */
  Backbone.history.start ( );
});
