import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';

import { ZFile } from '../zfile';
import { FTreeService } from '../provider/ftree.service';
import { CMenu } from '../cmenu/cmenu';
import { MatMenuTrigger } from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ftree',
  templateUrl: './ftree.component.html',
  styleUrls: ['./ftree.component.css']
})
export class FTreeComponent implements OnInit {
  file: ZFile;
  ROOT = '/';
  @Output() dirOpenEvent: EventEmitter<ZFile> = new EventEmitter<ZFile>();
  @Output() fileOpenEvent: EventEmitter<ZFile> = new EventEmitter<ZFile>();

  constructor(
    private ftreeService: FTreeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getZFileDetail(this.ROOT);
  }

  getZFileDetail(path: string): void {
    setTimeout(() => {
      this._getZFileDetail(path);
    }, 300);
  }

  _getZFileDetail(path: string): void {
    this.ftreeService.openDir(path).then(file => {
      this.file = file;

      this.onDirOpen();
    });
  }

  onItemClick(f: ZFile): void {
    if (f.isDirectory) {
      this.getZFileDetail(f.path);
    } else {
      this.onFileOpen(f);
    }
  }

  onUpFolderClick(): void {
    let up = this.getUpperPath(this.file.path);
    this.getZFileDetail(up);
  }

  getUpperPath(path: string): string {
    if (path.endsWith('/')) {
      path = path.substr(0, path.length - 1);
    }

    let ps = path.split('/');
    let basename = ps[ps.length - 1];
    path = path.substr(0, path.length - basename.length);

    return path;
  }

  onDirOpen() {
    this.dirOpenEvent.emit(this.file);
  }

  onFileOpen(f: ZFile) {
    this.fileOpenEvent.emit(f);
  }

  createBtnClicked() {
    let dialogRef = this.dialog.open(NewFileDialog, {
      width: '250px',
      data: { fname: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  // onContextMenuClick(event, f) {
  //   event.preventDefault();
  // }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `  
  <h1 mat-dialog-title>Enter the file name:</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <input matInput [(ngModel)]="data.fname">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="data.fname" [disabled]="!data.fname">Ok</button>
    <button mat-button (click)="onNoClick()">Cancel</button>
  </div>`,
})
export class NewFileDialog {

  constructor(
    public dialogRef: MatDialogRef<NewFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}