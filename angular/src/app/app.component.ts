import { Component } from '@angular/core';

import { ZFile } from './zfile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentDir: ZFile;

  onDirOpen(f: ZFile) {
    this.currentDir = f;
  }
}
