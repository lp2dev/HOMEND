from django.shortcuts import render
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework import permissions
from ..models.Cliente import Cliente
from ..utils import SetPagination
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from rest_framework.response import Response
from .UsuarioView import UsuarioSerializer


class ClienteSerializer(serializers.ModelSerializer):

    usuario_set = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = Cliente
        #fields = ('url', 'abrev', 'descr')


class ClienteViewSet(viewsets.ModelViewSet):  # API REST
    queryset = Cliente.objects.filter()
    serializer_class = ClienteSerializer
    pagination_class = SetPagination
    #paginate_by = 3
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        queryall = (Q(nombre__icontains=query),
                    Q(apellidos__icontains=query),
                    Q(genero__icontains=query),
                    Q(tipodoc__icontains=query),
                    Q(numdoc__icontains=query),
                    Q(direccion__icontains=query),
                    Q(telefono__icontains=query),
                    Q(email__icontains=query))
        queryset = self.queryset.filter(reduce(OR, queryall))
        return queryset
