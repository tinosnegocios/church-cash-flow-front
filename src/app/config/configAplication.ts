import configData from './settings/settings-prd.json';

export class configAplication {
  private static config: any;

  static loadConfig() {
    var obj : any = configData;
  }

  static getConfig() {
    return configAplication.config;
  }

  static getApiHosy() {
    return configData.api.host;
  }

  static getObjCloudConfig(){
    return configData.cloudServices;
  }
}
