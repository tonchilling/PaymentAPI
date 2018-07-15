using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Transactions
{
    public enum ChkValidate {
        Value=1,
        SubString=2,
        Length=3

    }
    public class T_CardValidationDTO: BaseDTO
    {

        public string CVID { get; set; }
        public string CID { get; set; }
        public string Field { get; set; }
        public string FieldType { get; set; }
        public string Operation { get; set; }
        public string OperationValue { get; set; }
        public int StartLength { get; set; }
        public int Length { get; set; }
        public string CompareValue { get; set; }
        public string InvalidCaption { get; set; }

        public ChkValidate ChkValidate { get; set; }


    }
}
