import {Component, OnInit, Input, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css']
})
export class EditAreaComponent implements OnInit {

  rawContent: string;

  @ViewChild('cdiv') cdiv: ElementRef;

  set content(content: string) {
    this.rawContent = content;

    this.processContent(content);
  }

  styledContent: string;
  lines: number[];

  maxHeight: string;

  constructor(private el: ElementRef,
              private render: Renderer2) {
    this.lines = [];
  }

  ngOnInit() {
    let mh = document.body.clientHeight - 40;
    this.maxHeight = `${mh}px`;
  }

  processContent(content: string) {
    let arrContent: string[] = content.split('\n');
    this.lines = Array.from(Array(arrContent.length).keys()).map(x => ++x);

    arrContent = arrContent.map(lineText =>
      `<div class="cline"><pre>${lineText}</pre></div>`
    );

    this.styledContent = arrContent.join('');
  }

  onEditTextChanged(changedText: string) {
    // let pos = this.cdiv.nativeElement.selectionStart;

    // console.log(document.getSelection())
    // this.processContent(changedText);
    // setTimeout(() => {
    //   this.cdiv.nativeElement.selectionStart = pos;
    //   this.cdiv.nativeElement.selectionEnd = pos;
    // });
  }
}
