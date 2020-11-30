import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "Grocery";
  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
    .subscribe(
      items => this.items = items,
      error => this.errorMessage = <any> error);
  }

  removeItem(item) {
    this.dataService.remove_item(item._id);
  }

  share_item(item) {
    console.log("sharing item - ", item);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name + "...",
      duration: 3000
    });

    toast.present();

    let message = "Grocery Item: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via my custom Groceries App";
    
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared successfully");
    }).catch((error) => {
      console.error("Error while sharing: ", error);
    });
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