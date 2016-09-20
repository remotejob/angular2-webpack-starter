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
    <button type="button" (click)="saveClient()">Click Me! get Some data from mongodb Server</button>

<div *ngIf="client">
    <h3>Articles:</h3>
    <ul>
  <li *ngFor="let item of client; let i = index">
    {{i}} {{item.Title}}
  </li>
</ul>
   
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
