import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DateTimeUtil {
    public validateDate(dateString: string): boolean{
        const date = new Date(dateString);

        return !isNaN(date.getTime()) && date.toString() !== 'Invalid Date';
    }
}