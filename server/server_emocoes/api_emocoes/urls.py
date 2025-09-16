from django.urls import path
from .views import usuarios,listar_clinicas,listar_psicologos,listar_pacientes,clinica_por_usuario,psicologo_por_usuario,listar_usuarios,listar_consultas
from .views import criar_usuario,popular_pacientes,popular_psicologos,popular_consulta,popular_imagens,popular_clinicas
urlpatterns = [
    path('popular/pacientes/', popular_pacientes, name='popular_pacientes'),
    path('popular/psicologos/', popular_psicologos, name='popular_psicologos'),
    path('popular/consultas/', popular_consulta, name='popular_consultas'),
    path('listar/consultas/', listar_consultas, name='listar_consultas'),
    path('login/usuario/', usuarios, name='login_usuario'),
    path('salvar_imagens/imagem/', popular_imagens, name='popular_imagens'),
    path('criar_Usuario/usario/', criar_usuario, name='criar_usario'),
    path('popular/clinicas/',popular_clinicas, name='popular_clinica'),
    path('listar/clinicas/', listar_clinicas, name='listar_clinicas'),
    path('listar/psicologos/', listar_psicologos, name='listar_psicologos'),
    path('listar/pacientes/', listar_pacientes, name='listar_pacientes'),
    path('listar/usuarios/', listar_usuarios, name='listar_usuarios'),
    path('clinica/usuario/<int:usuario_id>/', clinica_por_usuario, name='clinica_por_usuario'),
    path('psicologo/usuario/<int:usuario_id>/', psicologo_por_usuario, name='psicologo_por_usuario'),
]
