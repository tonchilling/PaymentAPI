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
    public class T_CardValidationDAL : BaseDB
    {

        List<T_CardValidationDTO> objList = null;
        T_CardValidationDTO obj = null;

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


        public T_CardValidationDTO FindByPK(object data)
        {
            SqlDataReader reader = null;
            List<SqlParameter> parameterList = new List<SqlParameter>();
            objList = new List<T_CardValidationDTO>();
            dataTable = null;

            string procName = "[sp_T_CardValidation_FindByPK]";
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


                obj = ConvertX.ConvertDataReaderToObjectList<T_CardValidationDTO>(reader).FirstOrDefault();

              




            }
            catch (Exception ex) {
                throw new Exception("T_CardValidationDAL.FindByPK",ex);

            }
            finally
            {
                reader.Close();
                CloseConnection();
            }
            return obj;


        }



        public List<T_CardValidationDTO> FindByObjList(object data)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            objList = new List<T_CardValidationDTO>();
            dataTable = null;

            string procName = "";

            procName = string.Format("sp_T_CardValidation_FindAll"); 

            try
            {

                adapter = new SqlDataAdapter();
                SqlConnection conn = OpenConnection();
                command = new SqlCommand(procName, conn);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader();
                objList = ConvertX.ConvertDataReaderToObjectList<T_CardValidationDTO>(reader);
                reader.Close();


            }
            catch (Exception ex) { }
            finally
            {
                CloseConnection();
            }
            return objList;
        }


        public List<T_CardValidationDTO> FindByCardTypeObjList(object data)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            objList = new List<T_CardValidationDTO>();
            dataTable = null;

            string procName = "";

            procName = string.Format("sp_T_CardValidation_ByCardType");

            try
            {

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

                SqlDataReader reader = command.ExecuteReader();
                objList = ConvertX.ConvertDataReaderToObjectList<T_CardValidationDTO>(reader);
                reader.Close();


            }
            catch (Exception ex) { }
            finally
            {
                CloseConnection();
            }
            return objList;
        }

        public override DataTable FindByColumn(object data)
        {
            throw new NotImplementedException();
        }
    }
}
