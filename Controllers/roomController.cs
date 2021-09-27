using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DNTPersianUtils.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pRoom.Models;
using pRoom.Models.eventModel;
using TimeZoneConverter;

namespace pRoom.Controllers
{
    public class roomController : Controller
    {
        public IuserManagerEvent _userManager;
        public IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _env;
        public roomController(IuserManagerEvent u, IHttpContextAccessor httpContextAccessor,IHostingEnvironment env)
        {
            _userManager = u;
            _httpContextAccessor = httpContextAccessor;
            _env = env;
        }
        public IActionResult Index()
        {
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
            if(myPage.muser==null)  return RedirectToAction("Login", "user");

            ViewBag.mypage = myPage;
            eventRoomReposotory err = new eventRoomReposotory();
            var rList = err.getAll(myPage.muser.id).OrderByDescending(a=>a.id);
            return View(rList);
        }
        public IActionResult create()
        {
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
            if (myPage.muser == null) return RedirectToAction("Login", "user");
            ViewBag.mypage = myPage;
            if(myPage.muser==null) return Redirect("/home/");

            return View();
        }
        
        public string ddd()
        {
            return "dddddddddd";
        }
        [HttpPost]
        public string create([FromBody] editRoomVM r )
        {

            var user = _userManager.GetUser();

            eventRoom room = new eventRoom();
            if (user == null) return "0";
            room.name = r.name;
            room.password = r.password;
            room.description = r.description;
            room.recording = r.record;


            //var p2 = PersianDateTime.Parse(r.startTime);
            if (r.startTime.Trim() != "")
            {
                var localTime = r.startTime.ToGregorianDateTime();// p2.ToDateTime();
                room.startTime = localTime;
                room.persianDate = r.startTime.ToGregorianDateTime().ToShortPersianDateTimeString();// room.startTime.ToShortPersianDateTimeString();

            }

            //var universalTime = localTime.Value.ToUniversalTime();


            //  room.startTime = universalTime;// localTime.Value.ToUniversalTime();
            // if(appInfo.env=="proom")
            //
            // DateTime.SpecifyKind(universalTime, DateTimeKind.);



            room.duration = r.duration;
            room.CID = 20;
            room.createStatus = 0;
            room.isDemo = false;
           
            room.userCount = 50;
            room.userID = user.id;
            room.CreateDate = DateTime.Now;
            eventRoomReposotory erm = new eventRoomReposotory();
            erm.Add(room);
           officControler.createDefultFolder(room.id);
            var t = "ok";
           

            return t;
        }

        public IActionResult edit(int id)
        {
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
            if (myPage.muser == null) return RedirectToAction("Login", "user");
            ViewBag.mypage = myPage;
            if (myPage.muser == null) return Redirect("/home/");
            eventRoomReposotory erm = new eventRoomReposotory();
            var room = erm.get(id);
            if(room==null) return Redirect("/home/");
            if(room.userID!=myPage.muser.id) return Redirect("/home/");
            //  if(room.startTime.Value.AddMinutes(room.duration)<DateTime.Now) return Redirect("/home/");
            editRoomVM em = new editRoomVM();
            em.id = room.id;
            em.name = room.name;
            em.duration = room.duration;
            em.password = room.password;
            em.description = room.description;
            em.startTime=room.startTime.ToShortPersianDateTimeString();
            return View(em);
        }
        [HttpPost]
        public string edit([FromBody] editRoomVM r)
        {
            var user = _userManager.GetUser();           
            if (user == null) return "0";
            eventRoomReposotory erm = new eventRoomReposotory();
            var room = erm.get(r.id);
            if (room.userID != user.id) return "0";
          
            room.name = r.name;
            room.password = r.password;
            room.description = r.description;

            //var p2 = PersianDateTime.Parse(r.startTime);
            if (r.startTime.Trim() != "")
            {
                room.startTime = r.startTime.ToGregorianDateTime();// p2.ToDateTime();
                room.persianDate = room.startTime.ToShortPersianDateTimeString();
            }
           
            room.duration = r.duration;
                      
            erm.update(room);
            var t = "ok";
            
            return t;
        }


        public IActionResult start(int? id)
        {
            //var time0 = PersianDateTime.Now.ToString("yyyyMMddHHmm");
            //var time0Long = long.Parse(time0);
            //var time4 = PersianDateTime.Now.AddHours(-4).ToString("yyyyMMddHHmm");
            //var time4Long = long.Parse(time4);
            MyPage myPage = new MyPage();
            var user = _userManager.GetUser();
            myPage.muser = user;


            var isOwner = false;
            if (id == null)
            {
                return NotFound();
            }
            eventRoomReposotory err = new eventRoomReposotory();
            var room = err.get(id.Value);
            if (room == null)
            {
                return NotFound();
            }


            if (myPage.muser != null )
                if (room.userID == myPage.muser.id) isOwner = true;
            if (room.isDemo) isOwner = true;
            roomEditVm rm = new roomEditVm()
            {
                room = room,
                isOwner = isOwner,
                longPerianStartDate = room.persianDate// room.startTime.Value.AddHours(3).AddMinutes(30).ToLongPersianDateTimeString(),
            };

            myPage.name = "start_" + room.id;
            if (room.recordUrl != null) rm.recordUrl = room.recordUrl;
            ViewBag.recordServer = appInfo.recordServer;
            ViewBag.mypage = myPage;
            if(room.isDemo) return View(rm);

            if (room.startTime != null)
            {
                var n = myTahranTime.getTime();
                if (n < room.startTime || n > room.startTime.Value.AddMinutes(room.duration))
                {
                    rm.status = "timeOut";
                }
            }
           

           
            return View(rm);
            //if (room.recording == 1)
            //{
                
            //    var requst = (new requestReposotory()).getByMeetID(room.id);
            //    if (requst == null)   
            //     if(requst!=null)
            //    {
            //        rm.request = requst;
            //        if(requst.status!=20)  
            //        else
            //        {
            //            string recordFilePath = appInfo.path + "/wwwroot/files/record/" + requst.id+".webm";
            //           if(System.IO.File.Exists(recordFilePath))
            //            {
            //                string domainName = _httpContextAccessor.HttpContext.Request.Scheme + "://" + _httpContextAccessor.HttpContext.Request.Host.Value;
            //               
            //                rm.recordUrl = domainName+"/files/record/" + requst.id + ".webm";
            //            }
            //            else
            //            {
            //               
            //            }
            //        }
            //    }
                                 
            //}
           



          
        }

        [HttpPost]
        public JsonResult joinRoomApi([FromBody] joinRoomApiVM r)
        {
            joinRoomResult result = new joinRoomResult();
            string secret = r.secret;
            if (secret != appInfo.secret)
            {
                result.status = "error";
                result.message = "secret inValid";
                return Json(result);
            }
            joinRoomVM rec = new joinRoomVM();
            rec.userName = r.userName;
            if (r.role == "techer") rec.type = "t";
            else
            {
                if(r.role=="student") rec.type = "s";
                else
                {
                    result.status = "error";
                    result.message = "role  inValid";
                    return Json(result);
                }
            }
            rec.cid = r.roomID;
            rec.tpass = r.password;
            var k  = (new joinRoomUtil()).joinRoomBase(rec);
            if (k.status == "ok") k.url = "https://" + appInfo.host + k.url;
            return Json(k);
        }

        [HttpPost]
        public  JsonResult  joinRoom([FromBody] joinRoomVM r)
        {
            var res = (new joinRoomUtil()).joinRoomBase(r);
            return Json( res);
           
        }
        [HttpPost]
        public JsonResult deleteRoom([FromBody] deleteRoomVM r)
        {
           
            eventRoomReposotory err = new eventRoomReposotory();
            err.delete(r.id);
            return Json("ok");




        }

     
       

    }
    
}
