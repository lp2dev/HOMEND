backendApp
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

.run(
    ['$rootScope', '$state', '$stateParams','authService','$location','$window',
      function ( $rootScope,   $state,   $stateParams, authService,$location, $window) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;     
        /*******************************agregado**************************/
        authService.fillAuthData(); 
        if(authService.authentication.isAuth==false){
            //$window.location="../homend_accounts";
        }       
        /******************************************************************/
      }
    ]
  )


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,   $urlRouterProvider) {
  $stateProvider

    //------------------------------
    // LOGIN
    //------------------------------
    .state('login', {
      url: '/login',
      templateUrl: 'login/index.html'
    })


    //------------------------------
    // HOME
    //------------------------------
    .state('app', {
      url: '/',
      templateUrl: 'app/views/home.tmpl.html'
    })

    //------------------------------
    // test1
    //------------------------------
    .state('test1', {
      url: '/CSS/test1',
      templateUrl: 'app/views/test.html'
    })
    //------------------------------
    // test2
    //------------------------------
    .state('test2', {
      url: '/CSS/test2',
      templateUrl: 'app/views/test2.html',
      resolve: {
        loadPlugin: function($ocLazyLoad) {
          return $ocLazyLoad.load ([
          {
            name: 'app',
            files: [
            'app/loadpost.js',
            
            ]
          }
          ]);
        }
      },
    })
    //------------------------------
    // inicio page http://plnkr.co/edit/u18KQc?p=preview
    //------------------------------
    .state('Homend', {
      url: '/Homend',
      templateUrl: 'app/views/Homend.html'
    })

    //==================================
    // test1 /app/test1x
    //==================================
    
    .state('test1x', {
      url: '/test1x',
      data : { title: '-tes 1xx' },
      templateUrl: 'app/views/test.html'
    });


    $stateProvider
    //------------------------------
    // Residencia
    //------------------------------
    /**.state('Residencia', {
      url: '/#',
      templateUrl: '#'
    })
    //------------------------------
    // Servicio
    //------------------------------
    .state('Servicio', {
      url: '/#',
      templateUrl: '#'
    })
    ;
    //------------------------------
    // ServicioAd
    //------------------------------
    .state('ServicioAd', {
      url: '/#',
      templateUrl: '#'
    })
    ;
    //------------------------------
    // ServicioOp
    //------------------------------
    .state('ServicioOp', {
      url: '/#',
      templateUrl: '#'
    })
    ;**/
    //------------------------------
    // Cliente
    //------------------------------
    .state('Cliente', {
      url: '/Cliente',
      templateUrl: 'app/views/Cliente/index.html'
    })
    
    //------------------------------
    // Usuario
    //------------------------------
    .state('Usuario', {
      url: '/Usuario',
      templateUrl: 'app/views/Usuario/index.html'
    })
    
    //------------------------------
    // Categoria
    //------------------------------
    .state('Categoria', {
      url: '/Categoria',
      templateUrl: 'app/views/Categoria/index.html'
    })
    ;
    /**
    //------------------------------
    // Contrato
    //------------------------------
    .state('Contrato', {
      url: '/#',
      templateUrl: '#'
    })
    ;
    //------------------------------
    // TipoPago
    //------------------------------
    .state('TipoPago', {
      url: '/#',
      templateUrl: '#'
    })
    ;
    //------------------------------
    // Consumo
    //------------------------------
    .state('Consumo', {
      url: '/#',
      templateUrl: '#'
    })
    ;
    //------------------------------
    // Comprobante
    //------------------------------
    .state('Comprobante', {
      url: '/#',
      templateUrl: '#'
    })
    ;**/



    $urlRouterProvider.otherwise('/');


  }]);


