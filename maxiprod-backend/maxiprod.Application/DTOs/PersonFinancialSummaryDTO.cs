using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace maxiprod.Application.DTOs
{
    public class PersonFinancialSummaryDTO
    {
        public ViewPersonDTO Person { get; set; }
        public double TotalRevenue { get; set; }
        public double TotalExpense { get; set; }
        public double Balance => TotalRevenue - TotalExpense;
    }
}
