import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { CartModalPage } from './cart-modal/cart-modal.page';
import { CartModalPageModule } from './cart-modal/cart-modal.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
 declarations: [AppComponent],
 entryComponents: [],
 imports: [
 BrowserModule,
 IonicModule.forRoot(),
 AppRoutingModule,
 AngularFireModule.initializeApp(environment.firebaseConfig),
 AngularFireAuthModule,
 CartModalPageModule,
 ],
 providers: [
 StatusBar,
 SplashScreen,
 { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
],
bootstrap: [AppComponent]
})
export class AppModule {}