using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO.Util;
using System.Data;
using System.Data.SqlClient;
using DTO.Transactions;
namespace DAL.Transaction
{
    public class T_CreditCardDAL : BaseDB
    {

        List<T_CreditCardDTO> objList = null;
        T_CreditCardDTO obj = null;

        public override bool Add(object data)
        {
            throw new NotImplementedException();
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


        public T_CreditCardDTO Existing(object data)
        {
            SqlDataReader reader = null;
            List<SqlParameter> parameterList = new List<SqlParameter>();
            objList = new List<T_CreditCardDTO>();
            dataTable = null;

            string procName = "sp_T_CreditCard_FindbyColumn";
            try
            {
                dataTable = new DataTable();
                adapter = new SqlDataAdapter();
                SqlConnection conn = OpenConnection();
                if (data != null)
                {

                    parameterList.AddRange(GetParameters(procName, data).ToArray());
                }
                command = new SqlCommand(procName, conn);
                command.CommandType = CommandType.StoredProcedure;
                if (data != null)
                {



                    command.Parameters.AddRange(parameterList.ToArray());
                }



                reader = command.ExecuteReader();


                obj = ConvertX.ConvertDataReaderToObjectList<T_CreditCardDTO>(reader).FirstOrDefault();

              




            }
            catch (Exception ex) { }
            finally
            {
                reader.Close();
                CloseConnection();
            }
            return obj;


        }



      


    

        public override DataTable FindByColumn(object data)
        {
            throw new NotImplementedException();
        }
    }
}
