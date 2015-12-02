backendApp
//------------------------------
// TODO: API menu
// por lo pronto colocar aqui el menu para su Modelo, vease test1
//------------------------------
.factory("menuService", [
  '$location',
  '$rootScope',
  '$http',
  '$window',
  function($location, $rootScope, $http, $window) {

    var version = {};

    var sections = [
    {
      name: 'Homend',
      state: 'Homend',
      url: '/Homend',
      type: 'link'
    }

    ];
    
    sections.push({   
        name: 'RESIDENCIA',
        type: 'toggle',
        pages: [
        {
          name : 'Residencia',
          state: '#',
          url: '/#',
          type: 'link'
        }]
    });

    sections.push({
        name: 'SERVICIOS',
        type: 'toggle',
        pages: [
        {
          name : 'SERVICIO',
          state: '#',
          url: '/#',
          type: 'link'
        },
        {
          name : 'SERVICIO ADICIONAL',
          state: '#',
          url: '/#',
          type: 'link'
        },
        {
          name : 'SERVICIO OPCIONAL',
          state: '#',
          url: '/#',
          type: 'link'
        }]
    });

    sections.push({   
        name: 'CLIENTE',
        type: 'toggle',
        pages: [
        {
          name : 'Cliente',
          state: 'Cliente',
          url: '/Cliente',
          type: 'link'
        },
        {
          name : 'Usuario',
          state: 'Usuario',
          url: '/Usuario',
          type: 'link'
        },
        {
          name : 'Categoria',
          state: 'Categoria',
          url: '/Categoria',
          type: 'link'
        }]
    });

    sections.push({   
        name: 'CONTRATO',
        type: 'toggle',
        pages: [
        {
          name : 'Contrato',
          state: '#',
          url: '/#',
          type: 'link'
        },
        {
          name : 'Tipo de Pago',
          state: '#',
          url: '/#',
          type: 'link'
        }]
    });

    sections.push({   
        name: 'ESTADO DE CUENTA',
        type: 'toggle',
        pages: [
        {
          name : 'Consumo',
          state: '#',
          url: '/#',
          type: 'link'
        },
        {
          name : 'Comprobante',
          state: '#',
          url: '/#',
          type: 'link'
        }]
    });


    function sortByName(a,b) {
      return a.name < b.name ? -1 : 1;
    }

    var self;

    $rootScope.$on('$locationChangeSuccess', onLocationChange);



    return self = {
      version   :  version,
      sections  : sections,

      selectSection: function(section) {
        self.openedSection = section;
      },
      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function(section) {
        return self.openedSection === section;
      },

      selectPage: function(section, page) {
        self.currentSection = section;
        self.currentPage = page;
      },
      isPageSelected: function(page) {
        return self.currentPage === page;
      }
    };

    function sortByHumanName(a,b) {
      return (a.humanName < b.humanName) ? -1 :
      (a.humanName > b.humanName) ? 1 : 0;
    }

    function onLocationChange() {
      var path = $location.path();
      var introLink = {
        name: "Introduction",
        url:  "/",
        type: "link"
      };

      if (path == '/') {
        self.selectSection(introLink);
        self.selectPage(introLink, introLink);
        return;
      }

      var matchPage = function(section, page) {
        if (path === page.url) {
          self.selectSection(section);
          self.selectPage(section, page);
        }
      };

      sections.forEach(function(section) {
        if(section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if(section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });
    }
  }]);