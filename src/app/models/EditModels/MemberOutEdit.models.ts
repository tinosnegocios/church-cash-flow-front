export class MemberOutEditDto {
    reason: string = "";
    day: string = "";

    constructor(reason: string, day: string) {
        this.reason = reason;
        this.day = day;
    }
}