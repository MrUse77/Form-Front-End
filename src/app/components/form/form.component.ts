
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/app/models/UserLogin';
import { user } from 'src/app/models/user';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  @ViewChild('main',{static:false}) main!: ElementRef;
formLogin:FormGroup;
formSignUp:FormGroup;
usuarios:UserLogin={mail:'',password:'' };
usuario: user[]=[];

constructor(private formBuilder : FormBuilder, private service:AutenticacionService, private toastr:ToastrService,private renderer: Renderer2,private home:HomeComponent,public el:ElementRef){
  this.formLogin= this.formBuilder.group({
    mail:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  });
  this.formSignUp = this.formBuilder.group({
    name:['',[Validators.required]],
    lastName:['',[Validators.required]],
    mail:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  })
}
  @Output() Show = new EventEmitter();
  ngOnInit(): void {
  }
  async Login(formLogin: NgForm) {
    try{
      await this.service.IniciarSesion(this.usuarios)
      this.home.busqueda(this.usuarios.mail);
      const main = this.main.nativeElement
      this.renderer.setStyle(main,"display","none")
    }catch(error){
      this.toastr.error('Login Incorrecto');
    }

  }
  
  async onSignUp(form: user){
  await this.service.SignUp(form)
    this.toastr.success("Inicie Sesion para Ingresar")}
} 
