var ctrl = angular.module('add_image.controllers', [])
'use strict';
/** 
 * controllers for Angular File Upload
 */
ctrl.controller('UploadCtrl', ['$scope', 'FileUploader', '$firebaseArray', 'toaster',
    function($scope, FileUploader, $firebaseArray, toaster) {

        // clear all existing toast messages when page launches
        toaster.clear();

        $scope.pop = function() {
            toaster.pop('success', "Thank you", '<h6 style="color:#fff;">Data loaded</h6>', 2000, 'trustedHtml');
        };

        var ref = new Firebase('https://rugbyrec-app.firebaseio.com');
        var list = $firebaseArray(ref);





        // launch toaster message
        toaster.pop('wait', "Please wait", '<h6 style="color:#fff;">Loading data</h6>', -1, 'trustedHtml');


        // load list of players and matched for the typeahead
        list.$loaded()
            .then(function(data) {
                $scope.rugbyPhotos = data;
                $scope.loaded = true;
                // clear toast messages
                toaster.clear();
                // launch confirmation toaster message
                $scope.pop();

            })
            .catch(function(error) {
                console.log("Error:", error);
            });




        // Point to the PHP file that will manage the upload
        var uploaderImages = $scope.uploaderImages = new FileUploader({
            url: 'php/image_upload1.php'
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
            //console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploaderImages.onAfterAddingFile = function(fileItem) {
            //console.info('onAfterAddingFile', fileItem);
        };
        uploaderImages.onAfterAddingAll = function(addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
        };
        uploaderImages.onBeforeUploadItem = function(item) {
            //console.info('onBeforeUploadItem', item);
        };
        uploaderImages.onProgressItem = function(fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
        };
        uploaderImages.onProgressAll = function(progress) {
            //console.info('onProgressAll', progress);
        };
        uploaderImages.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploaderImages.onErrorItem = function(fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploaderImages.onCancelItem = function(fileItem, response, status, headers) {
            //console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploaderImages.onCompleteItem = function(fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploaderImages.onCompleteAll = function() {
            //console.info('onCompleteAll');
        };

        console.info('uploader', uploaderImages);
    }
]);

