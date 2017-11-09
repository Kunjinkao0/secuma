import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'basename' })
export class GetFileName implements PipeTransform {
    transform(value: string): string {
        if (!value) return value;

        let result = value;
        if (result.endsWith('/')) {
            result = result.substr(0, result.length - 1);
        }

        return result.split('/').pop();
    }
}

@Pipe({ name: 'bformat' })
export class ByteFormat implements PipeTransform {
    transform(size: number): string {
        if (size == 0) return '0b';

        const k = 1024;
        const units = ['b', 'kb', 'mb', 'gb'];

        let i = Math.floor(Math.log(size) / Math.log(k));
        let res = (size / Math.pow(k, i)).toPrecision(3);

        return res + '' + units[i];
    }
}