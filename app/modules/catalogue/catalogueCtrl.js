var ctrl = angular.module('catalogue.contollers', [])





/** ------------------------------------------------------
 *   Controller : ProjectAdminCtrl
 *   viewURL : /dashboard
 *   TemplateURL : views/project_admin.html
 *   Controller for the project admin view inside the admin page
 */
ctrl.controller('catalogueCtrl', function($scope, $firebaseArray, toaster) {
    console.log("catalogue Active");

    $scope.pop = function() {
        toaster.pop('success', "Thank you", '<h6 style="color:#fff;">Rendering images</h6>', 15000, 'trustedHtml');
    };


    var ref = new Firebase("https://rugbyrec-app.firebaseio.com");
    pictures = $firebaseArray(ref);
    $scope.pictures = pictures;

    toaster.pop('note', "Please wait", '<h6 style="color:#fff;">Loading data</h6>', -1, 'trustedHtml');


    $scope.pictures.$loaded()
        .then(function() {
            $scope.pictures.reverse();
            $scope.numberOfPics = $scope.pictures.length;
            toaster.clear();
            $scope.pop();

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


    $scope.updatePicture = function(picture) {

        var item = pictures.$getRecord(picture.$id);
        item.player = picture.player;
        item.caption = picture.caption;

        pictures.$save(item).then(function() {
            //data has been saved to our database
        });
    };

    $scope.addPictures = function() {

        console.log("addd pics");
    };



});
