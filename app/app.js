(function() {

    var app = angular.module('rugbyrec', [
        'ui.router',
        'dashboard.contollers',
        'admin.controllers',
        'firebase',
        'xeditable',
        'bootstrapLightbox'
    ])

    app.config(function(LightboxProvider) {

        LightboxProvider.getImageUrl = function(image) {
            console.log(image);
            return '/assets/images/' + image.imgPath;
        };

        LightboxProvider.getImageCaption = function(image) {
            //return image.caption;
        };
       
    });



    app.config(function($stateProvider, $urlRouterProvider) {

        // any unm  atched url, redirect to
        $urlRouterProvider.otherwise('/addpic');


        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('addpic', {
                url: '/addpic',
                templateUrl: 'views/addpic.html'

            })





    })
})();
