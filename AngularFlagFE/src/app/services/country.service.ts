import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  name: string;
  flag: string;
}

export interface CountryDetails {
  name: string;
  population: number;
  capital: string;
  flag: string;
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiUrl = 'https://localhost:7051/api/Countries'; // backend API

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountryByName(name: string): Observable<CountryDetails> {
    return this.http.get<CountryDetails>(`${this.apiUrl}/${name}`);
  }
}
