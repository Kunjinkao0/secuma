import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';

import {FileService} from '../provider/file.service';
import {ZFile} from '../zfile';
import {FeditService} from "./fedit.service";
import {RunningFile} from "./runningfile";
import {EditAreaComponent} from "../editarea/editarea.component";

@Component({
  selector: 'fedit',
  templateUrl: './fedit.component.html',
  styleUrls: ['./fedit.component.css'],
  providers: [FeditService]
})
export class FeditComponent implements OnInit {
  currFile: ZFile;
  runningFiles: RunningFile[];

  @ViewChild('editarea') editAreaComponent: EditAreaComponent;

  constructor(private fileService: FileService,
              private feditService: FeditService) {
    this.runningFiles = [];

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
  }

  openFile(f: ZFile) {
    // file utils here: check two file is the samedf
    this.currFile = f;

    if (this.isFileRunning(f)) {
      this.activateTab(f);
    } else {
      let rf = new RunningFile();
      rf.file = f;
      this.runningFiles.push(rf);

      this.fileService.openFile(this.currFile.path, 'utf-8').subscribe(res => {
        rf.content = res.data;

        this.activateTab(f);
      });
    }
  }

  private isFileRunning(file: ZFile): boolean {
    return this.getRunningFile(file) != null;
  }

  private activateTab(file: ZFile) {
    this.currFile = file;

    this.onFileOpened();
  }

  private onFileOpened() {
    let content = this.getRunningFile(this.currFile).content;
    this.editAreaComponent.content = content;
  }

  private getRunningFile(file: ZFile): RunningFile {
    let runningFile = null;
    this.runningFiles.forEach(rf => {
      if (rf.file.path == file.path) runningFile = rf;
    });

    return runningFile;
  }

  onTabClicked(rf: RunningFile) {
    this.openFile(rf.file);
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
