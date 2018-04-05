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

  public clear() {
    this.activatedFiles = [];
  }
}
