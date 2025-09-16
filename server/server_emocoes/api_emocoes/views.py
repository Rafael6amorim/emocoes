from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from .models import Pacientes,Consultas,Psicologo,Usuarios,ImagensSalvas,Clinicas,ViewConsultaPsicologo,VwConsultasDetalhes
from .serializers import PacientesSerializer,PsicologoSerializer,ConsultasSerializer,UsuariosSerializer
from .serializers import ClinicasSerializer,ImagensSalvasSerializer,ViewConsultaPsicologoSerializer,VwConsultasDetalhesSerializer
import base64
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import base64



@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'pacientes': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'nome': openapi.Schema(type=openapi.TYPE_STRING, description='Nome do paciente'),
                        'idade': openapi.Schema(type=openapi.TYPE_INTEGER, description='Idade do paciente'),
                        'tipo_tratamento': openapi.Schema(type=openapi.TYPE_STRING, description='Tipo de tratamento')
                    },
                    example={"nome": "João", "idade": 25, "tipo_tratamento": "Terapia cognitiva"}
                ),
                description='Lista de pacientes a serem inseridos'
            )
        },
        required=['pacientes']
    )
)
@api_view(['POST'])
def popular_pacientes(request):
    data = request.data.get('pacientes', [])
    serializer = PacientesSerializer(data=data, many=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "created": len(data)})
    return Response({"success": False, "errors": serializer.errors})

@api_view(['GET'])
def listar_pacientes(request):
    pacientes = Pacientes.objects.all()
    serializer = PacientesSerializer(pacientes, many=True)
    return Response(serializer.data)


# views.py
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'psicologos': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'nome_psicologo': openapi.Schema(type=openapi.TYPE_STRING, description='Nome do psicólogo'),
                        'abordagem': openapi.Schema(type=openapi.TYPE_STRING, description='Abordagem terapêutica'),
                        'crp': openapi.Schema(type=openapi.TYPE_STRING, description='CRP do psicólogo'),
                        'id_clinica': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID da clínica (opcional)')
                    },
                    example={
                        "nome_psicologo": "Dr. Carlos", 
                        "abordagem": "Cognitivo-comportamental", 
                        "crp": "521029",
                        "id_clinica": 1
                    }
                ),
                description='Lista de psicólogos a serem inseridos'
            )
        },
        required=['psicologos']
    )
)
@api_view(['POST'])
def popular_psicologos(request):
    data = request.data.get('psicologos', [])
    serializer = PsicologoSerializer(data=data, many=True)

    if serializer.is_valid():  # <-- alinhado com serializer
        serializer.save()
        return Response({"success": True, "created": len(data)}, status=201)

    return Response({"success": False, "errors": serializer.errors}, status=400)

@api_view(['GET'])
def listar_psicologos(request):
    psicologos = ViewConsultaPsicologo.objects.all()
    serializer = ViewConsultaPsicologoSerializer(psicologos, many=True)
    return Response(serializer.data)


@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'clinicas': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id_usuario': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID do usuário dono da clínica'),
                        'nome_clinica': openapi.Schema(type=openapi.TYPE_STRING, description='Nome da clínica'),
                        'cnpj': openapi.Schema(type=openapi.TYPE_STRING, description='CNPJ da clínica'),
                        'endereco': openapi.Schema(type=openapi.TYPE_STRING, description='Endereço da clínica')
                    },
                    example={"id_usuario": 5, "nome_clinica": "Clínica Bem-Estar", "cnpj": "12.345.678/0001-90", "endereco": "Rua das Flores, 123"}
                ),
                description='Lista de clínicas a serem inseridas'
            )
        },
        required=['clinicas']
    )
)
@api_view(['POST'])
def popular_clinicas(request):
    data = request.data.get('clinicas', [])
    serializer = ClinicasSerializer(data=data, many=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "created": len(data)})
    return Response({"success": False, "errors": serializer.errors})

@api_view(['GET'])
def listar_clinicas(request):
    clinicas = Clinicas.objects.all()
    serializer = ClinicasSerializer(clinicas, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'consultas': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Items(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id_paciente': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID do paciente'),
                        'id_psicologo': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID do psicólogo'),
                        'data_consulta': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE, description='Data da consulta'),
                        'id_imagem': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID da imagem salva')
                    },
                    example={
                        "id_paciente": 1,
                        "id_psicologo": 1,
                        "data_consulta": "2025-08-28",
                        "id_imagem": 5
                    }
                ),
                description='Lista de consultas a serem inseridas'
            )
        },
        required=['consultas']
    )
)
@api_view(['POST'])
def popular_consulta(request):
    try:
        consulta_data = request.data
        
        consulta = Consultas(
            id_paciente_id=consulta_data["id_paciente"],
            id_psicologo_id=consulta_data.get("id_psicologo"),
            data_consulta=consulta_data["data_consulta"],
            id_imagem_id=consulta_data.get("id_imagem"),
        )
        consulta.save()
        
        return Response({
            "success": True, 
            "id_consulta": consulta.id_consulta,
            "message": "Consulta criada com sucesso"
        })
        
    except Exception as e:
        return Response({
            "success": False,
            "error": str(e)
        }, status=400)



@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'nome_imagem': openapi.Schema(type=openapi.TYPE_STRING, description='Nome da imagem'),
            'imagem_base64': openapi.Schema(type=openapi.TYPE_STRING, description='Imagem em base64'),
        },
        required=['imagem_base64']
    )
)
@api_view(['POST'])
def popular_imagens(request):
    try:
        nome_imagem = request.data.get("nome_imagem")
        imagem_base64 = request.data.get("imagem_base64")
        
        if not nome_imagem:
            return Response(
                {"success": False, "error": "Nome da imagem é obrigatório"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not imagem_base64:
            return Response(
                {"success": False, "error": "Imagem base64 é obrigatória"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # VERIFICAÇÃO ANTECIPADA se o nome já existe
        if ImagensSalvas.objects.filter(nome_imagens=nome_imagem).exists():
            return Response(
                {"success": False, "error": "Já existe uma imagem com esse nome"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Processa a imagem base64
        if ',' in imagem_base64:
            imagem_base64 = imagem_base64.split(',')[1]
        
        try:
            imagem_bytes = base64.b64decode(imagem_base64)
        except (ValueError, binascii.Error):
            return Response(
                {"success": False, "error": "Formato base64 inválido"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # CALCULA O PRÓXIMO ID MANUALMENTE
        ultimo_id = ImagensSalvas.objects.all().order_by('-id_imagens').first()
        if ultimo_id:
            proximo_id = ultimo_id.id_imagens + 1
        else:
            proximo_id = 1  # Primeiro registro

        # Salva no banco de dados com o ID calculado
        imagem = ImagensSalvas(
            id_imagens=proximo_id,
            nome_imagens=nome_imagem,
            imagens=imagem_bytes
        )
        imagem.save()

        return Response({
            "success": True,
            "id_imagem": imagem.id_imagens,
            "nome_imagem": imagem.nome_imagens
        })

    except Exception as e:
        # Log do erro para debugging
        print(f"Erro interno: {str(e)}")
        return Response(
            {"success": False, "error": f"Erro interno do servidor: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_consultas(request):
    try:
        tipo_usuario = request.GET.get('tipo_usuario')
        usuario_email = request.GET.get('usuario_email')
        usuario_nome = request.GET.get('usuario_nome')
        
        print(f"🎯 Parâmetros: tipo_usuario={tipo_usuario}, usuario_email={usuario_email}")
        
        consultas = VwConsultasDetalhes.objects.all()
        
        if tipo_usuario and usuario_email and usuario_email != 'undefined':
            if tipo_usuario == 'psicologo':
                consultas = consultas.filter(email_psicologo=usuario_email)
                print(f"✅ Filtrado por email: {usuario_email}")
                
            elif tipo_usuario == 'comum':
                consultas = consultas.filter(nome_paciente=usuario_nome)
        
        print(f"📦 Consultas encontradas: {consultas.count()}")
        
        # Processa os dados MANUALMENTE para garantir todos os campos
        resultado = []
        for consulta in consultas:
            imagem_base64 = None
            tem_imagem = False
            
            if consulta.imagens:
                tem_imagem = True
                try:
                    if isinstance(consulta.imagens, memoryview):
                        image_bytes = consulta.imagens.tobytes()
                    elif isinstance(consulta.imagens, bytes):
                        image_bytes = consulta.imagens
                    else:
                        image_bytes = None
                    
                    if image_bytes:
                        imagem_base64 = f"data:image/png;base64,{base64.b64encode(image_bytes).decode('utf-8')}"
                        
                except Exception as e:
                    print(f"Erro ao processar imagem: {e}")
            
            # INCLUA TODOS OS CAMPOS QUE PRECISA
            consulta_data = {
                "id_consulta": consulta.id_consulta,
                "data_consulta": consulta.data_consulta,
                "nome_paciente": consulta.nome_paciente,
                "idade": consulta.idade,
                "tipo_tratamento": consulta.tipo_tratamento,
                "nome_psicologo": consulta.nome_psicologo,
                "abordagem": consulta.abordagem,
                "crp": consulta.crp,
                "email_psicologo": consulta.email_psicologo,  # ← Novo campo
                "nome_imagens": consulta.nome_imagens,
                "imagem_base64": imagem_base64,
                "tem_imagem": tem_imagem
            }
            resultado.append(consulta_data)
        
        return Response(resultado)

    except Exception as e:
        print(f"❌ Erro: {e}")
        return Response({'error': str(e)}, status=400)


# Definição dos parâmetros de entrada (email e senha)
email_param = openapi.Parameter(
    'email', openapi.IN_QUERY, description="Email do usuário",
    type=openapi.TYPE_STRING, required=True
)
senha_param = openapi.Parameter(
    'senha', openapi.IN_QUERY, description="Senha do usuário",
    type=openapi.TYPE_STRING, required=True
)

@swagger_auto_schema(
    method='get',
    manual_parameters=[email_param, senha_param],
    responses={
        200: openapi.Response('Login bem-sucedido'),
        400: "Parâmetros inválidos",
        401: "Credenciais inválidas",
        404: "Usuário não encontrado"
    }
)
@api_view(['GET'])
def usuarios(request):
    email = request.GET.get('email')
    senha = request.GET.get('senha')

    if not email or not senha:
        return Response(
            {"erro": "Email e senha são obrigatórios"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        usuario = Usuarios.objects.get(email=email)
    except Usuarios.DoesNotExist:
        return Response(
            {"erro": "Usuário não encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )

    if usuario.senha != senha:
        return Response(
            {"erro": "Senha incorreta"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Aqui você pode autenticar de fato ou gerar token se quiser
    serializer = UsuariosSerializer(usuario)
    return Response(
        {
            "mensagem": "Login realizado com sucesso",
            "tipo_usuario": usuario.tipo_usuario,
            "usuario": serializer.data
        },
        status=status.HTTP_200_OK
    )


# Definição do corpo esperado na requisição
usuario_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email do usuário'),
        'senha': openapi.Schema(type=openapi.TYPE_STRING, description='Senha do usuário'),
        'tipo_usuario': openapi.Schema(
            type=openapi.TYPE_STRING,
            description="Tipo de usuário (comum, psicologo, clinica)"
        ),
    },
    required=['email', 'senha', 'tipo_usuario']
)

@swagger_auto_schema(
    method='post',
    request_body=usuario_schema,
    responses={
        201: openapi.Response('Usuário criado com sucesso'),
        400: "Dados inválidos",
        409: "Email já cadastrado"
    }
)

@api_view(['POST'])
def criar_usuario(request):
    email = request.data.get('email')
    senha = request.data.get('senha')
    tipo_usuario = request.data.get('tipo_usuario')

    if not email or not senha or not tipo_usuario:
        return Response(
            {"erro": "Email, senha e tipo de usuário são obrigatórios"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if Usuarios.objects.filter(email=email).exists():
        return Response(
            {"erro": "Já existe um usuário com este email"},
            status=status.HTTP_409_CONFLICT
        )

    usuario = Usuarios.objects.create(
        email=email,
        senha=senha, 
        tipo_usuario=tipo_usuario,
        data_criacao=timezone.now()
    )

    serializer = UsuariosSerializer(usuario)
    return Response(
        {
            "mensagem": "Usuário criado com sucesso",
            "usuario": serializer.data
        },
        status=status.HTTP_201_CREATED
    )

@api_view(['GET'])
def listar_usuarios(request):
    usuarios = Usuarios.objects.all()
    serializer = UsuariosSerializer(usuarios, many=True)
    return Response(serializer.data)




# views.py
@api_view(['GET'])
def psicologo_por_usuario(request, usuario_id):
    try:
        psicologo = Psicologo.objects.get(id_usuario=usuario_id)
        serializer = PsicologoSerializer(psicologo)
        return Response(serializer.data)
    except Psicologo.DoesNotExist:
        return Response({"erro": "Psicólogo não encontrado para este usuário"}, status=404)

@api_view(['GET'])
def clinica_por_usuario(request, usuario_id):
    try:
        clinica = Clinicas.objects.get(id_usuario=usuario_id)
        serializer = ClinicasSerializer(clinica)
        return Response(serializer.data)
    except Clinicas.DoesNotExist:
        return Response({"erro": "Clínica não encontrada para este usuário"}, status=404)


