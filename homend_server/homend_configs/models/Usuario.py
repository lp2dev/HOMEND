from django.db import models
from .Cliente import Cliente
from .Categoria import Categoria
from ..enums import ESTADO_CHOICES, ACT


class Usuario(models.Model):

    login = models.CharField(max_length=30, null=True, blank=True)
    password = models.CharField(max_length=20)
    estado = models.BooleanField(default=True)
    cliente_nombre = models.ForeignKey(Cliente, null=True, blank=True)

    categoria = models.ManyToManyField(  # , through='ModuleGroup'
        Categoria, related_name='usuario_set', null=True, blank=True)

    estado = models.CharField(
        max_length=50, choices=ESTADO_CHOICES, default=ACT)
    #cliente = models.ManyToManyField(Cliente, null=True, blank=True)
    #cliente = models.OneToOneField(Cliente, null=True, blank=True)
    #cliente = models.OneToManyField(Cliente, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def categoria_nombre(self):
        return ",".join([str(p) for p in self.categoria.all()])

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.login
