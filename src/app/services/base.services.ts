import { HttpClient } from "@angular/common/http";

export abstract class BaseService {

    constructor(private http: HttpClient) { }

    protected url : string = 'http://localhost:3000/v1';
}