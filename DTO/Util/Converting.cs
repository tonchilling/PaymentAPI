using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Util
{
   public class Converting
    {

        public static bool Compare<T>(string op, T x, T y) where T : IComparable
        {
            bool result = false;
            switch (op)
            {
                case "==": result= (x.CompareTo(y) == 0); break;
                case "!=": return x.CompareTo(y) != 0; break;
                case ">": return x.CompareTo(y) > 0; break;
                case ">=": return x.CompareTo(y) >= 0; break;
                case "<": return x.CompareTo(y) < 0; break;
                case "<=": return x.CompareTo(y) <= 0; break;
            }

            return result;
        }

    }
}
