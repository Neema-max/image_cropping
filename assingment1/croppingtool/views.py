from django.shortcuts import render
from PIL import Image
from .models import cpp
from django.http import HttpResponse,JsonResponse
from PIL import Image
# Create your views here.
x=0
def croppingtool(request):
    def checkextenstion(s):
        allextension =[".jpg", '.jpeg', '.jpe','.jif', '.jfif', '.jfi',  '.png', '.gif' ,'.webp' , '.tiff', '.tif' , '.psd' , '.raw', '.arw', '.cr2', '.nrw', '.k25' ,'.bmp', '.dib' ,'.heif', '.heic' ,'.ind', '.indd', '.indt' ,'.jp2', '.j2k','.jpf', '.jpx', '.jpm', '.mj2', '.svg', '.svgz' ,'.ai','.eps']
        for xtenstion in allextension:
            if s.endswith(xtenstion):
                return False
        return True
    if request.method == 'POST' :
        print(type(request.POST['val']))
        if request.POST['val']=='2':
            x=int(request.POST['x'])
            y=int(request.POST['y'])
            x2 = int(request.POST['x2'])
            y2= int(request.POST['y2'])
            idd = int(request.POST['id'])
            i = cpp.objects.get(id= idd).image
            img = Image.open(i.path)
            #print(img.width)
            #print(img.height)
            croped = img.crop((x,y,x2,y2))
            croped.save(i.path,quality = 90)
            data = {
                'result' : 'success'
            }
            return JsonResponse(data)
            # if img is not None :
        else:
            img = request.FILES['image']
            if checkextenstion(img.name):
                data={
                    'result' : 'error',
                    'message': 'selected file is not an image', 
                }
                return JsonResponse(data)
            else :
                r= cpp(image = img)
                r.save()
                path = r.image.url
                data ={
                       'result' : 'success',
                       'path' : path, 
                       'id' : r.id,
                   }
                return JsonResponse(data)
    return render(request, 'cropping.html')
def final(request,id):
    params={
        'path' : cpp.objects.get(id = id).image.url
    }
    return render(request,'final.html',params)
