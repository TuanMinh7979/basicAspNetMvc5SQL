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
    public class ProductApiController : ControllerBase
    {
        private readonly dbMarketsContext _context;
        public ProductApiController(dbMarketsContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("all")]
        [EnableQuery]
        public IActionResult GetAll()
        {
            return Ok(_context.Products.AsQueryable());

        }


    
    }


}
