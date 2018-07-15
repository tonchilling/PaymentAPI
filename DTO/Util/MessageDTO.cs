using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Util
{
    
  public  class MessageDTO
    {

        public bool Status { get; set; }
        public string StatusText { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public object data { get; set; }


    }
}
