(function() {

    var app = angular.module('rugbyrec', [
        'ui.router',
        'catalogue.contollers',
        'add_image.controllers',
        'firebase',
        'xeditable',
        'angularFileUpload',
        'ui.bootstrap',
        'angular.filter'

    ])

    app.config(function($stateProvider, $urlRouterProvider) {

        // any unm  atched url, redirect to
        $urlRouterProvider.otherwise('/dashboard');


        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/view/dashboard.html'
            })
            .state('catalogue', {
                url: '/catalogue',
                templateUrl: 'modules/catalogue/view/catalogue.html',
                controller: 'catalogueCtrl'
            })
            .state('add_image', {
                url: '/add_image',
                templateUrl: 'modules/add_image/view/add_image.html',
                controller: 'add_imageCtrl'
            })


    })

})();
