var ctrl = angular.module('dashboard.contollers', [])





/** ------------------------------------------------------
 *   Controller : ProjectAdminCtrl
 *   viewURL : /dashboard
 *   TemplateURL : views/project_admin.html
 *   Controller for the project admin view inside the admin page
 */
ctrl.controller('dashboardCtrl', function($scope, $firebaseArray, Lightbox) {
    console.log("desktop Active");

    $scope.spinner = true;


    var ref = new Firebase("https://rugbyrec-app.firebaseio.com");
    $scope.pictures = $firebaseArray(ref);




    $scope.pictures.$loaded()
        .then(function() {
            $scope.pictures.reverse();
            $scope.numberOfPics = $scope.pictures.length;
            $scope.spinner = false;
        })
        .catch(function(err) {
            console.error(err);
        });

    $scope.pictures.$watch(function(event) {
        $scope.numberOfPics = $scope.pictures.length;
    });


    $scope.openLightboxModal = function(index) {
        Lightbox.openModal($scope.pictures, index);
        //console.log(index);
        //console.log($scope.pictures);
    };


});
