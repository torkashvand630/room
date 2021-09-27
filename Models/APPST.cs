using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom
{
    public static class APPST
    {
        public static List<meeting> meetList = new List<meeting>();
        public static  ConcurrentDictionary<int, meeting> meetDic = new ConcurrentDictionary<int, meeting>();
      //  public static Dictionary<string, > meetDic = new Dictionary<int, meeting>();
        public static Dictionary<int, userMD> userDic = new Dictionary<int, userMD>();
        private static readonly Random getrandom = new Random();
        public static int readyStatus = 0;
        public static int isHost = 0;
        public static int GetRandomNumber()
        {
            lock (getrandom) // synchronize
            {
                return getrandom.Next(0, int.MaxValue);
            }
        }
        public static T Clone<T>(T source)
        {
            if (!typeof(T).IsSerializable)
            {
                throw new ArgumentException("The type must be serializable.", "source");
            }

            //if (Object.ReferenceEquals(source, null))
            //{
            //    return default(T);
            //}

            System.Runtime.Serialization.IFormatter formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
            Stream stream = new MemoryStream();
            using (stream)
            {
                formatter.Serialize(stream, source);
                stream.Seek(0, SeekOrigin.Begin);
                return (T)formatter.Deserialize(stream);
            }
        }
    }
}
