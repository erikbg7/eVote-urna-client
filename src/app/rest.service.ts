import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Table from 'src/models/Table';
import Response from '../models/Response';
import { HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { NewTableReq } from 'src/models/NewTableReq';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getTables (): Observable<Table[]> {
    return this.http.get<Table[]>(environment.urlBackEnd + '/user/tables');
  }

  newTable (tableReq: NewTableReq): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/newTable', tableReq);
  }

  splitKey(tableId: string, parts: number, threshold: number): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/split', {
      parts,
      threshold
    });
  }

  getPart(tableId: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/popPart', {
    });
  }

  startVoting(tableId: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/startVote', {
    });
  }

  stopVoting(tableId: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/stopVote', {
    });
  }

  pushPart(tableId: string, part: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/pushPart', {
      part
    });
  }

  recoverKey(tableId: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/recoverKey', {
    });
  }

  results(tableId: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/result', {
    });
  }

  getTable(tableId: string): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/admin/' + tableId + '/tableInfo', {
    });
  }

  addVote(tableId: string, vote: string, firmVote: string, identity: string, firmIdentity): Observable<Response> {
    return this.http.post<Response>(environment.urlBackEnd + '/user/' + tableId, {
      vote,
      firmVote,
      identity,
      firmIdentity
    });
  }
}
