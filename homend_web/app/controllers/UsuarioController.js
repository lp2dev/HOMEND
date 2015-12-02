backendApp

.controller("UsuarioController", function($scope, API, $window, $mdDialog) {

    API.Cliente.list({}).$promise.then(function(r) {
            $scope.cliente_nombre_list = r.results;
        }, function(error) {
            console.log("Errorum  " + error);
        });

    API.Categoria.list({}).$promise.then(function(r) {
            $scope.categoria_nombre_list = r.results;
        }, function(error) {
            console.log("Errorum  " + error);
        });

    $scope.d_list = [];
    $scope.page=1;
    $scope.usuario={};

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
        API.Usuario.list({page:page, query:$scope.query}).$promise.then(function(r) {
            $scope.d_list = r.results;
            $scope.options = r.options;
        }, function(error) {
            console.log("Errorum  " + error.detail);
        });
    };
    $scope.list($scope.page);

    $scope.listAll = function(page, page_size) {
        API.Usuario.list({page:page, query:$scope.query, page_size:page_size}).$promise.then(function(r) {
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
        $scope.usuario.id=null;
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Usuario/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.usuario={};
        }, function(){
        });
    };

    $scope.get = function(d) {
        $scope.usuario = API.Usuario.get({id : d.id});
        $mdDialog.show({
            scope: $scope.$new(),
            templateUrl: 'app/views/Usuario/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
        }).then(function(){
            $scope.list($scope.page);
            $scope.usuario={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.usuario.id) {
            API.Usuario.update({ id: $scope.usuario.id }, $scope.usuario).$promise.then(function(r) {
                console.log(r);
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        } else {
            API.Usuario.save($scope.usuario).$promise.then(function(r) {
                console.log(r);
                $mdDialog.hide();
            }, function(error) {
                console.log("Error  " + error);
            });
        }
    };
    
    $scope.delete = function(d){
        if ($window.confirm('Confirm delete')) {
            API.Usuario.delete({ "id": d.id }).$promise.then(function (r) {
                console.log(r);
                $scope.list($scope.page);
            }, function (error) {
                console.log(error);
            });
        }
    };

});