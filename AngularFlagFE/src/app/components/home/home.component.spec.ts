import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCountryService: jasmine.SpyObj<CountryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCountryService = jasmine.createSpyObj('CountryService', ['getCountries']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent], // since it's standalone
      providers: [
        { provide: CountryService, useValue: mockCountryService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    const countriesMock = [
      { name: 'South Africa', flag: '🇿🇦' },
      { name: 'Namibia', flag: '🇳🇦' }
    ];
    mockCountryService.getCountries.and.returnValue(of(countriesMock));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mockCountryService.getCountries).toHaveBeenCalled();
    expect(component.countries).toEqual(countriesMock);
  });

  it('should navigate to country details when viewDetails is called', () => {
    const countryName = 'South Africa';

    component.viewDetails(countryName);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/country', countryName]);
  });
});
