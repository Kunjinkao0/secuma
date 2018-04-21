import {Injectable} from "@angular/core";
import {ActiveFile} from "./activefile";
import {ZFile} from "../zfile";

@Injectable()
export class ActiveFileService {
  private activatedFiles: ActiveFile[];

  public addActiveFile(file: ZFile) : ActiveFile {
    let activeF = new ActiveFile(file);
    this.activatedFiles.push(activeF);

    return activeF;
  }

  public getAllActivated(): ActiveFile[] {
    return this.activatedFiles;
  }

  public getActivatedFile(file: ZFile): ActiveFile {
    let activeF = null;
    this.activatedFiles.forEach(af => {
      if (af.file.path === file.path) activeF = af;
    });

    return activeF;
  }

  public isFileActivated(file: ZFile): boolean {
    return this.getActivatedFile(file) != null;
  }

  /*public delActivateFile(name1:String ,rf:ActiveFile[]){

    for(var i=0;i<=rf.length-1;i++){
      var name=rf[i].file.name;
      alert(name==name1);
      if(name == name1 && (rf.length-1)> 0){
        var TEMP=rf[i];
        for(var l=0;l<(rf.length-1)-i;l++){
          rf[i+l]=rf[i+l+1];
          alert(i+1);
        }
        rf[rf.length-1]=TEMP;
        alert(rf[i].content);
        break;
      }

    }
rf.pop();
  }*/

  public clear() {
    this.activatedFiles = [];
  }
}
