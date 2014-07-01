# Create your views here.
import os
from django.http import HttpResponse
from django.template import Template,Context
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
PROJECT_PATH=os.path.abspath(os.path.dirname('project1'))
def home(request):
	return render(request,'home.html')

def offgit_login(request):
	return render(request,'login.html')
def offgit_sign(request):
	
	return render(request,'sign.html')

def user(request):
	a=(os.path.join(PROJECT_PATH,'templates','trial.html'))
	fp=open(a)
	t=Template(fp.read())
	c=os.path.expanduser("~/Downloads/access_token")
	q=open(c,"rb").read()
	w=q.split("=")[1]
	e=w.split("&")[0]
        html=t.render(Context({'token':e,'oauth':q})) 
        fp.close()
	return HttpResponse(html)
 
def trial(request):
	return render(request,'trial.html')
