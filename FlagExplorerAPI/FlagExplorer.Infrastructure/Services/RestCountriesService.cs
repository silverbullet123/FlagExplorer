using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlagExplorer.Application.Interfaces;
using FlagExplorer.Core.Entities;
using System.Net.Http.Json;

namespace FlagExplorer.Infrastructure.Services
{
    public class RestCountriesService : IRestCountriesService
    {
        private readonly HttpClient _httpClient;

        public RestCountriesService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("RestCountries");
        }

        public async Task<IEnumerable<Country>> GetAllCountriesAsync()
        {
            // The external API returns a lot of fields. We only deserialize what we need.
            var response = await _httpClient.GetFromJsonAsync<List<ExternalCountryDto>>("v3.1/all?fields=name,flags,population,capital");
            // Map the complex external DTO to our simple Core.Entity
            return response?.Select(c => new Country
            {
                Name = c.Name.Official,
                FlagUrl = c.Flags.Png,
                Population = c.Population,
                Capital = c.Capital.FirstOrDefault() ?? "N/A"
            }) ?? Enumerable.Empty<Country>();
        }

        //public async Task<Country?> GetCountryByNameAsync(string name)
        //{
        //    // Implementation for getting a single country by name
        //    // Note: The external API might return an array, even for a single result.
        //    var response = await _httpClient.GetFromJsonAsync<List<ExternalCountryDto>>($"v3.1/name/{name}?fullText=true");
        //    var countryData = response?.FirstOrDefault();
        //    if (countryData == null) return null;

        //    return new Country
        //    {
        //        Name = countryData.Name.Official,
        //        FlagUrl = countryData.Flags.Png,
        //        Population = countryData.Population,
        //        Capital = countryData.Capital.FirstOrDefault() ?? "N/A"
        //    };
        //}

        public async Task<Country?> GetCountryByNameAsync(string name)
        {
            try
            {
                var response = await _httpClient.GetAsync($"v3.1/name/{name}?fullText=true");

                if (!response.IsSuccessStatusCode)
                {
                    // Return null if the country is not found (404) or other non-success status
                    return null;
                }

                var countryList = await response.Content.ReadFromJsonAsync<List<ExternalCountryDto>>();

                var countryData = countryList?.FirstOrDefault();
                if (countryData == null) return null;

                return new Country
                {
                    Name = countryData.Name.Official,
                    FlagUrl = countryData.Flags.Png,
                    Population = countryData.Population,
                    Capital = countryData.Capital.FirstOrDefault() ?? "N/A"
                };
            }
            catch (HttpRequestException)
            {
                // Optional: log exception
                return null;
            }
        }


        // Helper classes to deserialize the complex JSON from the external API
        private record ExternalCountryDto(NameDto Name, FlagsDto Flags, int Population, List<string> Capital);
        private record NameDto(string Official);
        private record FlagsDto(string Png);
    }
}
