import {Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, AfterViewInit} from '@angular/core';
import {Inject} from '@angular/core';

import {ZFile} from '../zfile';
import {FileService} from '../provider/file.service';
import {CdkOverlayOrigin, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {CdkPortal, ComponentPortal, Portal} from '@angular/cdk/portal';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'ftree',
  templateUrl: './ftree.component.html',
  styleUrls: ['./ftree.component.scss']
})
export class FTreeComponent implements OnInit, AfterViewInit {
  file: ZFile;
  ROOT = '/';
  @Output() dirOpenEvent: EventEmitter<ZFile> = new EventEmitter<ZFile>();
  @Output() fileOpenEvent: EventEmitter<ZFile> = new EventEmitter<ZFile>();

  constructor(private fileService: FileService,
              public dialog: MatDialog,
              public overlay: Overlay, public viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.getZFileDetail(this.ROOT);
    }
  }

  ngAfterViewInit() {
    this.calListHeight();
  }

  listWidth: string;

  calListHeight() {
    let w = 200;
    this.listWidth = `${w}px`;
  }

  getZFileDetail(path: string): void {
    // setTimeout(() => {
      this._getZFileDetail(path);
    // }, 300);
  }

  _getZFileDetail(path: string): void {
    this.fileService.openDir(path).subscribe(data => {
      // this.file = data;
      let folders = [], files = [];
      data.children.sort((f1, f2) => {
        return f1.name.localeCompare(f2.name);
      })
      data.children.forEach(item => {
        if (item.isDirectory) {
          folders.push(item);
        } else {
          files.push(item);
        }
      });
      data.children = folders.concat(files);
      this.file = data;

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
      data: {fname: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  onContextMenuClick(e: MouseEvent, f: ZFile) {
    e.preventDefault();

    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    config.positionStrategy = this.overlay.position()
      .global()
      .left(`${e.clientX}px`)
      .top(`${e.clientY}px`);

    let overlayRef = this.overlay.create(config);
    overlayRef.attach(new ComponentPortal(ContextMenuPanel, this.viewContainerRef));
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}

@Component({
  selector: 'dialog-new-file',
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

  constructor(public dialogRef: MatDialogRef<NewFileDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

/** Simple component to load into an overlay */
@Component({
  moduleId: module.id,
  selector: 'ftree-ctx-menu',
  template: `
    <mat-nav-list class="noselect" id="menu">
      <mat-list-item (contextmenu)="$event.preventDefault()">
        <span>New File</span>
      </mat-list-item>
      <mat-list-item (contextmenu)="$event.preventDefault()">
        <span>Delete File</span>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [`
    #menu {
      background: white;
      border-radius: 2px;
      box-shadow: 1px 1px 2px #CCC;
    }
  `]
})
export class ContextMenuPanel {
  value: number = 9000;
}
