from django.conf.urls import patterns, include, url
from rest_framework import routers
from .views.NaturalPersonView import NaturalPersonViewSet
from .views.ClienteView import ClienteViewSet
from .views.UsuarioView import UsuarioViewSet
from .views.CategoriaView import CategoriaViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

router.register(r'categorias', CategoriaViewSet)

router.register(r'clientes', ClienteViewSet)

router.register(r'usuarios', UsuarioViewSet)

router.register(r'naturalpersons', NaturalPersonViewSet)


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),

)
