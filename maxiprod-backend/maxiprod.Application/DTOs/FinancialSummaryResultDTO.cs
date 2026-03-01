using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace maxiprod.Application.DTOs
{
    public class FinancialSummaryResultDTO
    {
        public object Data { get; set; }
        public int RegisterCount { get; set; }
        public double TotalExpenses { get; set; }
        public double TotalRevenue { get; set; }
        public double TotalBalance { get; set; }
    }
}
