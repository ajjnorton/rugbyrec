var app = angular.module('rugbyrec', ['firebase', 'angular.filter', 'ui.bootstrap', 'angularFileUpload']);



app.controller('tempController', ["$scope", "$http", "$firebaseArray", "FileUploader", function($scope, $http, $firebaseArray, FileUploader) {
    /*$scope.message="controller";
    console.log("controller");
    $scope.users = userService.method1();
    console.log($scope.users);
    $scope.users = userService.method2("hello");
    console.log($scope.users);
    */
    console.log("tempController");

    $http.get('json/data.json').success(function(data) {
        console.log("success!");
        $scope.jsonData = data;
        //console.log($scope.jsonData);
        jsonToFirebase();
    });


    var _selected1;
    $scope.selected1 = undefined;

    var _selected2;
    $scope.selected2 = undefined;



    var ref = new Firebase('https://rugbyrec-app.firebaseio.com');
    var list = $firebaseArray(ref);


    list.$loaded()
        .then(function(data) {
            $scope.rugbyPhotos = data;
            console.log($scope.rugbyPhotos);
            $scope.loaded = true;
        })
        .catch(function(error) {
            console.log("Error:", error);
        });


    var jsonToFirebase = function() {
        var ref = new Firebase('https://rugbyrec-app.firebaseio.com');
        var list = $firebaseArray(ref);


        angular.forEach($scope.jsonData, function(value, key) {
            list.$add(value).then(function(ref) {
                var id = ref.key();
                console.log("added record with id " + id);
                //list.$indexFor(id); // returns location in the array
            });
        });
    }




    var uploader = $scope.uploader = new FileUploader({
        url: 'php/image_upload.php',
        autoUpload: true,
        removeAfterUpload: true
    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        //console.info('onAfterAddingFile', fileItem);
        $scope.msg_startLoad = true;
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
        //uploader.uploadAll();
        $scope.hide_onStartUpload = true;
        $scope.msg_uploadComplete = false;
    };
    uploader.onBeforeUploadItem = function(item) {
        //console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        //console.info('onProgressAll', progress);

    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
        //
        //$scope.loadImageDataToUser(response);
        //$scope.loadImageDataToPortfolio(response);
        //for each image uploaded save the file path under the current users id and
        // also in the portfolio area. The website needs to see all the imabes but the user in the admin section
        // should only see his / her own image
        // Step 1 - get the image into the portfilio area
        // Step 2 - get the image also under the users ID
        // Step 3 - ensure that any changes to the data in one area is also reflected in the other.
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function(fileItem, response, status, headers) {
        //console.info('onCompleteItem', fileItem, response, status, headers);
        $scope.msg_startLoad = false;
        $scope.msg_uploadComplete = true;


    };


    // save a new image to an individuals portfolio
    $scope.loadImageDataToUser = function(response) {

        $scope.image = {};

        $log.info("User ID : " + $rootScope.uid);
        $log.info("Load image data to firebase : " + response.filename);

        // -- Push filedata to firebase
        var ref = new Firebase('https://portfolio1.firebaseio.com/users/' + $rootScope.uid + '/images');


        var pictures = $firebaseArray(ref);

        $scope.image.dateAdded = Firebase.ServerValue.TIMESTAMP;
        $scope.image.filename = response.filename;
        $scope.image.websiteDisplayToggle = false;
        $scope.image.title = "Add title";
        pictures.$add($scope.image).then(function(ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            $scope.loadImageDataToPortfolio(id, response.filename);
            pictures.$indexFor(id); // returns location in the array
        });

    };

    // save a new image to the group portfolio
    $scope.loadImageDataToPortfolio = function(picture_id, filename) {

        $scope.portfolioImage = {};


        // -- Push filedata to firebase
        var ref3 = new Firebase('https://portfolio1.firebaseio.com/groupPortfolio/' + picture_id);
        var portfolio = $firebaseObject(ref3);

        $scope.portfolioImage.dateAdded = Firebase.ServerValue.TIMESTAMP;
        $scope.portfolioImage.filename = filename;
        $scope.portfolioImage.title = "Add title";
        $scope.portfolioImage.Author = $rootScope.name;
        $scope.portfolioImage.uid = $rootScope.uid;

        ref3.set($scope.portfolioImage);



    };





}]);


app.controller('galleryController', ["$scope", "$http", "$firebaseArray", "$firebaseObject", function($scope, $http, $firebaseArray, $firebaseObject) {

    console.log("Gallery Controller");




    var ref = new Firebase('https://rugbyrec-app.firebaseio.com');
    var list = $firebaseArray(ref);


    list.$loaded()
        .then(function(data) {
            $scope.pictures = data;
            //console.log($scope.pictures);
            $scope.loaded = true;
            //$scope.processUrls();
        })
        .catch(function(error) {
            console.log("Error:", error);
        });




    $scope.processUrls = function(id) {

        console.log("XX Process URLs XX");
        angular.forEach($scope.pictures, function(value, key) {
            var ref = new Firebase('https://rugbyrec-app.firebaseio.com/' + value.$id);
            //console.log(value.$id);
            //console.log(value.filePath);
            var filename = value.filePath.split('/').pop()
            //console.log(filename);

            var obj = $firebaseObject(ref);

            obj.imgPath = filename;
            obj.caption = value.caption;
            obj.comments = value.comments;
            obj.id = value.id;
            obj.player = value.player;
            obj.$save(value).then(function(ref) {
                ref.key() === obj.$id; // true
            }, function(error) {
                console.log("Error:", error);
            });

        })


    };





}]);
