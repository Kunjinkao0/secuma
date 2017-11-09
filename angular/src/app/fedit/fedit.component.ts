import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FTreeService } from '../provider/ftree.service';
import { ZFile } from '../zfile';

@Component({
  selector: 'fedit',
  templateUrl: './fedit.component.html',
  styleUrls: ['./fedit.component.css']
})
export class FeditComponent implements OnInit {
  content: string;

  constructor(
    private ftreeService: FTreeService
  ) { }

  ngOnInit() {
  }

  openFile(f: ZFile) {
    let path = f.path;
    this.ftreeService.openFile(path, 'utf-8').then(res => {
      console.log(res);
      this.content = res;
    });
  }
}
