using BachHoaTH.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PagedList.Core;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BachHoaTH.Controllers
{
    public class ProductController : Controller
    {
        private readonly dbMarketsContext _context;
        public ProductController(dbMarketsContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("shop", Name = "ShopProduct")]
        public IActionResult Index()
        {

           var ls = _context.Products.AsNoTracking()
                    
                    .OrderByDescending(x => x.DateCreated)
                    .ToList();
            return View(ls);


        }


        [HttpPost]
        [Route("shop", Name = "ShopProductPost")]
        public IActionResult Index(string search, int? catId)
        {
            Debug.WriteLine("--------------POST HERE----");
            Debug.WriteLine(search);
            Debug.WriteLine(catId);
            List<Product> ls = new List<Product>();
            if (!String.IsNullOrEmpty(search) && catId!=null )
            {
                ls = _context.Products.AsNoTracking()
                     .Where(x => x.CatId == catId && x.ProductName.Contains(search) == true)
                     .OrderByDescending(x => x.DateCreated)
                     .ToList();
            }
            else if (!String.IsNullOrEmpty(search))
            {
                search = search.Trim();
                ls = _context.Products.AsNoTracking()
                    .Where(x => x.ProductName.Contains(search) == true)
                    .OrderByDescending(x => x.DateCreated)
                    .ToList();
            }
            else if ( catId!=null)
            {
                ls = _context.Products.AsNoTracking()
                    .Where(x => x.CatId == catId)
                    .OrderByDescending(x => x.DateCreated)
                    .ToList();
            }
            if(search!=null){
ViewBag.searchVal =search ;
            }
              if(catId!=null){
 ViewBag.catIdVal =catId ;
              }
             
            return View(ls);


        }


        [Route("/{Alias}-{id}.html", Name = "ProductDetails")]
        public IActionResult Details(int id)
        {
            try
            {
                var product = _context.Products.Include(x => x.Cat).FirstOrDefault(x => x.ProductId == id);
                if (product == null)
                {
                    return RedirectToAction("Index");
                }
                var lsProduct = _context.Products.AsNoTracking()
                    .Where(x => x.CatId == product.CatId && x.ProductId != id && x.Active == true)
                    .OrderByDescending(x => x.DateCreated)
                    .Take(4)
                    .ToList();
                ViewBag.SanPham = lsProduct;
                return View(product);
            }
            catch
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Route("/{Alias}", Name = "ListProduct")]
        public IActionResult List(string Alias, int page = 1)
        {
            try
            {
                var pageSize = 9;
                var danhmuc = _context.Categories.AsNoTracking().SingleOrDefault(x => x.Alias == Alias);
                var lsTinDangs = _context.Products
                    .AsNoTracking()
                    .Where(x => x.CatId == danhmuc.CatId)
                    .OrderByDescending(x => x.DateCreated);
                PagedList<Product> models = new PagedList<Product>(lsTinDangs, page, pageSize);
                ViewBag.CurrentPage = page;
                ViewBag.CurrentCat = danhmuc;
                return View(models);
            }
            catch
            {
                return RedirectToAction("Index", "Home");
            }
        }



        [HttpGet]
        [Route("/api/products/all")]
        public IActionResult getAllProductApi()
        {

            var lsProducts = _context.Products
                .AsNoTracking()
                .OrderByDescending(x => x.DateCreated);

            return Json(new { products = lsProducts });

        }

        [HttpGet]
        [Route("/api/products/getSearchByNameCnt")]
        public IActionResult getSearchByNameCnt(string name)
        {

            var lsProducts = _context.Products
                .AsNoTracking()
                .Where(x => x.ProductName.Contains(name));


            return Json(new { cnt = lsProducts.Count() });

        }


    }
}
