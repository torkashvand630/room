using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models.drupal
{
    public class Node
    {
        public int id { get; set; }
        public string langcode { get; set; }
        public string title { get; set; }
        public string password { get; set; }
        public Node(int id , string title,string langcode, string password)
        {
            this.id = id;
            this.title = nodeRepos.TruncateLongString(title, 20);
            this.langcode = langcode;
            this.password = password;
            Console.WriteLine(this.title);
            Console.WriteLine("passw : " + password);
        }
    }
    public static class nodeRepos
    {
        public static Node   getNode(int id)
        {
            using var db = appInfo.GetDbconnection();
            var node = db.Query("Select * From node where   nid="+id).FirstOrDefault();
            Console.WriteLine("node");

            if (node == null) return null;
            if (node.type != "meet") return null;
            var vidFild = node.vid;
            Console.WriteLine((uint)vidFild);
            if (vidFild == null || vidFild == 0) return null;
            
            var NodeData = db.Query("Select * From node_field_revision where   nid=" + id + " AND vid=" + (uint)vidFild).FirstOrDefault();
            if (NodeData == null) return null;

            var Nodepassword = db.Query("Select * From node__field_password where   entity_id =" + id + " AND revision_id=" + (uint)vidFild).FirstOrDefault();
            if (Nodepassword == null) return null;

            Node n = new Node(id, NodeData.title,node.langcode,Nodepassword.field_password_value);
            Console.WriteLine(NodeData.title);
            // else Console.WriteLine("not found");
            return n;

            // return m;
        }

        public static string TruncateLongString(this string str, int maxLength)
        {
            if (string.IsNullOrEmpty(str)) return str;

            return str.Substring(0, Math.Min(str.Length, maxLength));
        }
    }
}
