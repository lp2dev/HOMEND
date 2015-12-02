from django.shortcuts import render
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework import permissions
from ..models.Cliente import Cliente
from ..models.Categoria import Categoria
from ..models.Usuario import Usuario

from ..utils import SetPagination
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from rest_framework.response import Response

# from .UnidadMedidaView import UnidadMedidaSerializer


# class UsuarioSerializerC(serializers.ModelSerializer):

# un_nombre = serializers.ReadOnlyField(
# source='categoria.nombre')

# class Meta:
#model = Usuario
#fields = ('url', 'abrev', 'descr')


class UsuarioSerializer(serializers.ModelSerializer):

    um_nombre = serializers.ReadOnlyField(
        source='cliente_nombre.nombre')

    class Meta:
        model = Usuario
        #fields = ('url', 'abrev', 'descr')


class UsuarioViewSet(viewsets.ModelViewSet):  # API REST
    queryset = Usuario.objects.filter()
    serializer_class = UsuarioSerializer
    pagination_class = SetPagination
    #paginate_by = 3
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        queryall = (Q(login__icontains=query),
                    Q(password__icontains=query),
                    Q(estado__icontains=query))
        queryset = self.queryset.filter(reduce(OR, queryall))
        return queryset
