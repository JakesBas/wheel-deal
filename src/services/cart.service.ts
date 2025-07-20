import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVehicle } from 'types/vehicle';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<IVehicle[]>([])

  addVehicleToCart(vehicle: IVehicle) {
    const currentCart = this.cartSubject.getValue()
    let updatedCart = [...currentCart]

    // only add vehicle to cart if the vehicle is not already in the cart
    if (currentCart.findIndex((cartVehicle) => cartVehicle.id === vehicle.id) === -1) {
      updatedCart = [...updatedCart, vehicle]
    }

    this.cartSubject.next(updatedCart)
  }

  removeVehicleFromCart(vehicle: IVehicle) {
    const currentCart = this.cartSubject.getValue()
    const updatedCart = currentCart.filter((cartVehicle) => cartVehicle.id !== vehicle.id)
    this.cartSubject.next(updatedCart)
  }

  getCart$() {
    return this.cartSubject.asObservable()
  }

}
