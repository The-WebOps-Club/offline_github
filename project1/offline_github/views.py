# Create your views here.
from django.http import HttpResponse
from django.template import Template,Context
from django.shortcuts import render
from django.contrib.auth.models import User

def home(request):
	return render(request,'home.html')

def offgit_login(request):
	return render(request,'login.html')
def offgit_sign(request):
	return HttpResponse('Thanqu for allowing us to access your account')
