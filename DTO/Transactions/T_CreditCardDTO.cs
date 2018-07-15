using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Transactions
{
    public class T_CreditCardDTO: BaseDTO
    {

      public string CCID { get; set; }
        public string CTypeID { get; set; }
        public string CTypeCode { get; set; }
        public string CVV { get; set; }
        public string CardNumber { get; set; }
        public string HolderName { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string ExpireDate { get; set; }
       

    }
}
