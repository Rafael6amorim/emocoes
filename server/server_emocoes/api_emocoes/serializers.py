import base64
from rest_framework import serializers
from .models import Pacientes, Psicologo, Consultas, Usuarios, ImagensSalvas, Clinicas, ViewConsultaPsicologo, VwConsultasDetalhes

class PacientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pacientes
        fields = '__all__'

class PsicologoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Psicologo
        fields = '__all__'

class ClinicasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinicas
        fields = '__all__'

class ConsultasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultas
        fields = '__all__' 

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__' 

class ImagensSalvasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagensSalvas
        fields = '__all__' 

class ViewConsultaPsicologoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewConsultaPsicologo
        fields = '__all__'

class ConsultaImagemSerializer(serializers.Serializer):
    nome_imagens = serializers.CharField()
    imagem_base64 = serializers.SerializerMethodField()

    def get_imagem_base64(self, obj):
        imagens = obj.get('imagens')
        if imagens:
            if isinstance(imagens, bytes):
                return f"data:image/png;base64,{base64.b64encode(imagens).decode('utf-8')}"
            return imagens
        return None

class VwConsultasDetalhesSerializer(serializers.Serializer):
    imagem_base64 = serializers.SerializerMethodField()
    tem_imagem = serializers.SerializerMethodField()

    class Meta:
        model = VwConsultasDetalhes
        fields = [
            'id_consulta', 'data_consulta', 'nome_paciente', 
            'idade', 'tipo_tratamento', 'nome_psicologo', 
            'abordagem', 'crp', 'email_psicologo',  # ← INCLUA O NOVO CAMPO
            'nome_imagens', 'imagens', 'imagem_base64', 'tem_imagem'
        ]

    def get_imagem_base64(self, obj):
        if obj.imagens:
            try:
                # Converte memoryview para bytes se necessário
                if isinstance(obj.imagens, memoryview):
                    image_bytes = obj.imagens.tobytes()  # ← CONVERTE memoryview PARA bytes
                elif isinstance(obj.imagens, bytes):
                    image_bytes = obj.imagens
                else:
                    print(f"Tipo inesperado: {type(obj.imagens)}")
                    return None
                
                return f"data:image/png;base64,{base64.b64encode(image_bytes).decode('utf-8')}"
                
            except Exception as e:
                print(f"Erro ao processar imagem: {e}")
                return None
        return None

    def get_tem_imagem(self, obj):
        return obj.imagens is not None and (
            (isinstance(obj.imagens, memoryview) and len(obj.imagens) > 0) or
            (isinstance(obj.imagens, bytes) and len(obj.imagens) > 0) or
            (isinstance(obj.imagens, str) and len(obj.imagens) > 0)
        )