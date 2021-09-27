using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.eventModel
{
    public class blog
    {
        public int id { get; set; }
        public string title { get; set; }
        public DateTime? insertDate { get; set; }
        public string content { get; set; }
    }
    public class blogReposotory
    {
        public blog get(int id)
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<blog>("Select * From blog where id=" + id).SingleOrDefault();
            return m;
        }
    }
}
