var ApplicationRouter = Backbone.Router.extend(
{
    routes:
    {
        /* Default */ "" : "rootView",

        "login" : "loginScreen",

        "disposables"     : "disposableList",
        "disposables/:id" : "disposableDetails",

        "patients"     : "patientList",
        "patients/:id" : "patientDetails",

        "scanner"      : "scannerScreen",
        "metrics"      : "metricsScreen"
    },

    /* Named routes here like rails _urls which would maintain appState */

    /* Root */
    rootView: function()
    {
      /* TODO move away from triggering, router should be handled once
         per the marionette guys */
      this.navigate("login", {trigger: true});
    },


    /* Login */
    loginScreen: function()
    {
      /* TODO if logged in, redirect */

      var loginView = new LoginView ( );
      $('body').removeClass();
      $('body').addClass('checkmate-content');
      $('#content').html(loginView.render().el);
    },


    /* Patients */

    patientList: function()
    {
      var patientCollectionView = new PatientCollectionView({collection: application.patients});

      $('#content').html(patientCollectionView.render().el);
    },



    /* Disposables */
    disposableDetails: function(id)
    {
      var disposable = window.application.disposables.first();
      var disposableView = new DisposableView({model: disposable}); 
      $('#content').html(disposableView.render().el);
    },


    disposableList: function()
    {
      var disposableCollectionView = new DisposableCollectionView({collection: application.disposables});

      $('body').removeClass();
      $('body').addClass('checkmate-list-content');
      $('body').addClass('checkmate-scanner-content');
      $('#content').html(disposableCollectionView.render().el);

      var nurse = window.application.active_nurse;
      var nurseStatusView = new NurseStatusView({model: nurse});

      $('#content').append(nurseStatusView.render().el);
    },


    scannerScreen: function()
    {
      var scannerView = new ScannerView ( );

      $('body').removeClass();
      $('body').addClass('checkmate-list-content');
      $('body').addClass('checkmate-scanner-content');
      $('#content').html(scannerView.render().el);

      var nurse = window.application.active_nurse;
      var nurseStatusView = new NurseStatusView({model: nurse});

      $('#content').append(nurseStatusView.render().el);
    },


    metricsScreen: function()
    {
      var metricsView = new MetricsView ( );

      $('body').removeClass();
      $('body').addClass('checkmate-list-content');
      $('body').addClass('checkmate-scanner-content');
      $('#content').html(metricsView.render().el);

      var nurse = window.application.active_nurse;
      var nurseStatusView = new NurseStatusView({model: nurse});

      $('#content').append(nurseStatusView.render().el);
    },


});
