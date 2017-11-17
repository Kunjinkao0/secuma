import { Component, ViewChild } from '@angular/core';

import { ZFile } from './zfile';
import { CMenuComponent } from './cmenu/cmenu.component';
import { CMenu } from './cmenu/cmenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentDir: ZFile;

  @ViewChild('contextmenu') contextMenu: CMenuComponent;

  coverShow = false;

  onDirOpen(f: ZFile) {
    this.currentDir = f;
  }

  showContextMenu(cmenu: CMenu) {
    this.toggleCoverLayer();

    this.contextMenu.setCMenu(cmenu);
    this.contextMenu.show();
  }

  toggleCoverLayer() {
    this.coverShow = !this.coverShow;
  }

  coverClick() {
    this.toggleCoverLayer();
  }
}
