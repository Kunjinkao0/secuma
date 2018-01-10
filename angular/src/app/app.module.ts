import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FTreeComponent, NewFileDialog } from './ftree/ftree.component';
import { FTreeService } from './provider/ftree.service';
import { GetFileName, ByteFormat } from './provider/fformat.pipe';
import { FtitleComponent } from './ftitle/ftitle.component';
import { FeditComponent } from './fedit/fedit.component';
import { CMenuComponent } from './cmenu/cmenu.component';

import { ExportedMaterials } from './materials/materials-export';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, FTreeComponent, FtitleComponent,
    FeditComponent, CMenuComponent,
    GetFileName, ByteFormat, NewFileDialog
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    ExportedMaterials, NoopAnimationsModule
  ],
  entryComponents: [NewFileDialog],
  providers: [FTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
