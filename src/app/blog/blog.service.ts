import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';


 @Injectable()
export class HttpBlogService {

private _emailUrl:string = "/job/fi_FI/blogi";
    constructor(private _http: Http){ }

   getEmailRestful(phone,email,skype){
       let headers = new Headers({ 'phone':phone,'email':email,'skype':skype });
       let options = new RequestOptions({ headers: headers, method: "get" });
 
        return this._http.get(this._emailUrl,options).map(res => res.json());
    }

  private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

}