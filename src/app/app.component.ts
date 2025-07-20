import { Component, inject, OnInit } from '@angular/core'
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore'
import { Observable, take } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wheel-deal'
  private firestore: Firestore = inject(Firestore)
  vehicles$?: Observable<any>
  data?: any[]

  constructor() {}

  ngOnInit(): void {
    const vehiclesRef = collection(this.firestore, 'vehicles')
    this.vehicles$ = collectionData(vehiclesRef) as Observable<any>


    this.vehicles$.subscribe((res) => console.log('res:', res))
  }
}
