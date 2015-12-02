# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Carrera',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('nombre', models.CharField(max_length=60)),
                ('abrev', models.CharField(max_length=10, null=True, blank=True)),
                ('codigo', models.CharField(max_length=10, null=True, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Carreras',
                'verbose_name': 'Carrera',
            },
        ),
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('nombre', models.CharField(max_length=30, null=True, blank=True)),
                ('apellidos', models.CharField(max_length=30)),
                ('genero', models.CharField(max_length=10)),
                ('tipoDoc', models.CharField(max_length=10)),
                ('numDoc', models.CharField(max_length=15)),
                ('direccion', models.CharField(max_length=50)),
                ('telefono', models.CharField(max_length=15)),
                ('email', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'Clientes',
                'verbose_name': 'Cliente',
            },
        ),
        migrations.CreateModel(
            name='Escuela',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('nombre', models.CharField(max_length=60)),
                ('abrev', models.CharField(max_length=10, null=True, blank=True)),
                ('codigo', models.CharField(max_length=10, null=True, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Escuelas',
                'verbose_name': 'Escuela',
            },
        ),
        migrations.CreateModel(
            name='Facultad',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('nombre', models.CharField(max_length=60)),
                ('abrev', models.CharField(max_length=10, null=True, blank=True)),
                ('codigo', models.CharField(max_length=10, null=True, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Facultades',
                'verbose_name': 'Facultad',
            },
        ),
        migrations.CreateModel(
            name='Institucion',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('nombre', models.CharField(max_length=60)),
                ('abrev', models.CharField(max_length=10, null=True, blank=True)),
                ('codigo', models.CharField(max_length=10, null=True, blank=True)),
                ('estructura_validada', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name_plural': 'Instituciones',
                'verbose_name': 'Institución',
            },
        ),
        migrations.CreateModel(
            name='JerarquiaAcad',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('tipo', models.CharField(choices=[('INSTITUCION', 'INSTITUCION'), ('FACULTAD', 'FACULTAD'), ('ESCUELA', 'ESCUELA'), ('CARRERA', 'CARRERA'), ('DEPARTAMENTO', 'DEPARTAMENTO')], max_length=30)),
                ('institucion', models.ForeignKey(to='homend_configs.Institucion', null=True, blank=True)),
                ('parent', models.ForeignKey(to='homend_configs.JerarquiaAcad', null=True, blank=True)),
            ],
            options={
                'verbose_name_plural': 'JerarquiaAcads',
                'verbose_name': 'JerarquiaAcad',
            },
        ),
        migrations.CreateModel(
            name='NaturalPerson',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('last_name', models.CharField(max_length=10, null=True, blank=True)),
                ('first_name', models.TextField(max_length=60)),
                ('birth_date', models.DateTimeField(null=True, blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'NaturalPersons',
                'verbose_name': 'NaturalPerson',
            },
        ),
        migrations.CreateModel(
            name='UnidadMedida',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('codigo', models.CharField(max_length=10, null=True, blank=True)),
                ('nombre', models.CharField(max_length=60)),
                ('estado', models.BooleanField(default=True)),
                ('test_date', models.DateTimeField(null=True, blank=True)),
                ('test_number', models.FloatField(null=True, blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'UnidadMedidas',
                'verbose_name': 'UnidadMedida',
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('login', models.CharField(max_length=30, null=True, blank=True)),
                ('password', models.CharField(max_length=20)),
                ('estado', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('cliente_nombre', models.ForeignKey(to='homend_configs.Cliente', null=True, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Usuarios',
                'verbose_name': 'Usuario',
            },
        ),
        migrations.AddField(
            model_name='institucion',
            name='jerarquia_acad',
            field=models.ForeignKey(related_name='institucion_set', to='homend_configs.JerarquiaAcad', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='facultad',
            name='jerarquia_acad',
            field=models.ForeignKey(to='homend_configs.JerarquiaAcad', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='escuela',
            name='jerarquia_acad',
            field=models.ForeignKey(to='homend_configs.JerarquiaAcad', null=True, blank=True),
        ),
        migrations.AddField(
            model_name='carrera',
            name='jerarquia_acad',
            field=models.ForeignKey(to='homend_configs.JerarquiaAcad', null=True, blank=True),
        ),
    ]
