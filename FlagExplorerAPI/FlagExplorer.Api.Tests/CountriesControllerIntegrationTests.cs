using FlagExplorer.Application.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace FlagExplorer.Api.Tests
{
    public class CountriesControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public CountriesControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task Get_CountriesEndpoint_ReturnsSuccess()
        {
            var client = _factory.CreateClient();
            var response = await client.GetAsync("/api/Countries");

            response.EnsureSuccessStatusCode(); // 200-299
            var content = await response.Content.ReadAsStringAsync();
            Assert.False(string.IsNullOrWhiteSpace(content));
        }

        [Fact]
        public async Task GetByName_ReturnsCountryDetails_WhenCountryExists()
        {
            // Arrange
            var client = _factory.CreateClient();
            var countryName = "Republic of South Africa"; // make sure this exists in your service

            // Act
            var response = await client.GetAsync($"/api/Countries/{countryName}");

            // Assert
            response.EnsureSuccessStatusCode(); // 200-299
            var dto = await response.Content.ReadFromJsonAsync<CountryDetailsDto>();
            Assert.NotNull(dto);
            Assert.Equal(countryName, dto!.Name);
        }

        [Fact]
        public async Task GetByName_ReturnsNotFound_WhenCountryDoesNotExist()
        {
            // Arrange
            var client = _factory.CreateClient();
            var countryName = "UnknownLand";

            // Act
            var response = await client.GetAsync($"/api/Countries/{countryName}");

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}

