import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore, query, where } from '@angular/fire/firestore';
import { Observable, shareReplay, switchMap, tap } from 'rxjs';
import { IVehicle, IVehicleFilter } from 'types/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private firestore: Firestore = inject(Firestore);
  vehiclesCollection = collection(this.firestore, 'vehicles') as CollectionReference<IVehicle>;
  vehicleCollectionData$ = collectionData<IVehicle>(
    this.vehiclesCollection, { idField: 'id' }
  ).pipe(
      tap(console.log),
      shareReplay(),
    );

  filter$: Observable<Partial<IVehicleFilter>> | undefined

  getVehicles$(): Observable<IVehicle[]> {
    return this.vehicleCollectionData$.pipe(
      shareReplay()
    )
  }

  getFilteredVehicles$(): Observable<IVehicle[]> | undefined  {
    return this.filter$?.pipe(
      switchMap((filter) => {
        const constraints = []

        if (filter.manufacturer != 'any') {
          constraints.push(where('make', '==', filter.manufacturer))
        }

        if (filter.bodyStyle != 'any') {
          constraints.push(where('body', '==', filter.bodyStyle))
        }

        if (filter.priceRangeLow) {
          constraints.push(where('price', '>=', filter.priceRangeLow))
        }

        if (filter.priceRangeHigh) {
          constraints.push(where('price', '<=', filter.priceRangeHigh))
        }

        const vehiclesQuery = query(this.vehiclesCollection, ...constraints)
        return collectionData<IVehicle>(vehiclesQuery, { idField: 'id' })
      })
    )
  }

  setFilter(filter$: Observable<Partial<IVehicleFilter>>): void {
    this.filter$ = filter$
  }
}
