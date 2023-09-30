import { Injectable } from "@angular/core";
import { configAplication } from "../config/configAplication";

@Injectable({
    providedIn: 'root'
  })
  
export class CloudService {

    public getUrlImageMembersStorage(imageName:string) : string {
        var urlBucket = configAplication.getObjCloudConfig().aws.bucketS3.images.url;
        var path = configAplication.getObjCloudConfig().aws.bucketS3.images.membersPath;
        var extensionImage = configAplication.getObjCloudConfig().aws.bucketS3.images.imageTypePattern;
        var url = `${urlBucket}/${path}/${imageName}.${extensionImage}`;

        return url;
    }

    public getUrlImageOfferingsStorage(imageName:string) : string {
        var urlBucket = configAplication.getObjCloudConfig().aws.bucketS3.images.url;
        var path = configAplication.getObjCloudConfig().aws.bucketS3.images.offeringPath;
        var extensionImage = configAplication.getObjCloudConfig().aws.bucketS3.images.imageTypePattern;
        var url = `${urlBucket}/${path}/${imageName}.${extensionImage}`;

        return url;
    }

    public getImageStore(path:string, imageName:string) : string {
        var urlBucket = configAplication.getObjCloudConfig().aws.bucketS3.images.url;
        var extensionImage = configAplication.getObjCloudConfig().aws.bucketS3.images.imageTypePattern;

        var url = `${urlBucket}/${path}/${imageName}.${extensionImage}`;
        console.log(url);
        
        return `${urlBucket}/${path}/${imageName}.${extensionImage}`;

    }

}