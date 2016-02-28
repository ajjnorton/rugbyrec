var ctrl = angular.module('admin.controllers', [])





/** ------------------------------------------------------
 *   Controller : ProjectAdminCtrl
 *   viewURL : /dashboard
 *   TemplateURL : views/project_admin.html
 *   Controller for the project admin view inside the admin page
 */
ctrl.controller('adminCtrl', function($scope, $location) {
    console.log("Admin ctrl");

    $scope.addpic = function() {
        $location.path('/dashboard');
        
    };


});
