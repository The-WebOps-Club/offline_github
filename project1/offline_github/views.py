# Create your views here.
import os
from django.http import HttpResponse
from django.template import Template,Context
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
PROJECT_PATH=os.path.abspath(os.path.dirname('project1'))
def get_file():
	s=os.path.expanduser("~/Downloads")
	c=os.listdir(s)
	a=[]
	for x in range(len(c)):
		if 'access_token' in c[x]:
			if os.path.getsize(s+"/"+c[x])==96 :
				a=a+[c[x]]
	b=[]
	if len(a)==1:
		return a[0]
	else:
		for x in range(len(a)):
			if len(a[x].split("("))>1:
				b=b+[int(a[x].split("(")[1].split(")")[0])]
	
	return a[1].split("(")[0]+'('+str(max(b))+')'
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
	c=get_file()
	c=os.path.expanduser("~/Downloads/"+c)
	q=open(c,"rb").read()
	w=q.split("=")[1]
	e=w.split("&")[0]
        html=t.render(Context({'token':e,'oauth':q})) 
        fp.close()
	return HttpResponse(html)
 
def trial(request):
	return render(request,'trial.html')
