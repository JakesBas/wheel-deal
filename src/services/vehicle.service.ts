import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IVehicle } from 'types/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private firestore: Firestore = inject(Firestore);
  vehiclesCollection = collection(this.firestore, 'vehicles') as CollectionReference<IVehicle>;

  getVehicles$(): Observable<IVehicle[]> {
    return collectionData<IVehicle>(this.vehiclesCollection);
  }
}
