import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';

import {FileService} from '../provider/file.service';
import {ZFile} from '../zfile';
import {ActiveFileService} from "./activefile.service";
import {ActiveFile} from "./activefile";
import {EditAreaComponent} from "../editarea/editarea.component";

@Component({
  selector: 'fedit',
  templateUrl: './fedit.component.html',
  styleUrls: ['./fedit.component.css'],
  providers: [ActiveFileService]
})
export class FeditComponent implements OnInit {
  currFile: ZFile;

  @ViewChild('editarea') editAreaComponent: EditAreaComponent;

  constructor(private fileService: FileService,
              private activeFileService: ActiveFileService) {
    // for (let i = 0; i < 5; i++) {
    //   this.runningFiles.push({
    //     file: {
    //       path: '',
    //       name: 'fff' + i,
    //       isDirectory: false
    //     }
    //   });
    // }
  }

  ngOnInit() {
    this.activeFileService.clear();
  }

  openFile(f: ZFile) {
    this.currFile = f;

    if (this.activeFileService.isFileActivated(f)) {
      this.renderActivatedFile();
    } else {
      let activeF = this.activeFileService.addActiveFile(f);

      this.fileService.openFile(this.currFile.path, 'utf-8').subscribe(res => {
        activeF.content = res.data;

        this.renderActivatedFile();
      });
    }
  }

  private renderActivatedFile() {
    let runningFile = this.activeFileService.getActivatedFile(this.currFile);
    this.editAreaComponent.setContent(runningFile);
  }

  private onTabClicked(activeF: ActiveFile) {
    this.openFile(activeF.file);
  }

  // onSaveClicked() {
  //   if (!this.currFile) {
  //     return;
  //   }
  //
  //   this.fileService.writeFile(this.currFile.path, this.editContent, 'utf-8')
  //     .subscribe(res => {
  //       if (res.success == 'ok') {
  //         this.getRunningFile(this.currFile).content = this.editContent;
  //       }
  //     });
  // }

  // onCloseClicked() {
  //   // remove item
  //   let arr = this.runningFiles.filter(item => {
  //       return item !== this.getRunningFile(this.currFile);
  //     }
  //   );
  //   this.runningFiles = arr;
  // }
}
