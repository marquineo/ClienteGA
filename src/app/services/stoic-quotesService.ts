// src/app/stoic-quote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StoicQuote {
  text: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoicQuoteService {
  private apiUrl = 'https://stoic-quotes.com/api/quote';

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<StoicQuote> {
    return this.http.get<StoicQuote>(this.apiUrl);
  }
}
