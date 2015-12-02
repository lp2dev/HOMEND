# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homend_configs', '0002_auto_20151118_1413'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='numDoc',
            new_name='numdoc',
        ),
        migrations.RenameField(
            model_name='cliente',
            old_name='tipoDoc',
            new_name='tipodoc',
        ),
    ]
