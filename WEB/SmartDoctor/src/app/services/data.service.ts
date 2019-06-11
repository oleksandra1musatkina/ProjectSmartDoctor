import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject(null);
  data = this.dataSource.asObservable();

  constructor() {
  }

  setData(data: {}) {
    this.dataSource.next(data);
  }
}
