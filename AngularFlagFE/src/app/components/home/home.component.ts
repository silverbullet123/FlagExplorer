import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Import CommonModule
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-home',
  standalone: true, // This confirms it's a standalone component
  imports: [CommonModule], // <--- Add CommonModule here
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  countries: any[] = [];

  constructor(private countryService: CountryService, private router: Router) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  viewDetails(name: string): void {
    this.router.navigate(['/country', name]);
  }
}
