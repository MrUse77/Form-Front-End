import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { user } from '../models/user';
import { map } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  Api = "https://formulario-b0f1.onrender.com"
  constructor(private http:HttpClient, private toastr:ToastrService) { }

async IniciarSesion(Form: UserLogin): Promise<any> {
  return this.http.post<any>(this.Api + '/login', Form, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        localStorage.setItem('token', token);
        return body;
      })
    ).toPromise();
}
  getToken(){
    return localStorage.getItem('token');
  }
  async SignUp(form: user) {
    let direccion = this.Api + "/crear";
    try {
      const response = await fetch(`${direccion}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error al crear el usuario');
      }
    } catch (error) {
      console.log("🚀 ~ file: autenticacion.service.ts:45 ~ AutenticacionService ~ SignUp ~ error:", error);
      this.toastr.error("Registro Failed");
    }
  }
  
  Decode(){
    const token = this.getToken();
    var id: Number| null=null
    if(token){
      try{
        const decodedToken:any = jwt_decode(token)
        id = decodedToken.id 
      }catch{
        this.toastr.error('Error')
      }
  }
  return id;
}

}
