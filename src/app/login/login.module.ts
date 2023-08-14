import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login.component';

@NgModule({
  imports: [CommonModule, FormsModule, LoginRoutingModule, ReactiveFormsModule],
  declarations: [LoginPageComponent],
})
export class LoginModule {}
