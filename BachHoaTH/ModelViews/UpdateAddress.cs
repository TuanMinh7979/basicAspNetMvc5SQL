using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BachHoaTH.Models;


namespace BachHoaTH.ModelViews
{
    public class UpdateAddress
    {
        [Key]
        public int CustomerId { get; set; }
        public string Address { get; set; }
    }
}
