using BachHoaTH.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BachHoaTH.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


  
    public class ProductRController : ControllerBase
    {
        private readonly dbMarketsContext _context;
        public ProductRController(dbMarketsContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
       
        public IEnumerable<Product> Get()
        {
            return _context.Products;
        }
    }
}
