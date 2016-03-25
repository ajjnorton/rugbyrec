var ctrl = angular.module('add_image.controllers', [])
'use strict';
/** 
 * controllers for Angular File Upload
 */
ctrl.controller('UploadCtrl', ['$scope', 'FileUploader', '$firebaseArray', 'toaster',
    function($scope, FileUploader, $firebaseArray, toaster) {


        $scope.pop = function() {
            toaster.pop('success', "Thank you", '<h6 style="color:#fff;">Data loaded</h6>', 2000, 'trustedHtml');
        };

        var ref = new Firebase('https://rugbyrec-app.firebaseio.com');
        var list = $firebaseArray(ref);

       

      
            
        //toaster.pop('wait', "Please wait ..", "Loading data");
        toaster.pop('wait', "Please wait", '<h6 style="color:#fff;">Loading data</h6>', -1, 'trustedHtml');
    


        list.$loaded()
            .then(function(data) {
                $scope.rugbyPhotos = data;
                console.log($scope.rugbyPhotos);
                $scope.loaded = true;
               
               toaster.clear();
               $scope.pop();

            })
            .catch(function(error) {
                console.log("Error:", error);
            });





        var uploaderImages = $scope.uploaderImages = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploaderImages.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploaderImages.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploaderImages.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploaderImages.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploaderImages.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploaderImages.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploaderImages.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploaderImages.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploaderImages.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploaderImages.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploaderImages.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploaderImages.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploaderImages);
    }
]);
ctrl.controller('UploadCtrl2', ['$scope', 'FileUploader',
    function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }
]);
