import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CountryDetailComponent } from './country-detail.component';
import { CountryService, CountryDetails } from '../../services/country.service';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;
  let mockService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('CountryService', ['getCountryByName']);

    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent],
      providers: [{ provide: CountryService, useValue: mockService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
  });

  it('should load country on init', () => {
    const dummyCountry: CountryDetails = {
      name: 'Republic of South Africa',
      population: 60000000,
      capital: 'Pretoria',
      flag: 'url1'
    };

    mockService.getCountryByName.and.returnValue(of(dummyCountry));
    component.country!.name = 'Republic of South Africa';

    component.ngOnInit();

    expect(component.country).toEqual(dummyCountry);
    expect(mockService.getCountryByName).toHaveBeenCalledWith('Republic of South Africa');
  });
});
