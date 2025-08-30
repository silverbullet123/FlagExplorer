using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlagExplorer.Application.Models
{
    public record CountryDetailsDto(string Name, int Population, string Capital, string Flag);
}
