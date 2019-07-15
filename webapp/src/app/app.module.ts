import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RowInputComponent } from './shared/row-input/row-input.component';
import { RegisterComponent } from './register/register.component';
import { routes } from './routes';

@NgModule({
   declarations: [
      AppComponent,
      RowInputComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
