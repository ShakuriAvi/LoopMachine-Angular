import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppSettingsService {

   constructor(private http: HttpClient) {}
     getData(url:any): Observable<any> {
        return this.http.get<any>(url);
    }
    // public getJSON(): Observable<any> {
    //     return this.http.get("../assets/lstNameAudio.json");
    // }
}


