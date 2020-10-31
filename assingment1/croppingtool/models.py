from django.db import models

# Create your models here.
class cpp(models.Model):
    image = models.ImageField(upload_to= 'croped/')