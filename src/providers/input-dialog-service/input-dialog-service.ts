import { Injectable } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    // Set default values
    var promptTitle = 'Add Grocery Item';
    var promptMessage = "Add grocery item...";
    var promptNameValue = null;
    var promptQuantityValue = null;

    // Update values if editing an item
    if (item) {
      promptTitle = 'Edit Grocery Item';
      promptMessage = "Edit grocery item...";
      promptNameValue = item.name;
      promptQuantityValue = item.quantity;
    }

    const prompt = this.alertCtrl.create({
      title: promptTitle
      , message: promptMessage
      , inputs: [
        {
          name: 'name'
          , placeholder: 'Grocery Name'
          , value: promptNameValue
        }
        , {
          name: 'quantity'
          , placeholder: 'How many?'
          , value: promptQuantityValue
        }
      ],
      buttons: [
        {
          text: 'Cancel'
          , handler: data => {
            console.log('Cancel clicked');
          }
        }
        , {
          text: 'Save'
          , handler: data => {
            // console.log('Save clicked', item);
            console.log('Save Handler: ', data);
            // console.log('Quantity: ', item.quantity);
            // Only add/edit the item if all fields have values
            // if(item.name !== "" && item.quantity !== "") {
              if (index !== undefined) {
                item.name = data.name;
                item.quantity = data.quantity;
                this.dataService.edit_item(item, index);
              } else {
                this.dataService.add_item(data);
              }
            // }

          }

        }
      ]
    });

    prompt.present();
  }

}
