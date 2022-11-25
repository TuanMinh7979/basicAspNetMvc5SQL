using System;
using System.Collections.Generic;

#nullable disable

namespace BachHoaTH.Models
{
    public partial class Image
    {
        public int ImageId { get; set; }
        public int? ProductId { get; set; }
        public string FileName { get; set; }
    }
}
