var Shift = Backbone.Model.extend();


/* Schema:

  Start datetime
  End   datetime

*/

/* Collection */
var ShiftCollection = Backbone.Collection.extend(
{
  model: Shift,
  localStorage: new Backbone.LocalStorage("Shifts"),
});

