import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FileService } from '../provider/file.service';
import { ZFile } from '../zfile';

@Component({
  selector: 'fedit',
  templateUrl: './fedit.component.html',
  styleUrls: ['./fedit.component.css']
})
export class FeditComponent implements OnInit {
  currFile: ZFile;
  content: string;

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() {
  }

  openFile(f: ZFile) {
    this.currFile = f;
    this.fileService.openFile(this.currFile.path, 'utf-8').subscribe(res => {
      this.content = res.data;
    });
  }

  onSaveClicked() {
    if (!this.currFile) {
      return;
    }

    this.fileService.writeFile(this.currFile.path, this.content, 'utf-8')
      .subscribe(res => {
        if (res.success == 'ok') {
          // success
        }
      });
  }
}
