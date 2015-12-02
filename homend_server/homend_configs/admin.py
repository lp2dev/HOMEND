from django.contrib import admin
from .models.JerarquiaAcad import JerarquiaAcad
from .models.Institucion import Institucion
from .models.Facultad import Facultad
from .models.Escuela import Escuela
from .models.Carrera import Carrera

from .models.Cliente import Cliente
from .models.Usuario import Usuario
from .models.Categoria import Categoria


class JerarquiaAcadAdmin(admin.ModelAdmin):
    list_display = ("tipo", "institucion", "parent")


class InstitucionAdmin(admin.ModelAdmin):
    list_display = ("jerarquia_acad", "nombre", "abrev", "codigo")
    search_fields = ("nombre", "abrev", "codigo")
    list_per_page = 2


class FacultadAdmin(admin.ModelAdmin):
    list_display = ("jerarquia_acad", "nombre", "abrev", "codigo")
    search_fields = ("nombre", "abrev", "codigo")


class EscuelaAdmin(admin.ModelAdmin):
    list_display = ("jerarquia_acad", "nombre", "abrev", "codigo")
    search_fields = ("nombre", "abrev", "codigo")


class CarreraAdmin(admin.ModelAdmin):
    list_display = ("jerarquia_acad", "nombre", "abrev", "codigo")
    search_fields = ("nombre", "abrev", "codigo")


class ClienteAdmin(admin.ModelAdmin):
    list_per_page = 2
    list_display = ("nombre", "apellidos", "genero", "tipodoc",
                    "numdoc", "direccion", "telefono", "email")
    search_fields = ("nombre", "apellidos", "genero", "tidoDoc",
                     "numdoc", "direccion", "telefono", "email")


class UsuarioAdmin(admin.ModelAdmin):
    list_per_page = 2
    list_display = ("login", "password", "cliente_nombre",
                    "estado", "categoria_nombre")
    search_fields = ("login", "password", "cliente_nombre",
                     "estado")


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("codigo", "nombre")


admin.site.register(JerarquiaAcad, JerarquiaAcadAdmin)
admin.site.register(Institucion, InstitucionAdmin)
admin.site.register(Facultad, FacultadAdmin)
admin.site.register(Escuela, EscuelaAdmin)
admin.site.register(Carrera, CarreraAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Categoria, CategoriaAdmin)
