(function() {

    var app = angular.module('rugbyrec', [
        'ui.router',
        'dashboard.contollers',
        'firebase'
        ])

    app.config(function($stateProvider, $urlRouterProvider) {

        // any unm  atched url, redirect to
        $urlRouterProvider.otherwise('/dashboard');


        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            })





    })
})();
