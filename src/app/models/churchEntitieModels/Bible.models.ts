export class Bible {
    book: string = "";
    chapter: number = 0;
    verses: Verse[] = [];
}

class Verse {
    number: number = 0;
    text: string = "";
}

