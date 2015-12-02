backendApp

.controller("ClienteController", function($scope, API, $window, $mdDialog) {
    
    $scope.d_list = [];
    $scope.page=1;
    $scope.cliente={};
    $scope.url="https://www.youtube.com/";
    $scope.url1="https://www.facebook.com/";
    $scope.url2="https://www.google.com.pe/";

    $scope.printIt = function(){
       var table = document.getElementById('table').innerHTML;
       var myWindow = $window.open('', '', 'width=800, height=600');
       myWindow.document.write(table);
       myWindow.print();
    };
    
    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('table').innerHTML],{
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
    
    $scope.list = function(page) {
        API.Cliente.list({page:page, query:$scope.query}).$promise.then(function(r) {
            $scope.d_list = r.results;
            $scope.options = r.options;
        }, function(error) {
            console.log("Errorum  " + error.detail);
        });
    };
    $scope.list($scope.page);

    $scope.listAll = function(page, page_size) {
        API.Cliente.list({page:page, query:$scope.query, page_size:page_size}).$promise.then(function(r) {
            $scope.d_list = r.results;
            $scope.options = r.options;
        }, function(error) {
            console.log("Errorum  " + error.detail);
        });
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.new = function() {
        $scope.cliente.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cliente/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cliente={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.cliente = API.Cliente.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Cliente/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.cliente={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.cliente.id) {
            API.Cliente.update({ id: $scope.cliente.id }, $scope.cliente).$promise.then(function(r) {
                console.log(r);
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Cliente.save($scope.cliente).$promise.then(function(r) {
                console.log(r);
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        }
    };
    
    $scope.delete = function(d){
        if ($window.confirm('Confirm delete')) {
            API.Cliente.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                $scope.list($scope.page);
            }, function (error) {
                console.log(error);
            });
        }
    };

});