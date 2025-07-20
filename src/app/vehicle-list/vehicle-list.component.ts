import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleService } from 'services/vehicle.service';
import { IVehicle } from 'types/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  private vehicleService = inject(VehicleService)
  vehicles$?: Observable<IVehicle[]>;

  ngOnInit(): void {
    this.vehicles$ = this.vehicleService.getFilteredVehicles$();
  }

  trackByVehicleId(index: number, vehicle: IVehicle): string {
    return vehicle.id;
  }
}
