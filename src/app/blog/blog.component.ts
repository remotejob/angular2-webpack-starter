import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpBlogService } from "./blog.service";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Blog` component loaded asynchronously');

@Component({
  selector: 'blog',
  providers: [HttpBlogService],
  styles: [`
  `],
  template: `
    <h1>Blog</h1>
    <button type="button" (click)="saveClient()">Click Me!</button>
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
    <div>
      <h3>
        patrick@AngularClass.com
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
<div *ngIf="client">
    <h3>Отправлены следующие данные:</h3>
    <ul>
  <li *ngFor="let item of client; let i = index">
    {{i}} {{item.Title}}
  </li>
</ul>

    <span class="label label-default">телефон:</span>&nbsp;{{client.Phone}}<br/><br/>
    <span class="label label-default">е-маил:</span>&nbsp;{{client.Email}}<br/><br/>
    <span class="label label-default">skype:</span>&nbsp;{{client.Skype}}<br/><br/>
   
</div>

  `
})
export class Blog {
  client: Object;
  localState: any;
  constructor(public route: ActivatedRoute,public _httpBlogService: HttpBlogService) {

  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then(json => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }


   saveClient(value: any) {

    

    this._httpBlogService.getEmailRestful("value.phone", "value.email", "value.skype")
      .subscribe(
      // data => this.sendClientToServer = JSON.stringify(data), // put the data returned from the server in our variable
      data => this.client = data,
      error => console.log("Error HTTP GET Service"), // in case of failure show this message
      () => console.log("OK")//run this code in all cases
      );
  }

}
