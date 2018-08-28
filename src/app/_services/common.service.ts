import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private updateLists = new Subject<boolean>();
  updateListsObs = <Observable<boolean>>this.updateLists;

  constructor() { }

  updateListFn(mode : boolean ) {
    this.updateLists.next(mode);
  }
}
