from django.db import models


class Cliente(models.Model):

    nombre = models.CharField(max_length=30, null=True, blank=True)
    apellidos = models.CharField(max_length=30)
    genero = models.CharField(max_length=10)
    tipodoc = models.CharField(max_length=10)
    numdoc = models.CharField(max_length=15)
    direccion = models.CharField(max_length=50)
    telefono = models.CharField(max_length=15)
    email = models.CharField(max_length=30)
    # test_image = models.ImageField(upload_to='test_images',
    #                               default='test_images/default.png',
    #                               null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"

    def __str__(self):
        return self.nombre
