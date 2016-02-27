var ctrl = angular.module('dashboard.contollers', [])





/** ------------------------------------------------------
 *   Controller : ProjectAdminCtrl
 *   viewURL : /dashboard
 *   TemplateURL : views/project_admin.html
 *   Controller for the project admin view inside the admin page
 */
ctrl.controller('dashboardCtrl', function($scope) {
    console.log("desktop Active");
    var myimages =[
      {"link":"assets/images/back13.png","title":"BMW X5 Insurance","message":"Insurance expires 598116 Ababian Insurance Policy No WS-D23S345. Ring Khalifa on 1-408-555-5555"},
      {"link":"assets/images/qatardrive.png","title":"Qatar Driving Licence","message":"TIme to renew Qatar driving licence"},
      {"link":"assets/images/back10.jpg","title":"BMW X5 Insurance","message":"Insurance expires 598116 Ababian Insurance Policy No WS-D23S345. Ring Khalifa on 1-408-555-5555"},
      {"link":"assets/images/hmrc.png","title":"Tax Return","message":"Time to do your end of year tax return"},
      {"link":"assets/images/qatarid.png","title":"Qatar ID","message":"Time to renew your Qatar ID"},
      {"link":"assets/images/back2.png","title":"Hello","message":"Insurance expires 598116 Ababian Insurance Policy No WS-D23S345. Ring Khalifa on 1-408-555-5555"},
      {"link":"assets/images/house.png","title":"The Stables House insurance","message":"House insurance runs out"},
      {"link":"assets/images/passport.png","title":"UK Passport","message":"Time to renew the passport"},
      {"link":"assets/images/visa.png","title":"Qatar Visa Renewal","message":"Qatar visa runs out"}
    ];
    $scope.myimages=myimages;
    $scope.test="hello";
    console.log($scope.myimages);

});













