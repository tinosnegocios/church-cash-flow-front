export class ImageMethods {
    private limitSize : number;
    private msgErros : string = "";

  constructor(limitSize : number) {
    this.limitSize = limitSize;
  }  

  public convertToBase64(file : any) : Promise<string> {
    
    return new Promise((resolve, reject) => {
        if (file.size > this.limitSize) {
            var sizeMb = ((file.size / 1024)).toFixed(0);
            var sizeFormated = sizeMb.substring(0,1) +"."+""+sizeMb.substring(1,sizeMb.length) + "MB"
            this.msgErros = "Imagem não adicionada. O limite é de 2MB e o enviado é " + sizeFormated + ". Tente renderiza-la";
            
            resolve("");
          }      

          if (file) {
            const reader = new FileReader();
      
            reader.onload = (e: any) => {
                const base64 = e.target.result;
               
               resolve(base64);
            };

            reader.onerror = (e) => {
                this.msgErros = "Ocorreu um erro ao ler a imagem. Tente novamente";
                reject("Erro ao ler o arquivo");
            };

            reader.readAsDataURL(file);
          }
    });

  }

  public getErro(): string {
    return this.msgErros;
  }

}