﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
//using Aspose.Pdf.Devices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using pRoom.Models;
using pRoom.Models.eventModel;
using Shyjus.BrowserDetection;

namespace pRoom.Controllers 
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IHostingEnvironment _env;
        private readonly IBrowserDetector browserDetector;
        public string Secret="aaaaa";
        Random random = new Random();
        public IuserManagerEvent _userManager;
        public IHttpContextAccessor _httpContextAccessor;
        Random rnd = new Random();

        public HomeController(ILogger<HomeController> logger, IHostingEnvironment env, IBrowserDetector browserDetector1, IuserManagerEvent u, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _env = env;
            browserDetector = browserDetector1;
            _userManager = u;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IActionResult> d()
        {
            return View();
        }

        [HttpGet("mt/{id}/{ishost?}/{lang?}/{record?}/{recorder?}/{recMeetID?}")]
        public async Task<IActionResult> mt(int id, int? ishost, string lang, string record, int? recorder, int? recMeetID)
        {
            if (recorder == null) recorder = 0;
            if (ishost == null) ishost = appInfo.isHost;
            if (lang == null) lang = appInfo.lang;
            var translate = Translate.langDic[lang];
            var isLTR = true;
            if (translate.Direction == "rtl") isLTR = false;
            meetErrorVM meeterror = new meetErrorVM() { meetID = 0, message = "room not exist" };
            if (  id ==0) return View("meetErrorView", meeterror);
            userMeet um;
            if (recorder == 1)
            {
                um = new userMeet()
                {
                    meetID = (recMeetID == null) ? 1 : (int)recMeetID,
                    id = rnd.Next(20000000, 90000000),
                    role = 0,
                    userName = "recorder"

                };
            }
            else
            {
                um = new userMeet()
                {
                    meetID =id,
                    id = rnd.Next(0, 2000000),
                    role = 1,
                    userName = "ali"

                };
            }

            int meetID = id;
            string userName = um.id.ToString();
            int role = um.role;
            string nickname = um.userName;
            var meet = meetService.GetOrAddMeeting(id);
           // if (meet == null || meet.meetManagPrpperty.finishStatus != "no") return View("meetErrorView", meeterror);
            // int isRecorder = nickname.StartsWith("alialiali") ? 1 : 0;
            userMD u;
            var success = meet.userManager.userDic.TryGetValue(userName, out u);
            if (success)
            {
                u = meet.userManager.userDic[userName];
                u.lastTime = DateTime.Now;
                u.isOffLine = 1;
                u.join = 0;
                // if (record != null && record == "1") u.permission.Record = 1;
                await meet.userManager.sendExitToUser(u, meetID);
            }
            else
            {
                u = new userMD() { name = userName, nickname = nickname, lastTime = DateTime.Now, role = role, meetID = meetID, permission = new Permission(role), isRecorder = (int)recorder };
                if (role == 0) u.permission = meet.permission;
                if (recorder == 1) u.permission.chat = 0;
                // if (record != null && record == "1") u.permission.Record = 1;
                meet.userManager.addUser(u);
            }
            if (meet.userManager.userDic.ContainsKey(userName))
            {
                // meet.userManager.userDic.TryRemove(userName, out userMD mmm);                              
                // if (role == 0) u.permission = mmm.permission;                
            }
            else
            {
            }


            meetVM r = new meetVM() { meetID = meetID, userName = userName, p = role, nickName = nickname, meetName = meet.meetName, isLimit =0, isHost = ishost.Value, user = u, isRecorder = (int)recorder, translate = translate, isLTR = isLTR };
            javaMeet jmeet = new javaMeet()
            {
                meetID = meetID.ToString(),
                userName = userName,
                publish = role,
                nickName = nickname,
                meetName = meet.meetName,
                isLimit =0,// meet.meetManagPrpperty.isLimit,
                isHost = ishost.Value,
                user = u,
                exitUrl = appInfo.exitUrl + meetID,
                isRecorder = (int)(recorder),
                translate = translate,
                isLTR = isLTR
            };

            r.load(jmeet);
            //Console.WriteLine("meetID is : " + meetID + " userName is : " + userName + " publish : " + role+" isHost : "+jmeet.isHost);
            // var browser = this.browserDetector.Browser;
            try
            {
                return View(r);
            }
            catch
            {
                Console.WriteLine("erooooor in t view");
                return View("meetErrorView", meeterror);
                // return View(r);
            }
            finally
            {
                //await meet.userManager.sendNewUser(u);
            }


        }

        [HttpGet("meet/{guid}/{ishost?}/{lang?}/{record?}/{recorder?}/{recMeetID?}")]
        public async Task<IActionResult> meetStart(string guid, int? ishost,string lang,string record,int? recorder, int? recMeetID)
        {
            if (recorder == null) recorder = 0;
            if (ishost == null)  ishost = appInfo.isHost;
            if (lang == null) lang = appInfo.lang;
            var translate = Translate.langDic[lang];
            var isLTR = true; 
            if (translate.Direction== "rtl") isLTR = false;
            meetErrorVM meeterror = new meetErrorVM() { meetID =0, message = "room not exist" };
            if (guid==null || guid=="")  return View("meetErrorView", meeterror);
            userMeet um;
            if (recorder == 1)
            {
                um = new userMeet()
                {
                    meetID = (recMeetID==null) ? 1 : (int)recMeetID,
                    id = rnd.Next(20000000, 90000000),
                    role=0,
                    userName="recorder"
                    
                };
            }
            else
            {
                um = (new userMeetReposotory()).getByGuid(guid);
                if (um == null) return View("meetErrorView", meeterror);
            }
            
            int meetID = um.meetID; 
            string userName = um.id.ToString();
            int role = um.role;
            string nickname = um.userName;
            var meet = meetService.GetOrAddMeeting(meetID);
            if (meet == null )  return View("meetErrorView", meeterror);//|| meet.meetManagPrpperty.finishStatus != "no"
                                                                        // int isRecorder = nickname.StartsWith("alialiali") ? 1 : 0;
            userMD u;
            var success = meet.userManager.userDic.TryGetValue(userName, out u);
            if (success)
            {
                u = meet.userManager.userDic[userName];
                u.lastTime = DateTime.Now;
                u.isOffLine = 1;
                u.join = 0;
               // if (record != null && record == "1") u.permission.Record = 1;
                await meet.userManager.sendExitToUser(u, meetID);
            }
            else
            {
                u = new userMD() { name = userName, nickname = nickname, lastTime = DateTime.Now, role = role, meetID = meetID, permission = new Permission(role),isRecorder=(int)recorder };
                if (role == 0) u.permission = meet.permission;
                if (recorder == 1) u.permission.chat = 0;
               // if (record != null && record == "1") u.permission.Record = 1;
                meet.userManager.addUser(u);
            }
            if (meet.userManager.userDic.ContainsKey(userName))
            { 
               // meet.userManager.userDic.TryRemove(userName, out userMD mmm);                              
               // if (role == 0) u.permission = mmm.permission;                
            }
            else
            {               
            }                     
           
          
            meetVM r = new meetVM() { meetID = meetID, userName = userName, p = role, nickName = nickname, meetName = meet.meetName, isLimit = 0, isHost = ishost.Value, user = u,isRecorder=(int)recorder,translate=translate, isLTR = isLTR };
            javaMeet jmeet = new javaMeet() { meetID = meetID.ToString(), userName = userName, publish = role,
                nickName = nickname, meetName = meet.meetName, isLimit = 0, isHost = ishost.Value, user = u,
                exitUrl = appInfo.exitUrl + meetID,isRecorder=(int)(recorder),translate=translate,isLTR=isLTR,Prefix=appInfo.Prefix };
           
            r.load(jmeet);
            //Console.WriteLine("meetID is : " + meetID + " userName is : " + userName + " publish : " + role+" isHost : "+jmeet.isHost);
            // var browser = this.browserDetector.Browser;
            try
            {
                return View(r);
            }
            catch { 
                Console.WriteLine("erooooor in t view");
                return View("meetErrorView", meeterror);
                // return View(r);
            }
            finally
            {
                 //await meet.userManager.sendNewUser(u);
            }

             
        }


        [HttpGet("n/{meetID?}/{userName?}/{p?}/{recordAble?}/{checkSum?}/{nickname?}")]
        public async Task< IActionResult> t(int? meetID, string userName, int? p,int? recordAble,string checkSum,string nickname,int? ishost)
        {
            //bmsgRepository b = new bmsgRepository();
            //b.get();
           
            if (meetID == null) meetID = 1;
            if (ishost == null) ishost = appInfo.isHost;
            if (recordAble == null) recordAble = 0;
           
         //  await  recording.startSessions(meet);
            if (userName == null || userName == "") userName = random.Next().ToString();
           
            int publish = 1;
            if (p != null && p == 0) publish = 0;
           
            if (checkSum!=null)
            {

                var str = meetID + " " + userName + " " + p+" "+nickname;
                Console.WriteLine(checkSum);
                Console.WriteLine(str);
                var checkSumValue = "";
                for (var i = 0; i < checkSum.Length; i += 2)
                {
                    string v14 = checkSum[i].ToString() + checkSum[i + 1];
                    int value14 = Convert.ToInt32(v14, 16);
                    char charValue = (char)value14;
                    checkSumValue += charValue;
                }
                if(!AreEqual(str, checkSumValue, Secret))
                {
                    meetErrorVM meeterror = new meetErrorVM() { meetID = meetID.Value, message = "url not valid" };
                    return View("meetErrorView", meeterror);
                }

                Console.WriteLine(AreEqual(str,checkSumValue,Secret));
            }
            if (nickname == null || nickname == "") nickname = "علی قلی ترکاشوند کلاس اول ابتدایی";
            if (nickname.Length > 13) nickname = nickname.Substring(0, 13);

           // var meet =   meetService.GetMeeting(meetID.Value,meetName,userName);
            var meet = meetService.GetMeeting(meetID.Value);
            if(meet ==null || meet.meetManagPrpperty.finishStatus != "no")
            {
                meetErrorVM meeterror = new meetErrorVM() { meetID = meetID.Value, message = "room not exist" };
                return View("meetErrorView", meeterror);

            }
            string domainName = _httpContextAccessor.HttpContext.Request.Scheme+"://" + _httpContextAccessor.HttpContext.Request.Host.Value;
            appInfo.domainName = domainName;
            Console.WriteLine("domain : " + appInfo.domainName);
            if (recordAble == 1)
            {
                if (meet.recordMD.status == 0)
                {
                    meetService.recordingMeet(meet);
                }
            }
            userMD u = new userMD() { name = userName,nickname=nickname, lastTime = DateTime.Now, role = publish,  meetID = meetID.Value, permission = new Permission(publish) };
            if (meet.userManager.userDic.ContainsKey(userName))
            {
                //Console.WriteLine("user exist .....................");
               var oldUser = meet.userManager.userDic[userName];
               await meet.userManager.sendExitToUser(oldUser,meet.id);
               // Thread.Sleep(2000);
                if (p == 0) u.permission = oldUser.permission;
                meet.userManager.userDic.TryRemove(userName,out userMD mmm);
            }
           
           
            meet.userManager.addUser(u);
            meetVM r = new meetVM() { meetID = meetID.Value, userName = userName, p = publish,nickName=nickname,meetName=meet.meetName,isLimit=meet.meetManagPrpperty.isLimit,isHost=ishost.Value,user=u };
            javaMeet jmeet = new javaMeet() { meetID = meetID.Value.ToString(), userName = userName, publish = publish, nickName = nickname, meetName = meet.meetName, isLimit = meet.meetManagPrpperty.isLimit, isHost = ishost.Value, user = u,exitUrl=appInfo.exitUrl+meetID };
            r.load(jmeet);
            //Console.WriteLine("meetID is : " + meetID + " userName is : " + userName + " publish : " + publish);
            // var browser = this.browserDetector.Browser;
            //string command = "https://learn100.ir/n/52";
            //ProcessStartInfo ps = new ProcessStartInfo(command) { UseShellExecute = true };
            //Process.Start(ps);

            try
            {
                return View(r);
            }
            catch { Console.WriteLine("erooooor in t view"); return View(r); }
            finally
            {
               // await meet.userManager.sendNewUser(u);
            }
          
             
        }
        public async Task<IActionResult> meetErrorView(meetErrorVM m)
        {
            return View(m);
        }
        public bool AreEqual(string plainTextInput, string hashedInput, string salt)
        {
            string newHashedPin = GenerateHash(plainTextInput, salt);
            return newHashedPin.Equals(hashedInput);
        }
        public string GenerateHash(string input, string salt)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input + salt);
            SHA256Managed sHA256ManagedString = new SHA256Managed();
            byte[] hash = sHA256ManagedString.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
        public IActionResult Index()
        {
            MyPage myPage = new MyPage();
            myPage.muser = _userManager.GetUser();
            ViewBag.mypage = myPage;
        


            return View();
             
        }
      

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
