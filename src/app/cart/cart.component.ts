import { Component, inject } from "@angular/core";
import { CartService } from "services/cart.service";
import { IVehicle } from "types/vehicle";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartService = inject(CartService)
  cart$ = this.cartService.getCart$()

  removeFromCart(vehicle: IVehicle) {
    this.cartService.removeVehicleFromCart(vehicle)
  }

}
