var Nurse = Backbone.Model.extend(
{
  for_template: function() {
    var j = this.toJSON();
    j.shift = this.get('shift').toJSON();
    j.time = new Date().toLocaleString();
    return j;
  }
});

/* Schema:

  BadgeID  int
  Name     str
  ShiftID  int
  Patients []

*/

/* Collection */
var NurseCollection = Backbone.Collection.extend(
{
  model: Nurse,
  localStorage: new Backbone.LocalStorage("Nurses"),
});
