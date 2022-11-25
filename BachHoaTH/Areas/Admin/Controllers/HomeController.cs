using AspNetCoreHero.ToastNotification.Abstractions;
using BachHoaTH.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PagedList.Core;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Emit;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace BachHoaTH.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {

        private readonly dbMarketsContext _context;
        public INotyfService _notifyService { get; }
        public HomeController(dbMarketsContext context, INotyfService notifyService)
        {
            _context = context;
            _notifyService = notifyService;

        }

        [Area("Admin")]
        public async Task<IActionResult> Index()
        {
            var taikhoanID = HttpContext.Session.GetString("CustomerId");

            var loggedUser = await _context.Customers.FindAsync(Int32.Parse(taikhoanID));


            //Account account = _context.Accounts.Where(x => x.Email == loggedUser.Email && x.RoleId == 1).First();

            Debug.WriteLine(loggedUser.Email);
            var account = _context.Accounts.SingleOrDefault(e => e.Email.Trim() == loggedUser.Email.Trim() && e.RoleId == 1);
            

            if (account == null)
            {
                _notifyService.Warning("Permission Denied");
                Debug.WriteLine("____________________");
                string redirectUrl = "~/";
                Debug.WriteLine(redirectUrl);
                return Redirect(redirectUrl);
            }




            return View();
        }
    }
}
