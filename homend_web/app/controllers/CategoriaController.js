backendApp

.controller("CategoriaController", function($scope, API, $window, $mdDialog) {


    
    $scope.d_list = [];
    $scope.page=1;
    $scope.categoria={};

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
        API.Categoria.list({page:page, query:$scope.query}).$promise.then(function(r) {
            $scope.d_list = r.results;
            $scope.options = r.options;
        }, function(error) {
            console.log("Errorum  " + error.detail);
        });
    };
    $scope.list($scope.page);

    $scope.listAll = function(page, page_size) {
        API.Categoria.list({page:page, query:$scope.query, page_size:page_size}).$promise.then(function(r) {
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
        $scope.categoria.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Categoria/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.categoria={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.categoria = API.Categoria.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Categoria/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.categoria={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.categoria.id) {
            API.Categoria.update({ id: $scope.categoria.id }, $scope.categoria).$promise.then(function(r) {
                console.log(r);
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Categoria.save($scope.categoria).$promise.then(function(r) {
                console.log(r);
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        }
    };
    
    $scope.delete = function(d){
        if ($window.confirm('Confirm delete')) {
            API.Categoria.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                $scope.list($scope.page);
            }, function (error) {
                console.log(error);
            });
        }
    };

});