import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  baseUrl:string= 'http://localhost:3000'
  apiKey:any
  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'X-RapidAPI-Key': this.apiKey,
  //     'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
  //   });
  // }

  private getSiteHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  private siteHeadersToken(token:string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    });
  }

  logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    
  }
  setToken(data:any):void{
    sessionStorage.setItem('token',data);
  }
  getToken(){
    return sessionStorage.getItem('token');
  }
  storeUserData(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    console.log(userData)
  }
  getUserData() {
    const data = sessionStorage.getItem('userData');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  postWithoutToken(body:any,endpoint:string){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.getSiteHeaders()
    return this.http.post(url, body, { headers })
  }

  getWithoutToken(endpoint:string, token:string){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.getSiteHeaders()
    return this.http.get(url, { headers })
  }

  postWithToken(body:any,endpoint:string, token:string){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.siteHeadersToken(token)
    return this.http.post(url, body, { headers })
  }
  updateWithToken(body:any,endpoint:string, token:any){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.siteHeadersToken(token)
    return this.http.put(url, body, { headers })
  }
  getWithToken(endpoint:string, token:string){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.siteHeadersToken(token)
    return this.http.get(url, { headers })
  }

  deleteWithToken(endpoint:string, token:string){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.siteHeadersToken(token)
    return this.http.delete(url, { headers })
  }
}
