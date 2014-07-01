from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class userprofile(models.Model):
	username=models.ForeignKey(User)
	roll_no=models.CharField(max_length=20)
	hostel_name=models.CharField(max_length=50)
	
