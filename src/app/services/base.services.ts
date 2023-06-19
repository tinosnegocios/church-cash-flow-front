import { HttpClient } from "@angular/common/http";

export abstract class BaseService {

    constructor(protected http: HttpClient) { }

    protected url : string = 'https://localhost:7171/api';
}