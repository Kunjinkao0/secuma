import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FTreeService } from '../provider/ftree.service';
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
    private ftreeService: FTreeService
  ) { }

  ngOnInit() {
  }

  openFile(f: ZFile) {
    this.currFile = f;
    this.ftreeService.openFile(this.currFile.path, 'utf-8').then(res => {
      this.content = res.data;
    });
  }

  onSaveClicked() {
    if (!this.currFile) {
      return;
    }

    this.ftreeService.writeFile(this.currFile.path, this.content, 'utf-8')
      .then(res => {
        if(res.success == 'ok') {
          // success
        }
      });
  }
}
