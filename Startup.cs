using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using pRoom.Models;
using pRoom.Models.eventModel;

namespace pRoom
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddBrowserDetection();
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowOrigin",
            //        builder => builder.AllowAnyOrigin());
            //});
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();

            }));
            //services.AddCors(o => o.AddPolicy("MyPolicy2", builder =>
            //{
            //    builder.AllowAnyMethod()
            //           .AllowAnyHeader()
            //            .AllowCredentials();
            //}));
            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");
            services.AddScoped<IuserManagerEvent, userManagerEvent>();
            services.TryAddSingleton<IHttpContextAccessor, Microsoft.AspNetCore.Http.HttpContextAccessor>();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Map("/"+appInfo.Prefix, mainapp =>
            {
                mappedConfigure(mainapp, env);
            });
           // mappedConfigure(app, env);
        }
        public void mappedConfigure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                APPST.isHost = 1;
            }
            var provider = new FileExtensionContentTypeProvider();
            var extList = new List<string> { "DOCX", "DOC", "DOT", "ODT", "FODT", "RTF", "TXT" , "PPTX", "PPT", "PPS",
                                             "POT", "ODP", "FODP" ,  "XLSX", "ODS", "FODS" };
            foreach (var r in extList)
            {
                provider.Mappings["." + r] = "application/x-msdownload";
                provider.Mappings["." + r.ToLower()] = "application/x-msdownload";
            }
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
            });


            // app.UseCors("MyPolicy2");
            //app.UseHttpsRedirection();
            //  app.UseStaticFiles();
            appInfo.path = env.ContentRootPath;
          
            app.UseRouting();
            app.UseCors("MyPolicy");
            app.UseAuthorization();
            loadAppInfo();
            pRoom.Models.drupal.nodeRepos.getNode(15);
            meetManagerService.load();
            simpleTimer.start();
          //  saveMeetTimer.start();
            app.UseWebSockets();
            Task.Run(() => { mqtt.connect().Wait(); });
            // mqtt.start();
            // app.UseMiddleware<ChatWebSocketMiddleware>();

            meetService.loadingDic = new System.Collections.Concurrent.ConcurrentDictionary<int, int>();
            //  app.UsePathBase(new PathString("/ddd/"));
           // app.UsePathBase("/ddd");
            //app.Use((context, next) =>
            //{
            //    context.Request.PathBase = "/ddd";
            //    return next();
            //});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
           
        }
        public void loadAppInfo()
        {
            loadAppInfoBase();
            var env_1 = Configuration.GetValue<string>("env", "envTemp");
            appInfo.env = env_1;
            //int isHost = int.Parse(Configuration["appinfo:isHost"]);

            //appInfo.isHost = isHost;

            //if (env_1 == "docker11")
            //{

            //    appInfo.mediaServer = Configuration.GetValue<string>("mediaServer", "");
            //    appInfo.mediaServerPass = Configuration.GetValue<string>("mediaServerPass", "");

            //}
            //else
            //{
            //    appInfo.mediaServer = Configuration["appinfo:mediaServer"];// Configuration.GetValue<string>("mediaServer", "");
            //    appInfo.mediaServerPass = Configuration["appinfo:mediaServerPass"];// Configuration.GetValue<string>("mediaServerPass", "");

            //}
            //var mediaServerEnv = Configuration["appinfo:mediaServerEnv"];
            //if (mediaServerEnv != "mediaServerEnvironment") appInfo.mediaServer = mediaServerEnv;
            //appInfo.officeServer = Configuration["appinfo:officeServer"];
            //appInfo.pdfConverter = Configuration["appinfo:pdfConverter"];

           // appInfo.ConnectionString = Configuration["appinfo:ConnectionString"];
            //appInfo.secret = Configuration["appinfo:secret"];
            //appInfo.host = Configuration["appinfo:host"];
            //appInfo.lang = Configuration["appinfo:lang"];
            //if (appInfo.lang == "language") appInfo.lang = "en";
            //appInfo.demoMeetID = int.Parse(Configuration["appinfo:demoMeetID"].Trim());
            if (appInfo.host == "") appInfo.host = appInfo.mediaServer;
            //  appInfo.record = int.Parse(Configuration["appinfo:record"]);

            //   appInfo.exitUrl = Configuration["appinfo:exitUrl"];
            //string DbFile = Environment.CurrentDirectory + "/wwwroot/files/db1.db";
            string DbFile = appInfo.path + "/wwwroot/files/db1.db";
           // if (appInfo.dbType != "sqlserver") appInfo.ConnectionString = "Data Source=" + DbFile;

            var p = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "en.json");
            var jsonString1 = File.ReadAllText(p);
            var t = JsonConvert.DeserializeObject<TranslateMD>(jsonString1);
            Translate.langDic.Add("en", t);
            p = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "fa.json");
            jsonString1 = File.ReadAllText(p);
            t = JsonConvert.DeserializeObject<TranslateMD>(jsonString1);
            Translate.langDic.Add("fa", t);
            Translate.t = Translate.langDic[appInfo.lang];
            

        }
        public void loadAppInfoBase()
        {
            Console.WriteLine(appInfo.path);
            Console.WriteLine(Directory.GetCurrentDirectory());
            var p = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files", "appConf.json");
            // string p = appInfo.path + "/wwwroot/files/appConf.json";
            var str = File.ReadAllText(p);
            var j = JObject.Parse(str);
            appInfo.officeServer = (string)j["officeServer"];
            appInfo.lang = (string)j["lang"];
            if (appInfo.lang == "language") appInfo.lang = "en";
            appInfo.mediaServer = (string)j["mediaServer"];

            appInfo.pdfConverter = (string)j["pdfConverter"];
            appInfo.ConnectionString = (string)j["ConnectionString"];
            appInfo.demoMeetID = (int)j["demoMeetID"];
            appInfo.isHost = (int)j["isHost"];
            appInfo.exitUrl = (string)j["exitUrl"];
            appInfo.domainName = (string)j["domainName"];

            appInfo.host = (string)j["host"];
            try
            {
                appInfo.record = (int)j["record"];
                appInfo.live = (int)j["live"];
            }
            catch { }
         
            appInfo.secret = (string)j["secret"];

            var mediaServerEnv = (string)j["mediaServerEnv"];
            if (mediaServerEnv != "mediaServerEnvironment") appInfo.mediaServer = "wss://" + mediaServerEnv + "/sfu";

            var officeServerEnv = (string)j["officeServerEnv"];
            if (officeServerEnv != "officeServerEnvironment") appInfo.officeServer = "https://" + officeServerEnv;

            appInfo.mqttServer = (string)j["mqttServer"];
            var mqttServerEnv = (string)j["mqttServerEnv"];
            if (mqttServerEnv != "mqttServerEnvironment") appInfo.mqttServer = "wss://" + mqttServerEnv;

            var recordServer = (string)j["recordServer"];
            if (recordServer != null) appInfo.recordServer = recordServer;
            appInfo.serverID = (string)j["serverID"];
            if (appInfo.serverID==null || appInfo.serverID=="") appInfo.serverID=(new Random()).Next(0, 10000).ToString();
            Console.WriteLine("offic server is : " + appInfo.officeServer);
            Console.WriteLine("webrtc server is : " + appInfo.mediaServer);
            Console.WriteLine("mqqt server is : " + appInfo.mqttServer);
            Console.WriteLine("server id is : " + appInfo.serverID);
            Console.WriteLine("server record : " + appInfo.record);
            Console.WriteLine("server live : " + appInfo.live);
            Console.WriteLine("ConnectionString : " + appInfo.ConnectionString);
            
            //appInfo1 a = JsonConvert.DeserializeObject<appInfo1>(str);
            //appInfo.ConnectionString = a.ConnectionString;
            //appInfo.secret = a.secret;
            //appInfo.isHost = a.isHost;
            //appInfo.exitUrl = a.exitUrl;
            //Console.WriteLine("appInfo domain" + appInfo.secret);
        }
    }
}
