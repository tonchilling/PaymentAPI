using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using DAL;
using DTO;
/// <summary>
/// Summary description for BaseBL
/// </summary>
public abstract class BaseBL
{


    static string System = "TranAPI";
    public abstract bool Action();
    public abstract bool Add(object data);
    public abstract bool Update(object data);
    public abstract bool Delete(object data);
    public abstract DataTable FindByAll();
    public abstract DataTable FindByColumn(object data);
    
    public BaseBL()
    { }


    protected static void Log(string pageName,string level,string message)
    {
        LogDAL logDAL = new LogDAL();
        LogDTO dto = new LogDTO();
        dto.System = System;
        dto.Page = pageName;
        dto.Level = level;
        dto.Message = message;
        logDAL.Add(dto);
    }
    protected DataTable ConvertPageToDataTable(DataTable dt)
    {
      /*  DataRow dr = dt.NewRow();
        dt.Rows.Add(dr);
      
            foreach (DataColumn c in dt.Columns)
            {
                dt.Rows[0][c.ColumnName] = myPage.Request.Form[c.ColumnName] != null ? myPage.Request.Form[c.ColumnName].ToString() : "";
            }
        */
            return dt;
      
    }


}