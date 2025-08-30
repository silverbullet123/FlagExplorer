import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService, Country, CountryDetails } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all countries', () => {
    const dummyCountries: Country[] = [
      { name: 'Republic of South Africa', flag: 'url1' },
      { name: 'Kenya', flag: 'url2' }
    ];

    service.getCountries().subscribe(countries => {
      expect(countries.length).toBe(2);
      expect(countries).toEqual(dummyCountries);
    });

    const req = httpMock.expectOne('https://localhost:7051/api/Countries');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  });

  it('should fetch country by name', () => {
    const dummyCountry: CountryDetails = {
      name: 'Republic of South Africa',
      population: 60000000,
      capital: 'Pretoria',
      flag: 'url1'
    };

    service.getCountryByName('Republic of South Africa').subscribe(country => {
      expect(country).toEqual(dummyCountry);
    });

    const req = httpMock.expectOne('https://localhost:7051/api/Countries/Republic%20of%20South%20Africa');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountry);
  });
});
