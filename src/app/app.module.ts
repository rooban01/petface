import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DogComponent } from './components/dog/dog.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PackagesComponent } from './layouts/packages/packages.component';
import { StoryComponent } from './layouts/story/story.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import  { MatInputModule }   from '@angular/material/input';
import  { MatCardModule }   from '@angular/material/card';
import  { MatButtonModule }   from '@angular/material/button';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatTabsModule} from '@angular/material/tabs';

// import { MatRadioModule } from '@angular/material/radio';




import { FlexLayoutModule } from '@angular/flex-layout';
import { FeaturesComponent } from './layouts/features/features.component';
import { StoryLeftComponent } from './layouts/story-left/story-left.component';
import { DogItemComponent } from './components/dog-item/dog-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DogComponent,
    HeaderComponent,
    FooterComponent,
    PackagesComponent,
    StoryComponent,
    MenuComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FeaturesComponent,
    StoryLeftComponent,
    DogItemComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     BrowserAnimationsModule,
     ReactiveFormsModule,
     FormsModule,
     HttpClientModule,

      MatToolbarModule,
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatCarouselModule,
      MatTabsModule,

      // MatRadioModule,

      FlexLayoutModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
