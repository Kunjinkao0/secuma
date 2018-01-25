import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContextMenuPanel, FTreeComponent, NewFileDialog } from './ftree/ftree.component';
import { FileService } from './provider/file.service';
import { GetFileName, ByteFormat } from './provider/fformat.pipe';
import { FtitleComponent } from './ftitle/ftitle.component';
import { FeditComponent } from './fedit/fedit.component';

import { ExportedMaterials } from './materials/materials-export';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BasicAuthInterceptor } from './provider/basicauth.interceptor';

@NgModule({
  declarations: [
    AppComponent, FTreeComponent, FtitleComponent,
    FeditComponent, GetFileName, ByteFormat, NewFileDialog, ContextMenuPanel
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    ExportedMaterials, NoopAnimationsModule
  ],
  entryComponents: [NewFileDialog, ContextMenuPanel],
  providers: [FileService, {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
