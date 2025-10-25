from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse, FileResponse
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
import os

schema_view = get_schema_view(
   openapi.Info(
      title="API Consultas",
      default_version='v1',
      description="API para gerenciar Pacientes, Psicólogos e Consultas",
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

def healthz(_request):
    return HttpResponse("ok")

def spa(_request, path=None):
    index_path = "/app/static/index.html"
    if os.path.exists(index_path):
        return FileResponse(open(index_path, "rb"))
    return HttpResponse("index.html not found", status=404)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/', include('api_emocoes.urls')),  # <-- aqui você importa as URLs do app
    path("healthz", healthz),
    # catch-all para o React (deixe por último para não sobrescrever APIs)
    re_path(r"^(?!admin/|api/).*", spa),
]
