using BachHoaTH.Models;
using System.Collections.Generic;

namespace BachHoaTH.ApiModel
{
    public class ApiProductPost
    {

        public string  ProductName{ get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public string CatID { get; set; }
        public string Kv { get; set; }
        public string Thumb { get; set; }
        public string[] Imgs { get; set; }

    }
}
