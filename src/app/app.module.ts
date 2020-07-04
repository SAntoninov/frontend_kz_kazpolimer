import {AuthenticationService} from './services/authentication.service';

import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import {BasicAuthInterceptorService} from './services/basic-auth-interceptor.service';
import { UserComponent } from './components/user/user.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierEditComponent } from './components/supplier-edit/supplier-edit.component';
import { ApplicationAreasDialogComponent } from './components/application-areas-dialog/application-areas-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material/material.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { UserCategoryModalComponent } from './components/user-category-modal/user-category-modal.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {AuthGuardService} from './services/auth-guard.service';
import {SlideshowModule} from 'ng-simple-slideshow';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatDatepickerModule} from '@angular/material';


const appRoutes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService]},
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuardService]},
  { path: 'suppliers', component: SupplierListComponent, canActivate: [AuthGuardService]},
  { path: 'suppliers/:id', component: SupplierComponent, canActivate: [AuthGuardService]},
  { path: 'suppliers/:id/edit', component: SupplierEditComponent, canActivate: [AuthGuardService]},
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuardService]},
  { path: 'customers/:id', component: CustomerComponent, canActivate: [AuthGuardService]},
  { path: 'customers/:id/edit', component: CustomerEditComponent, canActivate: [AuthGuardService]},
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuardService]},
  { path: 'products/:id', component: ProductComponent, canActivate: [AuthGuardService]},
  { path: 'products/:id/edit', component: ProductEditComponent, canActivate: [AuthGuardService]},
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserListComponent,
    UserComponent,
    SupplierListComponent,
    SupplierComponent,
    SupplierEditComponent,
    ApplicationAreasDialogComponent,
    CustomerListComponent,
    CustomerComponent,
    CustomerEditComponent,
    ProductComponent,
    ProductListComponent,
    ProductEditComponent,
    UserCategoryModalComponent
    // SlideshowModule
  ],
  entryComponents: [ApplicationAreasDialogComponent, UserListComponent, UserCategoryModalComponent, UserComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    // AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    DemoMaterialModule,
    SlideshowModule,
    ImageCropperModule,
    MatDatepickerModule
  ],
  providers: [AuthenticationService, {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true
      }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
