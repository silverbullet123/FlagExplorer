using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FlagExplorer.Application.Interfaces;
using FlagExplorer.Application.Models;

namespace FlagExplorer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly IRestCountriesService _restCountriesService;

        public CountriesController(IRestCountriesService restCountriesService)
        {
            _restCountriesService = restCountriesService;
        }

       
        [HttpGet] 
        public async Task<IActionResult> GetAll()
        {
            var countries = await _restCountriesService.GetAllCountriesAsync();
            var countryDtos = countries.Select(c => new CountryDto(c.Name, c.FlagUrl));
            return Ok(countryDtos);
        }

      
        [HttpGet("{name}")] 
        public async Task<IActionResult> GetByName(string name)
        {
            var country = await _restCountriesService.GetCountryByNameAsync(name);
            if (country == null)
            {
                return NotFound();
            }
            var detailsDto = new CountryDetailsDto(country.Name, country.Population, country.Capital, country.FlagUrl);
            return Ok(detailsDto);
        }
    }
}
