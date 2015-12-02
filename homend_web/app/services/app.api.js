backendApp
.factory("API", function($resource, config ) {
    return {
        Cliente:  $resource(config.baseUrl+'configs/clientes/:id/', {'id': '@id'},
        {
            'update': { method:'PUT' },
            'list': { method:'GET', params: { page: '@page', query:'@query', page_size: '@page_size'} }
        }),

        Usuario:  $resource(config.baseUrl+'configs/usuarios/:id/', {'id': '@id'},
        {
            'update': { method:'PUT' },
            'list': { method:'GET', params: { page: '@page', query:'@query', page_size: '@page_size'} }
        }),

        Categoria:  $resource(config.baseUrl+'configs/categorias/:id/', {'id': '@id'},
        {
            'update': { method:'PUT' },
            'list': { method:'GET', params: { page: '@page', query:'@query', page_size: '@page_size'} }
        }),

    };
});
