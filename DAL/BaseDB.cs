using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    /// <summary>
    /// Summary description for PiyaphonDB
    /// </summary>
    public abstract class BaseDB
    {
       protected  bool isCan = false;
        string _conStr = "";
        SqlParameter parameter = null;

        protected DataTable dataTable = null;
         SqlConnection connection = null;
        protected SqlCommand command = null;
        protected SqlDataAdapter adapter = null;
        protected SqlDataReader reader = null;
        List<SqlParameter> parameterList = null;


        public abstract bool Add(object data);
        public abstract bool Update(object data);
        public abstract bool Delete(object data);
        public abstract DataTable FindByAll();
        public abstract DataTable FindByColumn(object data);

        public BaseDB()
        {
            _conStr = System.Configuration.ConfigurationSettings.AppSettings["CurrentDB"];
        }

        protected string connectionString
        {
            get { return _conStr; }
        }


      
        protected bool CloseConnection()
        {

            try {

                if (connection != null && connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
            catch (Exception ex){
            
            }

            return isCan;
        }

        protected SqlConnection OpenConnection()
        {

            try
            {

                if (connection != null && connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection = null;
                }

                connection = new SqlConnection(connectionString);
                connection.Open();
            }
            catch (Exception ex)
            {

            }

            return connection;
        }

        protected bool ExcecuteNoneQuery(string procName,DataTable dt)
        {
            parameterList = new List<SqlParameter>();

            try
            {
                if (dt != null)
                {
                    parameterList.AddRange(GetParameters(procName, dt).ToArray());
                }
                command = new SqlCommand(procName, connection);
                command.CommandType = CommandType.StoredProcedure;
                if (dt != null)
                {
                    command.Parameters.AddRange(parameterList.ToArray());
                }
                command.ExecuteNonQuery();
                isCan = true;
            }catch(Exception ex){}
                finally{}
            return isCan;

        }


        protected bool ExcecuteNoneQuery(string procName, object dt)
        {
            parameterList = new List<SqlParameter>();
            SqlParameter param=null;
            int error = 0;
            isCan = false;
                if (dt != null)
                {
                    parameterList.AddRange(GetParameters(procName, dt).ToArray());
                }
                command = new SqlCommand(procName, connection);
                command.CommandType = CommandType.StoredProcedure;
                if (dt != null)
                {
                    //parameterList.Add(new SqlParameter("@ERROR_CODE", SqlDbType.Int));
                    if (parameterList[parameterList.Count - 1].ParameterName == "@ERROR_CODE")
                    {
                        parameterList[parameterList.Count - 1].Value = 0;
                    }
                    command.Parameters.AddRange(parameterList.ToArray());

                }
                command.ExecuteNonQuery();

          
                isCan = true;
        
            return isCan;
        }



        protected DataTable ExcecuteToDataTable(string procName, DataTable dt)
        {
            parameterList = new List<SqlParameter>();
            dataTable = null;
            try
            {
                dataTable = new DataTable();
                adapter = new SqlDataAdapter();
                if (dt != null)
                {
                    parameterList.AddRange(GetParameters(procName, dt).ToArray());
                }
                command = new SqlCommand(procName, connection);
                command.CommandType = CommandType.StoredProcedure;
                if (dt != null)
                {
                    command.Parameters.AddRange(parameterList.ToArray());
                }

                adapter.SelectCommand = command;
                adapter.Fill(dataTable);
                isCan = true;
            }
            catch (Exception ex) { }
            finally { }
            return dataTable;

        }


        protected List<SqlParameter> GetParameters(string procName, DataTable dt)
        {
            SqlParameter[] paramArray = null;
            parameterList = new List<SqlParameter>();
            command = new SqlCommand(procName, connection);
            command.CommandType = CommandType.StoredProcedure;
            SqlCommandBuilder.DeriveParameters(command);

            paramArray = new SqlParameter[command.Parameters.Count];
            command.Parameters.CopyTo(paramArray,0);
            command.Parameters.Clear();
            parameterList.AddRange(paramArray);
            parameterList.RemoveAt(0);
            
            foreach(DataRow dr in dt.Rows)
            {
                foreach (DataColumn dc in dt.Columns)
                {
                    parameter = parameterList.Find(delegate(SqlParameter p) {
                        return p.ParameterName == dc.ColumnName;
                    });

                    if (parameter != null)
                    {
                        parameter.Value = dr[dc.ColumnName];
                    }
                }
               
            }

            return parameterList;
        }

      


        protected List<SqlParameter> GetParameters(string procName,object obj) 
        {

            var properties = obj.GetType().GetProperties();



            SqlParameter[] paramArray = null;
            parameterList = new List<SqlParameter>();
            command = new SqlCommand(procName, connection);
            command.CommandType = CommandType.StoredProcedure;
            SqlCommandBuilder.DeriveParameters(command);

            paramArray = new SqlParameter[command.Parameters.Count];
            command.Parameters.CopyTo(paramArray, 0);
            command.Parameters.Clear();
            parameterList.AddRange(paramArray);
            parameterList.RemoveAt(0);



            foreach (var property in properties)
            {
                    parameter = parameterList.Find(delegate(SqlParameter p)
                    {
                        return p.ParameterName.ToLower().IndexOf(property.Name.ToLower()) > -1;
                    });

                    if (parameter != null)
                    {
                        parameter.Value = property.GetValue(obj,null)==null ?"": property.GetValue(obj, null);
                    }
                }


            return parameterList;
        }
    }
}