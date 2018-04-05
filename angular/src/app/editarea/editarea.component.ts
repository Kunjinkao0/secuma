import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import 'codemirror/mode/javascript/javascript';
import {ActiveFileService} from "../fedit/activefile.service";
import {ActiveFile} from "../fedit/activefile";

declare const CodeMirror: any;

@Component({
  selector: 'editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.scss']
})
export class EditAreaComponent implements OnInit {

  constructor(private activeFileService: ActiveFileService) {
  }

  @ViewChild('textarea') textArea: ElementRef;

  private config = {
    lineNumbers: true,
    mode: "text/javascript"
  };

  private content: string;

  setContent(file: ActiveFile) {
    this.content = file.content;
    this.editor.setValue(this.content);
  }

  editor: any;

  ngOnInit() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('text-area'), this.config);
    this.editor.setSize("100%", "100%");
    // this.editor.on('change', editor => {
    //   let value = editor.getValue();
    //   console.log(value);
    // });
  }
}
