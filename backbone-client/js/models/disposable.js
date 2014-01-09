var Disposable = Backbone.Model.extend(
{
  for_template: function() {
    var j = this.toJSON();
    j.patient = this.get('patient').toJSON();
    return j;
  }
}
);

/* Schema:

  Duration (Hours) int
  Type             str
  ID               int
  Recurring        bool
  Notes            str
  Location (Body)  str
  PatientID        int
  StartTime        datetime
  EndTime          datetime

*/

/* Collection */
var DisposableCollection = Backbone.Collection.extend(
{
  model: Disposable,
  localStorage: new Backbone.LocalStorage("Disposables"),
});
