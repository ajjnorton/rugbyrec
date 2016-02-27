var ctrl = angular.module('dashboard.contollers', [])





/** ------------------------------------------------------
 *   Controller : ProjectAdminCtrl
 *   viewURL : /dashboard
 *   TemplateURL : views/project_admin.html
 *   Controller for the project admin view inside the admin page
 */
ctrl.controller('dashboardCtrl', function($scope, $firebaseArray) {
    console.log("desktop Active");




    var ref = new Firebase("https://rugbyrec-app.firebaseio.com");
    $scope.pictures = $firebaseArray(ref);




    $scope.pictures.$loaded()
        .then(function() {
            $scope.numberOfPics = $scope.pictures.length;
        })
        .catch(function(err) {
            console.error(err);
        });

    $scope.pictures.$watch(function(event) {
        $scope.numberOfPics = $scope.pictures.length;
    });




});
