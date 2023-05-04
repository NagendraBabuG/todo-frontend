import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url : string = 'https://todo-api-eohf.onrender.com/api/getData'
  private urlEdit : string = 'https://todo-api-eohf.onrender.com/api/editData'
  private urlLocalhost : string = 'https://todo-api-eohf.onrender.com/createUser'
  public todo : string[] = [];
  public done : string[] = [];
  public inProgress : string[] = []
  constructor(private http: HttpClient) { }

  getData(params: any, token : any): Observable<any> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      queryParams = queryParams.set(key, params[key]);
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(this.url, { headers, params: queryParams });
  } 
  registerUser(params: any){
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.urlLocalhost, JSON.stringify(params), { headers });
  }
  editData(body : any, token : any) : Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization : `Bearer ${token}`
    })
    return this.http.put(this.urlEdit, JSON.stringify(body), {headers});

  }
}
