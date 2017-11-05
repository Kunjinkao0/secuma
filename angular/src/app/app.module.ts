import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FTreeComponent } from './ftree/ftree.component';
import { FTreeService } from './ftree/ftree.service';
import { GetFileName, ByteFormat } from './ftree/fformat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FTreeComponent,
    GetFileName, ByteFormat
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [FTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
