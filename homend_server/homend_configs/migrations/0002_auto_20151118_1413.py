# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homend_configs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('codigo', models.CharField(max_length=10, null=True, blank=True)),
                ('nombre', models.CharField(max_length=60)),
                ('estado', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Categorias',
                'verbose_name': 'Categoria',
            },
        ),
        migrations.AlterField(
            model_name='usuario',
            name='estado',
            field=models.CharField(max_length=50, choices=[('PRO', 'Activo'), ('WEB', 'Baja'), ('VENTAS', 'Otro')], default='PRO'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='categoria',
            field=models.ManyToManyField(to='homend_configs.Categoria', null=True, related_name='usuario_set', blank=True),
        ),
    ]
