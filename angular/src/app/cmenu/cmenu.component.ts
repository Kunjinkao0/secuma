import { Component, OnInit } from '@angular/core';
import { CMenu } from './cmenu';
import { CMenuItem } from './cmenuitem';

@Component({
  selector: 'cmenu',
  templateUrl: './cmenu.component.html',
  styleUrls: ['./cmenu.component.css']
})
export class CMenuComponent implements OnInit {
  cmenu: CMenu;
  style: MenuStyle;

  constructor() { }

  ngOnInit() {
    this.cmenu = new CMenu();
    this.style = new MenuStyle();
    
    // test
    // let names = ['aaa', 'bbb', 'ccc', 'ddd'];
    // let menu = CMenu.simpleCMenu(0, 0, names);
    // this.setCMenu(menu);
  }

  setCMenu(m: CMenu) {
    this.cmenu = m;
  }

  onMenuItemClick(item: CMenuItem) {
    if(this.cmenu.onItemClickListener) {
      this.cmenu.onItemClickListener.onItemClicked(item);
    }
  }

  show() {
    this.showAt(this.cmenu.x, this.cmenu.y);
  }

  showAt(x: number, y: number) {
    this.style.left = x;
    this.style.top = y;
  }
}

class MenuStyle {
  left = 0;
  top = 0;
}
