/* Individual */
var ApplicationView = Backbone.View.extend(
{
     patients: new PatientCollection    ( ),
       nurses: new NurseCollection      ( ),
  disposables: new DisposableCollection ( ),
       shifts: new ShiftCollection      ( ),

  initialize: function()
  {
      this.disposables.comparator = function(chapter) {
        return chapter.get("duration");
      };

      this.patients.add (new Patient ({patient_id: "1001", name: "Sarah D.",  age: 24, room: "100E"}));
      this.patients.add (new Patient ({patient_id: "1002", name: "Kevin A.",  age: 42, room: "21"}));
      this.patients.add (new Patient ({patient_id: "1003", name: "Joe B.",    age: 20, room: "410"}));
      this.patients.add (new Patient ({patient_id: "1004", name: "Hollis",    age: 27, room: "104"}));
      this.patients.add (new Patient ({patient_id: "1005", name: "Sweeny T.", age: 46, room: "290F"}));
      this.patients.add (new Patient ({patient_id: "1006", name: "Monty B.",  age: 98, room: "111"}));
      var patients = this.patients.toArray();

      var first_shift  = new Shift ({start: new Date(), end: new Date(), name: 'First'});
      var second_shift = new Shift ({start: new Date(), end: new Date(), name: 'Second'});
      var full_shift   = new Shift ({start: new Date(), end: new Date(), name: '24 Hour'});
    
      this.shifts.add   (first_shift);
      this.shifts.add   (second_shift);
      this.shifts.add   (full_shift);

      this.nurses.add   (new Nurse ({nurse_id: "2001", name: "Joy",    password: "12345", shift: first_shift,  patients: [patients[0], patients[1], patients[2]] }));
      this.nurses.add   (new Nurse ({nurse_id: "2002", name: "Coonie", password: "12345", shift: second_shift, patients: [patients[0], patients[3]] }));
      this.nurses.add   (new Nurse ({nurse_id: "2003", name: "Eli",    password: "12345", shift: full_shift,   patients: patients }));

      this.disposables.add (new Disposable ({device_id: "3001", duration: 76, type: "CVC", recurring: true, timer_location: "Arm", patient: patients[0], start: new Date(), end: new Date()}));
      this.disposables.add (new Disposable ({device_id: "3002", duration: 32, type: "Drain", recurring: false, timer_location: "Neck", patient: patients[0], start: new Date(), end: new Date()}));
      this.disposables.add (new Disposable ({device_id: "3003", duration: 96, type: "PICC", recurring: false, timer_location: "Arm", patient: patients[1], start: new Date(), end: new Date()}));
      this.disposables.add (new Disposable ({device_id: "3004", duration: 24, type: "Bandage", recurring: false, timer_location: "Leg", patient: patients[2], start: new Date(), end: new Date()}));
      this.disposables.add (new Disposable ({device_id: "3005", duration: 12, type: "IV", recurring: false, timer_location: "Foot", patient: patients[3], start: new Date(), end: new Date()}));
      this.disposables.add (new Disposable ({device_id: "3006", duration: 36, type: "Drain", recurring: false, timer_location: "Arm", patient: patients[3], start: new Date(), end: new Date()}));
      this.disposables.add (new Disposable ({device_id: "3007", duration: 48, type: "PICC", recurring: false, timer_location: "Arm", patient: patients[1], start: new Date(), end: new Date()}));
  }
}); 
