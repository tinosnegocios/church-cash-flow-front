import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StringUtil {
    public isNumeric(input: string): boolean {
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(input);
    }
}