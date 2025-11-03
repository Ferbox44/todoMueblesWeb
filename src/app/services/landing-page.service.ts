import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, shareReplay, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface HeroContent {
  logo: string;
  backgroundImage: string;
  mainTitle: string;
}

export interface ServiceCard {
  id?: string;
  title: string;
  image: string;
  link: string;
}

export interface VideoItem {
  id?: string;
  url: string;
  title?: string;
  description?: string;
}

export interface CompareSection {
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
  image: string;
}

export interface LandingPageContent {
  hero: HeroContent;
  servicesCarousel: ServiceCard[];
  videos: VideoItem[];
  compareSection: CompareSection;
  brandsCarousel: BrandItem[];
}

export interface LandingPageSection {
  id: string;
  content: LandingPageContent;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private apiUrl = `${environment.apiUrl}/landing-page`;
  private contentSubject = new BehaviorSubject<LandingPageSection | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public content$ = this.contentSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  private contentCache$: Observable<LandingPageSection>;

  constructor(private http: HttpClient) {
    this.contentCache$ = this.http.get<LandingPageSection>(this.apiUrl).pipe(
      shareReplay(1),
      catchError(error => {
        console.error('Error fetching landing page content:', error);
        throw error;
      })
    );
  }
  
  getLandingPageContent(): Observable<LandingPageSection> {
    this.loadingSubject.next(true);
    
    return this.contentCache$.pipe(
      tap(content => {
        this.contentSubject.next(content);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }

  refreshContent(): Observable<LandingPageSection> {
    this.loadingSubject.next(true);
    return this.http.get<LandingPageSection>(this.apiUrl).pipe(
      tap(content => {
        this.contentSubject.next(content);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }
} 