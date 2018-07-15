using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class LogDAL : BaseDB
    {
        public override bool Add(object data)
        {
            OpenConnection();
            isCan = ExcecuteNoneQuery("sp_M_Log_Insert", data);
            CloseConnection();
            return isCan;
        }

        public override bool Update(object data)
        {
            throw new NotImplementedException();
        }

        public override bool Delete(object data)
        {
            throw new NotImplementedException();
        }

        public override System.Data.DataTable FindByAll()
        {
            throw new NotImplementedException();
        }

        public override System.Data.DataTable FindByColumn(object data)
        {
            throw new NotImplementedException();
        }
    }
}
