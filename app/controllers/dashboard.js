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
    console.log($scope.pictures);

    /*

    $scope.pictures.$loaded()
        .then(function() {
            angular.forEach($scope.pictures, function(value, key) {
                console.log(value.$id);
                var item = $scope.pictures.$getRecord(value.$id);
                item.id = Number(value.id);
                $scope.pictures.$save(item).then(function() {
                    // data has been saved to our database
                });

            });
        })
        .catch(function(err) {
            console.error(err);
        });
        */





});
