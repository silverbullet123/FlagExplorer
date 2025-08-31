import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CountryDetailComponent } from './country-detail.component';
import { CountryService } from '../../services/country.service';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for the dependencies
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountryByName']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock the country data that will be returned by the service
    const mockCountry = {
      name: 'Republic of South Africa',
      population: 60000000,
      capital: 'Pretoria',
      flag: 'url1'
    };
    countryServiceSpy.getCountryByName.and.returnValue(of(mockCountry));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CountryDetailComponent // Import the standalone component
      ],
      providers: [
        // Provide the mocked dependencies
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ name: 'Republic of South Africa' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load country on init', () => {
    // The country should be loaded during component initialization
    expect(countryServiceSpy.getCountryByName).toHaveBeenCalledWith('Republic of South Africa');
    expect(component.country).toBeDefined();
    expect(component.country?.name).toBe('Republic of South Africa');
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
