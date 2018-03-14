import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import 'codemirror/mode/javascript/javascript';

declare const CodeMirror: any;

@Component({
  selector: 'editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css']
})
export class EditAreaComponent implements OnInit {

  private rawContent: string;
  private config = {
    lineNumbers: true,
    mode: "text/javascript"
  };

  @ViewChild('textarea') textArea: ElementRef;
  // @ViewChild('codemirror') codeMirror: ElementRef;

  setContent(c: string) {
    this.rawContent = c;

    this.editor.setValue(c);
    // this.editor.refresh();
  }

  maxHeight: string;

  constructor() {
  }

  editor: any;

  ngOnInit() {
    let mh = document.body.clientHeight - 40;
    this.maxHeight = `${mh}px`;


    // console.log(this.codeMirror.nativeElement)

    this.editor = CodeMirror.fromTextArea(document.getElementById('text-area'), this.config);
    this.editor.setSize("100%", "100%");
  }
}
