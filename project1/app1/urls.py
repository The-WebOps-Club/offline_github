from django.conf.urls.defaults import patterns, include, url
from views.py import hello

urlpatterns = patterns('r^/$',
	url(r'^app1/$',hello),
)
