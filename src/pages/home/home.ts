import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider) {

  }

  load_items() {
    return this.dataService.get_items();
  }

  remove_item(item, index) {
    console.log("removing item - ", index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + "...",
      duration: 3000
    });

    toast.present();
    this.dataService.remove_item(index);
  }

  edit_item(item, index) {
    console.log("editing item - ", index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + "...",
      duration: 3000
    });

    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  add_item() {
    console.log('Adding item');
    this.inputDialogService.showPrompt();
  }

  
}