/* Individual */
var Patient = Backbone.Model.extend();

/* Schema:

  ID      int
  Name    str
  age     int
  room    str
  Devices []

*/

/* Collection */
var PatientCollection = Backbone.Collection.extend(
{
  model: Patient,
  localStorage: new Backbone.LocalStorage("Patients"),
});

