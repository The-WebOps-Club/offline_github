# Create your views here.
from django.http import HttpResponse
from django.template import Template,Context
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.contrib.auth.models import User

def home(request):
	return render(request,'home.html')

def offgit_login(request):
	return render(request,'login.html')
def offgit_sign(request):
	
	return render(request,'sign.html')

def user(request):
	fp=open("/home/keerthana/project1/templates/trial.html")
	t=Template(fp.read())
	q=open("/home/keerthana/Downloads/access_token","rb").read()
	w=q.split("=")[1]
	e=w.split("&")[0]
        html=t.render(Context({'token':e,'oauth':q})) 
        fp.close()
	return HttpResponse(html)
 
def trial(request):
	return render(request,'trial.html')
