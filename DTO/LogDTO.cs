using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO
{
   public class LogDTO
    {
       public LogDTO()
       { }

       public string LogID { get; set; }
       public string LogDate { get; set; }
       public string System { get; set; }
       public string Page { get; set; }
       public string Level { get; set; }
       public string Message { get; set; }
       public string Desc { get; set; }
       public string CreateDate { get; set; }
       public string CreateBy { get; set; }
    }
}
