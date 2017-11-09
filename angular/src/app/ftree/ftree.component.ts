import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ZFile } from '../zfile';
import { FTreeService } from '../provider/ftree.service';

@Component({
  selector: 'ftree',
  templateUrl: './ftree.component.html',
  styleUrls: ['./ftree.component.css']
})
export class FTreeComponent implements OnInit {
  file: ZFile;
  ROOT = '/';
  @Output() currentDirOpenEvent = new EventEmitter<ZFile>();

  constructor(
    private ftreeService: FTreeService
  ) { }

  ngOnInit() {
    this.getZFileDetail(this.ROOT);
  }

  getZFileDetail(path: string): void {
    this.ftreeService.getZFileDetail(path).then(file => {
      this.file = file;
    });
  }

  onItemClick(f: ZFile): void {
    if (f.isDirectory) {
      this.getZFileDetail(f.path);
    } else {
      console.log('open file: ' + f.path);
    }
  }

  onUpFolderClick(): void {
    let up = this.getUpperPath(this.file.path);
    this.getZFileDetail(up);
  }

  getUpperPath(path: string): string {
    if(path.endsWith('/')) {
      path = path.substr(0, path.length - 1);
    }

    let ps = path.split('/');
    let basename = ps[ps.length - 1];
    path = path.substr(0, path.length - basename.length);

    return path;
  }

  onCurrentDirOpen(file: ZFile): void {
    this.currentDirOpenEvent.emit(file);
  }
}
