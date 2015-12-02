backendApp
.factory("API", function($resource) {
    var url = "http://localhost:8000/configs/unidadmedidas";
    return {
        UnidadMedida:  $resource(''+url+'/:id/', {'id': "@id"},
        {
            'update': { method:'PUT' },

        }),

    };

});
