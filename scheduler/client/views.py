from default_request_imports import * 
from default_params import KEY_REQ_USERNAME,KEY_REQ_PASSWORD
#NOTE: Add seperate registering function for Hair dressers and normal users
@csrf_exempt
def register(request):
    if request.method == 'POST':
       body_unicode = request.body.decode('utf-8')
       request_body= json.loads(body_unicode) # dict object
       if(db_agent.doesClientExist(request_body[KEY_REQ_USERNAME])):
          return HttpResponseForbidden()
       
       hash_salt = db_agent.password_salt()
       hashed_password = hash_salt + request_body[KEY_REQ_PASSWORD]
       request_body[KEY_REQ_PASSWORD] = hashlib.sha256(hashed_password.encode("utf-8")).hexdigest()

       if(not db_agent.addNewClient(request_body,hash_salt)):
          return HttpResponseForbidden()
       return HttpResponseOK()

    return HttpResponseForbidden();
