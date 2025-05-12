import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomToastrService } from '../../services/custom-toastr.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public showPassword: boolean = false;
  public leyendBtn: string = 'Iniciar Sesión';
  public loginForm: FormGroup;
  public isErrorVisible: boolean = false;
  loading: boolean = true;

  backgroundUrl = 'url("assets/login_mancuernas.jpg")';


  constructor(
    private toastr: CustomToastrService,
    private _route: Router,
    private _loginService: LoginService,
    private authService: AuthService

  ) {
    this.loginForm = new FormGroup({
      // Campos del formulario de login
      usernameLogin: new FormControl('', Validators.required),
      passwordLogin: new FormControl(''),
    });
  }

  public users: any

  ngOnInit(): void {
    this.loading = false;
    /*this._loginService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
      },
      error: (error) => {
      }
    });*/
  }

  changePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      let username = this.loginForm.get('usernameLogin')?.value;
      let password = this.loginForm.get('passwordLogin')?.value;
      // Validar contra la API
      this._loginService.login(username, password).subscribe({
        next: (response) => {
          if (response.success) {
            this.hideError();
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('rol', response.rol);
            sessionStorage.setItem('id',response.id)
            console.log("response.id",response.id);

            this.authService.login(username);
            this.loading = false;
            console.log("logged", response);
            //FIXME puenteado para desarrollo cambiar a 1-2-3
            if (response.rol == "admin") {//Administrador
              this._route.navigate(['/dashboard-entrenador']);
              console.log("administrador");
            } else if (response.rol == "entrenador") {//Entrenador
              this._route.navigate(['/dashboard-entrenador']);
              console.log("entrenador");
            } else if (response.rol == "admin") {//Cliente
              this._route.navigate(['/dashboard-cliente']);
              console.log("cliente");
            } else {
              this.errorRoles();
            }
          }
          else {
            this.loading = false;
            this.showError();
          }
        },
        error: (error) => {
        }
      });
    } else {
      this.toastr.show('Campos inválidos', 'error');
    }
  }

  showError() {
    this.isErrorVisible = true;
  }

  hideError() {
    this.isErrorVisible = false;
  }

  errorRoles() {
    this.toastr.show('Avisa al administrador, ha habido un error de login', 'error')
  }
}