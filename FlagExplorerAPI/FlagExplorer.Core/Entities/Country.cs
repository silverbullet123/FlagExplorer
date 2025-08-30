using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlagExplorer.Core.Entities;

public class Country
{
    public string Name { get; set; } = string.Empty;
    public string FlagUrl { get; set; } = string.Empty;
    public int Population { get; set; }
    public string Capital { get; set; } = string.Empty;
}
