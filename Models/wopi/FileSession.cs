using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace pRoom.Models.wopi
{
    public class FileSession : EditSession
    {
        public FileSession(string sessionId, string filePath, string login = "Anonymous", string name = "Anonymous", string email = "", bool isAnonymous = true, string meetID="")
            :base(sessionId, filePath, login, name, email, isAnonymous, meetID)
        { }

        override public WopiCheckFileInfo GetCheckFileInfo()
        {
            Random random = new Random();
            int randomNumber = random.Next(0, 1000);
            WopiCheckFileInfo cfi = new WopiCheckFileInfo();

            cfi.BaseFileName =m_meetID+"_"+ m_fileinfo.Name;
            cfi.OwnerId = "q4";
            cfi.UserFriendlyName = m_name;
            cfi.UserId =randomNumber.ToString();

            lock (m_fileinfo)
            {
                if (m_fileinfo.Exists)
                {
                    cfi.Size = m_fileinfo.Length;
                }
                else
                {
                    cfi.Size = 0;
                }
            }

            cfi.Version = DateTime.Now.ToString("s");
            cfi.SupportsCoauth = false;
            cfi.SupportsCobalt = false;
            cfi.SupportsFolders = true;
            cfi.SupportsLocks = true;
            cfi.SupportsScenarioLinks = false;
            cfi.SupportsSecureStore = false;
            cfi.SupportsUpdate = true;
            cfi.UserCanWrite = true;

            return cfi;
        }
        override public byte[] GetFileContent()
        {
            MemoryStream ms = new MemoryStream();
            lock (m_fileinfo)
            {
                using (FileStream fileStream = m_fileinfo.OpenRead())
                {
                    fileStream.CopyTo(ms);
                }
            }
            return ms.ToArray();
        }
        override public void Save(byte[] new_content)
        {
            lock (m_fileinfo)
            {
                using (FileStream fileStream = m_fileinfo.Open(FileMode.Truncate))
                {
                    fileStream.Write(new_content, 0, new_content.Length);
                }
            }
            m_lastUpdated = DateTime.Now;
        }
    }
}
