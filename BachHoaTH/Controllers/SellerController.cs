using BachHoaTH.ApiModel;
using BachHoaTH.Helpper;
using BachHoaTH.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace BachHoaTH.Controllers
{


    public class SellerController : Controller
    {


        private readonly dbMarketsContext _context;
        public SellerController(dbMarketsContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        [Route("api/getcateformdata/{id?}")]
        public async Task<IActionResult> getCateFormData(int? id)
        {

            var cate = await _context.Categories.FindAsync(id);
            if (cate.Atb != null)
            {

                return Json(new { atb = cate.Atb });
            }
            else
            {
                return Json(new { atb = "" });
            }


        }



        [HttpGet]
        [Route("/dang-tin")]
        public IActionResult Dangtin(int? id)
        {

            return View();

        }


        [HttpGet]
        [Route("/tin-da-dang")]
        public IActionResult ShowTinDang()
        {
            var taikhoanID = HttpContext.Session.GetString("CustomerId");
            var taikhoanId = Int32.Parse(taikhoanID);
             var ls = _context.Products.AsNoTracking()
                .Where(p=>p.AuthorId==taikhoanId)
                     .OrderByDescending(x => x.DateCreated)
                     .ToList();
        
            return View(ls);

        }


        [HttpGet]
        [Route("/ca-nhan")]
        public IActionResult ShowThongTinSeller(int? id)
        {
            var taikhoanID = HttpContext.Session.GetString("CustomerId");
            var person = _context.Customers
                       .AsNoTracking()

                       .Where(x => x.CustomerId == Int32.Parse(taikhoanID)).FirstOrDefault();

            return View(person);

        }

   



        [HttpPost]
        [Route("/api/dang-tin")]
        public async Task<IActionResult> LuuTinBan([FromBody] ApiProductPost data)
        {
            var taikhoanID = HttpContext.Session.GetString("CustomerId");


            Product newProduct = new Product();
            newProduct.Thumb = Utilities.uploadBase64ProductImg(data.Thumb, data.ProductName);
            newProduct.ProductName = data.ProductName;
            newProduct.AuthorId = Int32.Parse(taikhoanID);
            newProduct.Description = data.Description;
            newProduct.Price = Int32.Parse(data.Price);
            newProduct.Kv = data.Kv;
            newProduct.DateModified = DateTime.Now;
            newProduct.DateCreated = DateTime.Now;
            int catId = Int32.Parse(data.CatID);
            newProduct.CatId = catId;
            var cat = await _context.Categories.FirstOrDefaultAsync(m => m.CatId == catId);
            newProduct.Cat = cat;
            newProduct.Alias = Utilities.SEOUrl(data.ProductName);


            _context.Add(newProduct);
            await _context.SaveChangesAsync();

            for (int i = 0; i < data.Imgs.Length; i++)
            {
                Image newImage = new Image();
                int j = i + 1;
                newImage.ProductId = newProduct.ProductId;
                Debug.WriteLine(data.ProductName + j.ToString());
                string fileName = data.ProductName + j.ToString();

                newImage.FileName = Utilities.uploadBase64ProductImg(data.Imgs[i], fileName);
                _context.Add(newImage);

            }
            await _context.SaveChangesAsync();
            return Json(new { message = "Thanh cong" });


        }


    }
}
