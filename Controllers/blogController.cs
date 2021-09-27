using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models.eventModel;

namespace pRoom.Controllers
{
    public class blogController : Controller
    { 
        public IuserManagerEvent _userManager;
        public blogController(IuserManagerEvent u)
        {
            _userManager = u;
        }
        public  IActionResult  item(int id)
        {
             
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;



            var blog = (new blogReposotory()).get(id);
            if (blog == null)
            {
                return NotFound();
            }

            myPage.name = "blog_" + blog.id;
         
            ViewBag.mypage = myPage;
            return View(blog);
        }



        public async Task<IActionResult> About()
        {
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
           
            ViewBag.mypage = myPage;


            return View();
        }

        public async Task<IActionResult> Contact()
        {
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
          
            ViewBag.mypage = myPage;


            return View();
        }


    }
}
