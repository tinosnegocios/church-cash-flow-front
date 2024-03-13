import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.services";
import { DashBoardService } from "./dashboard.service";

export class OfferingService extends BaseService {
    dashBoardServices: DashBoardService;
    
    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
      super(http);
      this.dashBoardServices = dashBoardServices;
      this.modelName = "meeting-kind";
    }

}