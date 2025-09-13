# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ViewConsultaPsicologo(models.Model):
    id_psicologo = models.IntegerField(blank=True, null=True)
    id_usuario = models.IntegerField(blank=True, null=True)
    nome_psicologo = models.CharField(max_length=100, blank=True, null=True)
    abordagem = models.CharField(max_length=100, blank=True, null=True)
    crp = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    tipo_usuario = models.CharField(max_length=20, blank=True, null=True)
    qt_pacientes = models.BigIntegerField(blank=True, null=True)
    ids_pacientes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'view_consulta_psicologo'
