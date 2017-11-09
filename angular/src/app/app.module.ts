import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FTreeComponent } from './ftree/ftree.component';
import { FTreeService } from './provider/ftree.service';
import { GetFileName, ByteFormat } from './provider/fformat.pipe';
import { FtitleComponent } from './ftitle/ftitle.component';
import { FeditComponent } from './fedit/fedit.component';

@NgModule({
  declarations: [
    AppComponent,
    FTreeComponent,
    GetFileName, ByteFormat, FtitleComponent, FeditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [FTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
