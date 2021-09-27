using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Dapper;
 
using System.Data;
using System.Data.SqlClient;
using Dapper.Contrib.Extensions;

namespace pRoom.Models.eventModel
{
    [Table("userMeet")] 
    public class userMeet
    {
        [Dapper.Contrib.Extensions.Key]
        public int id { get; set; }
        public int userID { get; set; }
        public string userName { get; set; }
        public int meetID { get; set; }
        public string guid { get; set; }
        public DateTime inserDate { get; set; }
        public int role { get; set; }
    }
    public class userMeetReposotory
    {
        
        public void Add(userMeet m)
        {
            string sQuery = "INSERT INTO userMeet (userName,Guid,meetID,inserDate,role ,userID )"
                               + " VALUES(@userName,@Guid,@meetID,@inserDate,@role ,@userID );SELECT CAST(SCOPE_IDENTITY() as int)";
            using var db = appInfo.GetDbconnection();
           // var id = db.Query<int>(sQuery, m).Single();
           var id= db.Insert(m);
                m.id = (int)id;

             

        }
        public userMeet getByGuid(string Guid )
        {
            using var db = appInfo.GetDbconnection();
            var m = db.Query<userMeet>("Select * From userMeet where  Guid='" + Guid+"' ").SingleOrDefault();
                return m;
             

        }
    }
}
