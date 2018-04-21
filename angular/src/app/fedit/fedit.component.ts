import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';

import {FileService} from '../provider/file.service';
import {ZFile} from '../zfile';
import {ActiveFileService} from "./activefile.service";
import {ActiveFile} from "./activefile";
import {EditAreaComponent} from "../editarea/editarea.component";

@Component({
  selector: 'fedit',
  templateUrl: './fedit.component.html',
  styleUrls: ['./fedit.component.scss'],
  providers: [ActiveFileService]
})
export class FeditComponent implements OnInit {
  currFile: ZFile;
 // private activatedFiles: ActiveFile[];

  @ViewChild('editarea') editAreaComponent: EditAreaComponent;

  constructor(private fileService: FileService,
              public activeFileService: ActiveFileService) {

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
  onCloseClicked(name1:String, rf: ActiveFile[]){
    //获取Id

   // alert(rf[0].file.name);
    let fileNameAll=name1;
    let fileName=fileNameAll.split(/\//);
    let idValue=fileName[5];

    var tabToClase=document.getElementById(idValue);
    tabToClase.remove();
    //this.activeFileService.delActivateFile(name1,rf);
    var a=this.activeFileService.getAllActivated();



    for(var i=0;i<=a.length-1;i++){
      var name=a[i].file.name;
      if(name == name1 && (a.length-1)> 0 && i!=(a.length-1)){
        var TEMP=a[i];
        for(var l=0;l<(a.length-1)-i;l++){
          a[i+l]=a[i+l+1];
        }
        a[a.length-1]=TEMP;
        let runningFile = this.activeFileService.getActivatedFile(a[i].file);
        this.editAreaComponent.setContent(runningFile);
        a.pop();
        break;
      }else if (name==name1 && (a.length-1)==0){
        a.pop();
        let runningFile = this.activeFileService.getActivatedFile(a[i].file);
        this.editAreaComponent.setContent(runningFile);
        break;
      }else if (name==name1 && (a.length-1)==i&& i!=0){
        a.pop();
        let runningFile = this.activeFileService.getActivatedFile(a[i-1].file);
        this.editAreaComponent.setContent(runningFile);
        break;
        //测试上传使用

      }

    }





  }
}
