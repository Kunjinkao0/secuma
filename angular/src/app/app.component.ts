import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ZFile } from './zfile';
import { FileUtils } from './provider/file.utils';
import { FTreeComponent } from './ftree/ftree.component';
import { FeditComponent } from './fedit/fedit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FileUtils]
})
export class AppComponent implements AfterViewInit {
  currentDir: ZFile;

  @ViewChild('ftree') ftree: FTreeComponent;
  @ViewChild('fedit') fedit: FeditComponent;

  coverShow = false;

  constructor(private futils: FileUtils) { }

  onDirOpen(f: ZFile) {
    this.currentDir = f;
  }

  toggleCoverLayer() {
    this.coverShow = !this.coverShow;
  }

  coverClick() {
    this.toggleCoverLayer();
  }

  ngAfterViewInit() {
    this.futils.readFile('assets/config/settings.json').then(res => {
      let settings = JSON.parse(res._body); // why _body??
      this.initialViewSettings(settings);
    });
  }

  private viewSettings;

  initialViewSettings(settings) {
    this.viewSettings = settings;
  }
}
