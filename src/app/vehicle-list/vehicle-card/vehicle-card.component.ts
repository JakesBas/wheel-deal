import { Component, inject, Input } from '@angular/core'
import { map, switchMap, tap } from 'rxjs'
import { CartService } from 'services/cart.service'
import { IVehicle } from 'types/vehicle'

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent {
  @Input() vehicle!: IVehicle

  cartService = inject(CartService)

  isVehicleInCart$ = this.cartService.getCart$()
    .pipe(
      map((vehicles) => vehicles.findIndex((cartVehicle) => cartVehicle.id === this.vehicle.id) !== -1),
    )
  
  addToCart(vehicle: IVehicle) {
    this.cartService.addVehicleToCart(vehicle)
  }
}
