# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class ClinicaPsicologos(models.Model):
    id_clinica = models.ForeignKey('Clinicas', models.DO_NOTHING, db_column='id_clinica')
    id_psicologo = models.ForeignKey('Psicologo', models.DO_NOTHING, db_column='id_psicologo')
    data_inicio = models.DateField(blank=True, null=True)
    ativo = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clinica_psicologos'
        unique_together = (('id_clinica', 'id_psicologo'),)


class Clinicas(models.Model):
    id_clinica = models.AutoField(primary_key=True)
    id_usuario = models.OneToOneField('Usuarios', models.DO_NOTHING, db_column='id_usuario')
    nome_clinica = models.CharField(max_length=150)
    cnpj = models.CharField(unique=True, max_length=20, blank=True, null=True)
    endereco = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clinicas'


class Consultas(models.Model):
    id_consulta = models.AutoField(primary_key=True)
    id_paciente = models.ForeignKey('Pacientes', models.DO_NOTHING, db_column='id_paciente',blank=True, null=True)
    data_consulta = models.DateField()
    id_psicologo = models.ForeignKey('Psicologo', models.DO_NOTHING, db_column='id_psicologo', blank=True, null=True)
    id_imagem = models.ForeignKey('ImagensSalvas', models.DO_NOTHING, db_column='id_imagem', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'consultas'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class ImagensSalvas(models.Model):
    id_imagens = models.IntegerField(primary_key=True)
    nome_imagens = models.CharField(unique=True, max_length=55, blank=True, null=True)
    imagens = models.BinaryField(blank=True, null=True)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    data_imagem = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'imagens_salvas'


class Pacientes(models.Model):
    id_paciente = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    idade = models.IntegerField(blank=True, null=True)
    tipo_tratamento = models.CharField(max_length=100, blank=True, null=True)
    id_psicologo = models.ForeignKey('Psicologo', models.DO_NOTHING, db_column='id_psicologo', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pacientes'


class Psicologo(models.Model):
    id_psicologo = models.AutoField(primary_key=True)
    nome_psicologo = models.CharField(max_length=100)
    abordagem = models.CharField(max_length=100, blank=True, null=True)
    crp = models.CharField(max_length=20)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_clinica = models.ForeignKey(Clinicas, models.DO_NOTHING, db_column='id_clinica', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'psicologo'


class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    email = models.CharField(unique=True, max_length=255)
    senha = models.CharField(max_length=255)
    tipo_usuario = models.CharField(max_length=20)
    data_criacao = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'

class ViewConsultaPsicologo(models.Model):
    id_psicologo = models.IntegerField(primary_key=True)
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

class VwConsultasDetalhes(models.Model):
    id_consulta = models.IntegerField(primary_key=True)
    data_consulta = models.DateField(blank=True, null=True)
    nome_paciente = models.CharField(max_length=100, blank=True, null=True)
    idade = models.IntegerField(blank=True, null=True)
    tipo_tratamento = models.CharField(max_length=100, blank=True, null=True)
    nome_psicologo = models.CharField(max_length=100, blank=True, null=True)
    abordagem = models.CharField(max_length=100, blank=True, null=True)
    crp = models.CharField(max_length=20, blank=True, null=True)
    email_psicologo = models.CharField(max_length=255, blank=True, null=True)  # ← NOVO CAMPO!
    nome_imagens = models.CharField(max_length=55, blank=True, null=True)
    imagens = models.BinaryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vw_consultas_detalhes'