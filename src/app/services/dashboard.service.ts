import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DashBoardService {
    private itemDashMonthName = "storageChurchFlowDashBoardName";

    getDashBoardMonth() : string {
        var yearMonth = localStorage.getItem(this.itemDashMonthName);
        if(yearMonth == null)
            yearMonth = `${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
        
        return yearMonth.toString();
    }

    setDashBoardMonth(yearMonth : string) {
        localStorage.removeItem(this.itemDashMonthName);
        localStorage.setItem(this.itemDashMonthName, yearMonth);
    }
}