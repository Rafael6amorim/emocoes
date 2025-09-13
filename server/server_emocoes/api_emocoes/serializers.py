from rest_framework import serializers
from .models import Pacientes, Psicologo, Consultas, Usuarios, ImagensSalvas, Clinicas, ViewConsultaPsicologo


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
