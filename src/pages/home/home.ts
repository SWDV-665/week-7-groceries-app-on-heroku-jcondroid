import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "Grocery";

  items = [
    {
      name: "Milk"
      , quantity: 1
    }
    , {
      name: "Bread"
      , quantity: 2
    }
    , {
      name: "Butter"
      , quantity: 4
    }
  ]

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  remove_item(item, index) {
    console.log("removing item - ", index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + "...",
      duration: 3000
    });

    toast.present();
    this.items.splice(index, 1);
  }

  add_item() {
    console.log('Adding item');
    this.show_add_item_prompt();
  }

  show_add_item_prompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Grocery Item'
      , message: "Please enter grocery item..."
      , inputs: [
        {
          name: 'name'
          , placeholder: 'Grocery Name'
        }
        , {
          name: 'quantity'
          , placeholder: 'How many?'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
          , handler: item => {
            console.log('Cancel clicked');
          }
        }
        , {
          text: 'Save'
          , handler: item => {
            console.log('Save clicked', item);
            this.items.push(item);
          }

        }
      ]
    });

    prompt.present();
  }

}
