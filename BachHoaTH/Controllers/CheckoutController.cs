using AspNetCoreHero.ToastNotification.Abstractions;
using BachHoaTH.Extension;
using BachHoaTH.Models;
using BachHoaTH.ModelViews;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BachHoaTH.Controllers
{
    public class CheckoutController : Controller
    {
        private readonly dbMarketsContext _context;

        //hiển thị thông báo flash messages
        public INotyfService _notifyService { get; }
        public CheckoutController(dbMarketsContext context, INotyfService notifyService)
        {
            _context = context;
            _notifyService = notifyService;
        }


        [Route("checkout.html", Name = "Checkout")]
        public IActionResult Index(string returnUrl = null)
        {
            var cart = HttpContext.Session.Get<List<CartItem>>("GioHang");
            var taikhoanID = HttpContext.Session.GetString("CustomerId");

            MuaHangVM model = new MuaHangVM();
            if (taikhoanID != null)
            {
                var khachang = _context.Customers.AsNoTracking().SingleOrDefault(x => x.CustomerId == Convert.ToInt32(taikhoanID));
                model.CustomerId = khachang.CustomerId;
                model.FullName = khachang.FullName;
                model.Email = khachang.Email;
                model.Phone = khachang.Phone;
                model.Address = khachang.Address;          
            }

            ViewBag.GioHang = cart;
            return View(model);
        }

        [HttpPost]
        [Route("checkout.html", Name = "Checkout")]
        public IActionResult Index(MuaHangVM muahang)
        {
            var cart = HttpContext.Session.Get<List<CartItem>>("GioHang");
            var taikhoanID = HttpContext.Session.GetString("CustomerId");

            try
            {
                var khachang = _context.Customers.Find(Convert.ToInt32(taikhoanID));
                if(khachang.Address == null)
                {
                    _notifyService.Warning("Vui lòng cập nhật địa chỉ");
                    return Redirect("/tai-khoan-cua-toi.html");
                }
                if (khachang != null)
                {
                    Order donhang = new Order();
                    donhang.CustomerId = khachang.CustomerId;
                    donhang.Address = khachang.Address;
                    donhang.TotalMoney = Convert.ToInt32(cart.Sum(x => x.TotalMoney));
                    donhang.Deleted = false;
                    donhang.Paid = false;
                    donhang.TransactStatusId = 1;
                    donhang.OrderDate = DateTime.Now;
                    _context.Add(donhang);
                    _context.SaveChanges();
                    foreach (var item in cart)
                    {
                        OrderDetail orderDetail = new OrderDetail();
                        orderDetail.OrderId = donhang.OrderId;
                        orderDetail.ProductId = item.product.ProductId;
                        orderDetail.Amount = item.amount;
                        orderDetail.TotalMoney = donhang.TotalMoney;
                        orderDetail.Price = item.product.Price;
                        orderDetail.CreateDate = DateTime.Now;
                        _context.Add(orderDetail);

                    }
                }

                _context.SaveChanges();
                HttpContext.Session.Remove("GioHang");
                _notifyService.Success("Đặt hàng thành công");

            }
            catch (Exception ex)
            {
                _notifyService.Warning(ex.Message);
            }
            return Redirect("/");
        }

        [HttpPost]
        [Route("/api/checkout/details")]
        public async Task<IActionResult> DetailsAsync(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            try {
                var taikhoanID = HttpContext.Session.GetString("CustomerId");
                var khachhang = _context.Customers.AsNoTracking().SingleOrDefault(x => x.CustomerId == Convert.ToInt32(taikhoanID));
                //var donhang = _context.Orders.FirstOrDefaultAsync(m => m.OrderId == id && Convert.ToInt32(taikhoanID) == m.CustomerId);
                var donhang = _context.Orders.AsNoTracking().SingleOrDefault(m => m.OrderId == id && Convert.ToInt32(taikhoanID) == m.CustomerId);

                if (donhang == null)
                {
                    return NotFound();
                }
                //var chitietdonhang = _context.OrderDetails.Include(x => x.Product).AsNoTracking().Where(x => x.OrderId == id).OrderBy(x => x.OrderDetailId).ToList();
                var chitietdonhang = _context.OrderDetails.AsNoTracking().Where(x => x.OrderId == id).ToList();

                XemDonHang donHang = new XemDonHang();
                donHang.DonHang = donhang;
                donHang.ChiTietDonHang = chitietdonhang;
                return Json(new { donHang });
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
