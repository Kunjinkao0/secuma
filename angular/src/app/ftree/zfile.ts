export class ZFile {
    path: string;
    name: string;
    size? = 0;
    isDirectory: boolean;
    ctime? = 0;
    mtime? = 0;
    parent?: ZFile;
    children?: ZFile[];
}