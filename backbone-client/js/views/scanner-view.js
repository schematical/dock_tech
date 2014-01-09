var ScannerView = Backbone.View.extend(
{
  template: Mustache.compile ($("#scannerViewTemplate").html()),
  className: 'full-height', 

  scannedNurse: null,
  scannedDisposable: null,
  scannedPatient: null,


  /* TODO move to sidebar logic */
  events:
  {
    "click .showScanner"    : "show_scanner",
    "click .showDisposables": "show_disposables",
    "click .showMetrics"    : "show_metrics",

    "click .patient-scanned": "scan_barcode",
    "click .nurse-scanned"  : "scan_barcode",
    "click .device-scanned" : "scan_barcode",
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

  
  /* Cordova Scanner */
  scan_barcode: function()
  {
      console.log('[ CLICK SCAN ]');

      var self = this;
      window.scanner.scan(
          function(result) {
              if (result.cancelled) { console.log("the user cancelled the scan"); }
              else
              {
                console.log("we got a barcode: " + result.text);
                self.find_patient (result.text);
                self.find_nurse   (result.text);
                self.find_device  (result.text);
              }
          },
          function(error) { console.log("scanning failed: " + error); }
      );
  },

  /* Scanner callbacks */
  find_patient: function(barcode_value)
  {
    var patient = window.application.patients.findWhere ({patient_id: barcode_value});
    if(patient)
    {
      console.log("found patient")
      this.patient = patient; 
      this.after_find();
    }
  },

  find_nurse: function(barcode_value)
  {
    var nurse = window.application.nurses.findWhere ({nurse_id: barcode_value});
    if(nurse)
    {
      console.log("found nurse")
      this.nurse = nurse;
      this.after_find();
    }
  },

  find_device: function(barcode_value)
  {
    var device = window.application.disposables.findWhere ({device_id: barcode_value});
    if(device)
    {
      /* TODO go to show page */
      window.router.navigate("disposables", {trigger: true}); 
    }
    else
    {
      if(barcode_value.charAt(0) === "3")
      {
        /* TODO read value to determine type */
        this.device = new Disposable({device_id: barcode_value, type: "IV", duration: 96, timer_location: "Arm"});
        this.after_find();
      }
    }
  },


  after_find: function()
  {

    /* if all 3, link them, add device to collection and go */
    if(this.nurse && this.patient && this.device)
    {
      this.device.set("patient", this.patient);
      window.application.disposables.add(this.device);

      window.router.navigate("disposables", {trigger: true});
    }
    else
    {
      this.render();
    }

  },


  render: function()
  {
    /* JSON structure for view */
    var scanner_json = {
      patient_scanned: "",
      patient_name: "Scan Patient",
      patient_info: "",

      nurse_scanned: "",
      nurse_name: "Scan Nurse",
      nurse_info: "",

      device_scanned: "",
      device_name: "Scan Device",
      device_info: "",
    };


    if(this.nurse)
    {
      scanner_json.nurse_scanned = "active";
      scanner_json.nurse_name = this.nurse.get("name");
      scanner_json.nurse_info = "Badge: "+this.nurse.get("nurse_id");
    }

    if(this.device)
    {
      scanner_json.device_scanned = "active";
      scanner_json.device_name = this.device.get("type") + " - " + this.device.get("timer_location");
      scanner_json.device_info = this.device.get("duration")+" hr";
    }

    if(this.patient)
    {
      scanner_json.patient_scanned = "active";
      scanner_json.patient_name = this.patient.get("name");
      scanner_json.patient_info = "Age: "+this.patient.get("age");
    }


    var view = this.template (scanner_json);
    this.$el.html(view);
    return this;
  },
});
