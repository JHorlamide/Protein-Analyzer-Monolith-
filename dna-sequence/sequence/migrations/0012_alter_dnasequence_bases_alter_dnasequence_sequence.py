# Generated by Django 4.2.6 on 2023-10-13 10:11

from django.db import migrations, models
import sequence.models


class Migration(migrations.Migration):

    dependencies = [
        ('sequence', '0011_alter_dnasequence_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dnasequence',
            name='bases',
            field=models.TextField(validators=[sequence.models.validate_string, sequence.models.validate_no_emoji]),
        ),
        migrations.AlterField(
            model_name='dnasequence',
            name='sequence',
            field=models.TextField(validators=[sequence.models.validate_string, sequence.models.validate_no_emoji]),
        ),
    ]
