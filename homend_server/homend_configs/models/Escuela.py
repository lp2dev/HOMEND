# _*_ coding: utf-8 _*_
from django.db import models
from .JerarquiaAcad import JerarquiaAcad


class Escuela(models.Model):

    nombre = models.CharField(max_length=60)
    abrev = models.CharField(max_length=10, null=True, blank=True)
    codigo = models.CharField(max_length=10, null=True, blank=True)
    jerarquia_acad = models.ForeignKey(JerarquiaAcad, null=True, blank=True)

    class Meta:
        verbose_name = "Escuela"
        verbose_name_plural = "Escuelas"

    def __str__(self):
        return self.abrev
