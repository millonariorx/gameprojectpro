from django.urls import re_path as url
from ApiGameApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^category$', views.categoryApi),
    url(r'^category/([0-9]+)$', views.categoryApi),
    url(r'^game$', views.gameApi),
    url(r'^game/([0-9]+)$', views.gameApi),
    url(r'^filter$', views.filterpro),
    url(r'^filter/([0-9]+)$', views.filterpro),
    url(r'^detail$', views.detailGameApi),
    url(r'^detail/([0-9]+)$', views.detailGameApi),
    url(r'^disabled$', views.disabled),
    url(r'^disabled/([0-9]+)$', views.disabled),
    
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)