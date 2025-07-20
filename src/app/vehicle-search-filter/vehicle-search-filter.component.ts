import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { distinct, map, Observable, startWith, switchMap, take, tap, toArray } from "rxjs";
import { VehicleService } from "services/vehicle.service";

@Component({
  selector: 'app-vehicle-search-filter',
  templateUrl: './vehicle-search-filter.component.html',
  styleUrls: ['./vehicle-search-filter.component.scss']
})
export class VehicleSearchFilterComponent implements OnInit {
  private vehicleService = inject(VehicleService)
  fb = inject(FormBuilder)
  manufacturers$: Observable<string[]> | undefined
  bodyStyles$: Observable<string[]> | undefined
  selectedManufacturer = new FormControl('any', [Validators.required])

  searchFilterForm = this.fb.group({
    manufacturer: ['any', Validators.required],
    bodyStyle: ['any', Validators.required],
    // priceRangeLow: [0, Validators.required],
    // priceRangeHigh: [0, Validators.required]
  })

  ngOnInit(): void {
    this.manufacturers$ = this.vehicleService.getVehicles$()
      .pipe(
        take(1),
        switchMap((vehicles) => vehicles),
        map((vehicle) => vehicle.make),
        distinct(),
        toArray(),
        map((manufacturers) => manufacturers.sort())
      )

    this.bodyStyles$ = this.vehicleService.getVehicles$()
      .pipe(
        take(1),
        switchMap((vehicles) => vehicles),
        map((vehicle) => vehicle.body),
        distinct(),
        toArray(),
        map((bodyStyle) => bodyStyle.sort())
      )

    this.vehicleService.setFilter(
      this.searchFilterForm.valueChanges.pipe(
        startWith(this.searchFilterForm.value)
      )
    )
  }

  trackByManufacturer(index: number, manufacturer: string) {
    return manufacturer
  }

  trackByBodyStyle(index: number, bodyStyle: string) {
    return bodyStyle
  }
}
