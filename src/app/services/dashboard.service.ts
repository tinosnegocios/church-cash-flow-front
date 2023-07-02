import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DashBoardService {
    private itemDashMonthName = "sessionChurchFlowDashBoardName";

    getDashBoardMonth() : string {
        var yearMonth = sessionStorage.getItem(this.itemDashMonthName);
        if(yearMonth == null)
            yearMonth = `${new Date().getFullYear()}${new Date().getMonth().toString().padStart(2, '0') + 1}`;

        return yearMonth.toString();
    }

    setDashBoardMonth(yearMonth : string) {
        sessionStorage.removeItem(this.itemDashMonthName);
        sessionStorage.setItem(this.itemDashMonthName, yearMonth);
    }
}