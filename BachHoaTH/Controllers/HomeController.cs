using BachHoaTH.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BachHoaTH.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly dbMarketsContext _context;

        public HomeController(ILogger<HomeController> logger, dbMarketsContext context)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            int pageSize = 6;
            List<Product> productList = _context.Products.Take(pageSize).ToList();
            List<Category> catList = _context.Categories.Take(8).ToList();

            dynamic model = new System.Dynamic.ExpandoObject();
            model.productList = productList;
            model.catList = catList;
            int cntAll = _context.Products.ToList().Count;
            int nofPage = cntAll / pageSize;
            if (cntAll % pageSize > 0)
            {
                nofPage += 1;
            }

            model.nofPage = nofPage;
            model.pageSize = pageSize;

            Console.WriteLine("--------------------");
            Console.WriteLine(productList.Count());
            return RedirectToAction("Index1");
        }

        public IActionResult Index1()
        {
            return View();
        }
        [Route("lien-he.html", Name = "Contact")]
        public IActionResult Contact()
        {
            return View();
        }

        [Route("gioi-thieu.html", Name = "About")]
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        [HttpGet]
        [Route("/api/getcateview/{id?}")]
        public async Task<IActionResult> getCateAtbShow(int? id)
        {
            var cate = await _context.Categories.FindAsync(id);
            return Json(new { showAtb = cate.ShowAtb });

        }


        [HttpGet]
        [Route("/api/getimgs/{id?}")]
        public IActionResult getImgs(int? id)
        {
            List<Image> lsImages = _context.Images
             .AsNoTracking()
             .Where(x => x.ProductId == id)
             .ToList();
            return Json(lsImages);

        }

    }
}
