# Generated by Django 3.1.7 on 2021-05-28 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_hairdresser_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hairdresser',
            name='location',
        ),
        migrations.RemoveField(
            model_name='hairdresser',
            name='test',
        ),
    ]
