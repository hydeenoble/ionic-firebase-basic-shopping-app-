import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {ShoppingItemInterface} from "../../models/shopping-item/shopping-item.interface";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItemInterface[]>;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetControl: ActionSheetController) {

    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  navigateToAddShoppingPage(): void {
    this.navCtrl.push('AddShoppingPage')
  }

  selectShopppingItem(shoppingItem: ShoppingItemInterface){
    this.actionSheetControl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push('EditShoppingItemPage', {
              shoppingItemId: shoppingItem.$key
            })
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('The user has selected teh cancel button')
          }
        },

      ]
    }).present();
  }

}
