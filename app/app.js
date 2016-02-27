(function() {

    var app = angular.module('xpatcloud', ['ui.router','wu.masonry','xp.contollers'])

    app.config(function($stateProvider, $urlRouterProvider) {

        // any unm  atched url, redirect to
        $urlRouterProvider.otherwise('/dashboard');


        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'xp.desktop'
            })





    })
})();
