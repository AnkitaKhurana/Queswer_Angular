import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private apiService: ApiService) { }

  get(){
    return this.apiService.get('/tag/all').pipe(
      map(
        data=>{ return data.json()}
      ));
  }

}
