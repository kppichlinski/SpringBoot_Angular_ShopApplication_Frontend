import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'replace'
})
export class ReplacePipe implements PipeTransform {

    transform(value: any, stringToReplace: string, replacementString: string) {
        if (!value || !stringToReplace || !replacementString) {
            return value;
        }
        return value.replace(new RegExp(stringToReplace, 'g'), replacementString);
    }
}