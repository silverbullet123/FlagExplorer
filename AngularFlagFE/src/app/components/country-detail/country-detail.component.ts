import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CountryService, CountryDetails } from '../../services/country.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],  // ✅ add this
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country?: CountryDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.countryService.getCountryByName(name).subscribe(data => this.country = data);
    }
  }

  goBack(): void {
    this.router.navigate(['/']); // navigate to home component
  }
}
