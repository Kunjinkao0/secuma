import {ZFile} from "../zfile";

export class ActiveFile {
  constructor(public file: ZFile, public content?: string) {

  }
}
