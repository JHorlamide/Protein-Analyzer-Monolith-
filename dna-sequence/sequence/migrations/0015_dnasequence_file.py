# Generated by Django 4.2.6 on 2023-10-15 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sequence', '0014_delete_analysisresult'),
    ]

    operations = [
        migrations.AddField(
            model_name='dnasequence',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
