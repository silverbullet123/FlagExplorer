using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlagExplorer.Core.Entities;

namespace FlagExplorer.Application.Interfaces
{
    public interface IRestCountriesService
    {
        Task<IEnumerable<Country>> GetAllCountriesAsync();
        Task<Country?> GetCountryByNameAsync(string name);
    }
}
