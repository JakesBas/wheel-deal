import { Component, Input } from '@angular/core'
import { IVehicle } from 'types/vehicle'

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent {
  @Input() vehicle!: IVehicle
}
