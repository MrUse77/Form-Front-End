
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { user } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { users } from 'src/app/models/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('frase') frase!:ElementRef;
  UserLogin: users[]=[];
  usuarios: user[]=[];
  constructor(private renderer: Renderer2, private http: HttpClient, private toastr:ToastrService,private service:AutenticacionService) {}


  async busqueda(mail:String) {
      const token = localStorage.getItem('token');
      const Api = "https://formulario-b0f1.onrender.com";
        try{
          const response = await fetch(Api+`/traer/${mail}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':  `Bearer ${token}`
            }
          });
          const data = await response.json();
          this.UserLogin = []
          this.UserLogin.push(data)
          return data;
      }catch(error){
        this.toastr.error("login incorrecto")
      }
  }
}


