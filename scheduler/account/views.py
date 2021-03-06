from default_request_imports import * 
from jwt_misc import isAuthorized 
from default_params import KEY_REQ_USERNAME,KEY_REQ_PASSWORD
#creating databaseAgent object for database communucation 
@csrf_exempt
def getHairDressers(request):
  if not isAuthorized(request):
     return HttpResponseForbidden()
     
  if request.method == 'GET':
     hairdrs = db_agent.getAllHairDr()
     if not hairdrs:
        return HttpResponseInternalError()

     response = []
     for hairdr in hairdrs:
         response.append( {'username':hairdr.username,'email':hairdr.email,'firstName':hairdr.firstName,'lastName':hairdr.lastName,'location':hairdr.location,'phone':hairdr.phone,
         'workHours':{'start':hairdr.startHour,'end':hairdr.endHour},'description':hairdr.description})    
     
     return JsonResponse({'hairdressers':response})

  return HttpResponseForbidden()

@csrf_exempt
def login(request):
    if request.method == 'POST':
       try:
          body_unicode=request.body.decode("utf-8")
          request_body=json.loads(body_unicode)
    
          password = request_body[KEY_REQ_PASSWORD]
          username = request_body[KEY_REQ_USERNAME]
       except:
          return HttpResponseForbidden()

       if(not db_agent.doesClientExist(username)):
            return HttpResponseForbidden()

       if(not db_agent.isAuthenticated(username,password)):
            return HttpResponseForbidden()

       #implement jwt response to return on login 
       jwt_response = db_agent.jwtUserEncoding(username)

       if (not jwt_response):
           print("Error at jwt_login")
           return HttpResponseInternalError()
       return JsonResponse(jwt_response)
    else:
    	return HttpResponseForbidden()
      
