// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items = [
  ]

  // constructor(public http: HttpClient) {
  constructor() {
    console.log('Hello GroceriesServiceProvider Provider');
  }

  get_items() {
    return this.items;
  }

  remove_item(index) {
    this.items.splice(index, 1);
  }

  add_item(item) {
    this.items.push(item);
  }

  edit_item(item, index) {
    this.items[index] = item;
  }

}
