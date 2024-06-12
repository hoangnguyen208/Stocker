using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters")]
        public string Symbol { get; set; } = "";

        [Required]
        [MaxLength(10, ErrorMessage = "CompanyName cannot be over 10 characters")]
        public string CompanyName { get; set; } = "";

        [Required]
        [Range(1, 10000000000)]
        public decimal Purchase { get; set; }

        [Required]
        [Range(0.001, 100)]
        public decimal LastDiv { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "Industry cannot be over 10 characters")]
        public string Industry { get; set; } = "";

        [Range(1, 50000000000)]
        public long MarketCap { get; set; }
    }
}