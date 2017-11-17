import { CMenuItem } from "./cmenuitem";
import { OnCMenuItemClickListener } from "./cmenuitemclicklistener";

export class CMenu {
    x = 0;
    y = 0;
    private _items: CMenuItem[] = [];
    set items(items: CMenuItem[]) {
        for (let i = 0; i < items.length; i++) {
            let item = new CMenuItem();
            item.index = i;
            item.name = items[i].name;
            this._items.push(item);
        }
    }

    get items() {
        return this._items;
    }

    onItemClickListener?: OnCMenuItemClickListener;

    constructor() { }

    static simpleCMenu(x: number, y: number, names: string[]): CMenu {
        let cm = new CMenu();
        cm.x = x;
        cm.y = y;
        let items = [];
        names.forEach(n => {
            let item = { name: n };
            items.push(item);
        });
        cm.items = items;

        return cm;
    }
}