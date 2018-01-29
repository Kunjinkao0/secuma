import { Component, ViewChild, OnInit, AfterViewInit, Inject } from '@angular/core';

import { ZFile } from './zfile';
import { FileService } from './provider/file.service';
import { FTreeComponent } from './ftree/ftree.component';
import { FeditComponent } from './fedit/fedit.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FileService]
})
export class AppComponent implements OnInit, AfterViewInit {
  currentDir: ZFile;

  @ViewChild('ftree') ftree: FTreeComponent;
  @ViewChild('fedit') fedit: FeditComponent;

  coverShow = false;

  constructor(
    private futils: FileService, public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onDirOpen(f: ZFile) {
    this.currentDir = f;
  }

  toggleCoverLayer() {
    this.coverShow = !this.coverShow;
  }

  coverClick() {
    this.toggleCoverLayer();
  }

  ngAfterViewInit() {
    // this.futils.readFile('assets/config/settings.json').subscribe(res => {
    //   let settings = JSON.parse(res._body); // why _body??
    //   this.initialViewSettings(settings);
    // });

    if (!localStorage.getItem('token')) {
      setTimeout(() => {
        this.showLogin();
      }, 500);
    }
  }

  private showLogin() {
    let loadingDlgRef = this.dialog.open(LoginDialog, {
      width: '260px',
      disableClose: true,
      data: {}
    });
    loadingDlgRef.afterClosed().subscribe(data => {
      location.reload();
    });
  }

  private viewSettings;

  initialViewSettings(settings) {
    this.viewSettings = settings;
  }
}

@Component({
  selector: 'dialog-login',
  template: `
    <div mat-dialog-content>
      <mat-form-field style="width: 200px">
        <input matInput [(ngModel)]="data.username" placeholder="Username">
      </mat-form-field>
      <mat-form-field style="width: 200px">
        <input matInput [(ngModel)]="data.password" placeholder="Password">
      </mat-form-field>
    </div>
    <button mat-raised-button color="primary" (click)="onLoginBtnClick()" style="width: 200px" [disabled]="!data.username || !data.password">Login</button>
      `,
})
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService
  ) { }

  onLoginBtnClick(): void {
    this.fileService.login(this.data.username, this.data.password).subscribe(data => {
        this.dialogRef.close();
    });
  }
}