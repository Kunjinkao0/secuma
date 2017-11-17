import { CMenuItem } from './cmenuitem';

export interface OnCMenuItemClickListener {
    onItemClicked(citem: CMenuItem);
}