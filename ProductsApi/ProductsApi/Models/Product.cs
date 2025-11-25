using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.Models
    {
        public class Product
        {
            public int Id { get; set; }

            [Required(ErrorMessage = "NOME É OBRIGATORIO")]
            public string Name { get; set; }

            [StringLength(200)]
            public string Description { get; set; }

            [Range(0.01, 999999, ErrorMessage = "PREÇO NÂO NULO")]
            public decimal Price { get; set; }

            [Range(0, int.MaxValue, ErrorMessage = "QUANTIDADE NÃO NEGATIVA")]
            public int StockQuantity { get; set; }
        }
    }
