import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ZFile } from '../zfile';
import { FTreeService } from '../provider/ftree.service';
import { CMenu } from '../cmenu/cmenu';

@Component({
  selector: 'ftree',
  templateUrl: './ftree.component.html',
  styleUrls: ['./ftree.component.css']
})
export class FTreeComponent implements OnInit {
  file: ZFile;
  ROOT = '/';
  @Output() dirOpenEvent: EventEmitter<ZFile> = new EventEmitter<ZFile>();
  @Output() fileOpenEvent: EventEmitter<ZFile> = new EventEmitter<ZFile>();
  @Output() contextMenuClickEvent: EventEmitter<CMenu> = new EventEmitter<CMenu>();
 
  constructor(
    private ftreeService: FTreeService
  ) { }

  ngOnInit() {
    this.getZFileDetail(this.ROOT);
  }

  getZFileDetail(path: string): void {
    this.ftreeService.openDir(path).then(file => {
      this.file = file;

      this.onDirOpen();
    });
  }

  onItemClick(f: ZFile): void {
    if (f.isDirectory) {
      this.getZFileDetail(f.path);
    } else {
      this.onFileOpen(f);
    }
  }

  onUpFolderClick(): void {
    let up = this.getUpperPath(this.file.path);
    this.getZFileDetail(up);
  }

  getUpperPath(path: string): string {
    if (path.endsWith('/')) {
      path = path.substr(0, path.length - 1);
    }

    let ps = path.split('/');
    let basename = ps[ps.length - 1];
    path = path.substr(0, path.length - basename.length);

    return path;
  }

  onDirOpen() {
    this.dirOpenEvent.emit(this.file);
  }

  onFileOpen(f: ZFile) {
    this.fileOpenEvent.emit(f);
  }

  onContextMenuClick(event, f) {
    event.returnValue = false;
    let menu = CMenu.simpleCMenu(event.clientX, event.clientY, MENU);
    menu.onItemClickListener = {
      onItemClicked: item => {
        console.log(item);
      }
    }
    this.contextMenuClickEvent.emit(menu);
  }
}

const MENU = ['Copy', 'Paste', 'New File', 'New Folder'];
