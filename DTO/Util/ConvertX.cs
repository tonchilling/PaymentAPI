using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.ComponentModel;
using System.Globalization;
using System.Reflection;
using System.Data;
using System.Data.SqlClient;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.IO;


namespace DTO.Util
{
   public class ConvertX
    {

        public static int ToInt(object value)
        {

            int result = 0;
            try {
                result = Convert.ToInt32(value);
            }
            catch { }
            finally { }
            return result;
        }

       public static T GetFromQueryString<T>() where T : new()
       {
           var obj = new T();
           var properties = typeof(T).GetProperties();
           string proName = "";
           foreach (var property in properties)
           {
              List<string> allKey=  new List<string>();
              allKey.AddRange(HttpContext.Current.Request.QueryString.AllKeys);
              proName = allKey.Find(delegate(string data) {
                  return (data.IndexOf(property.Name) > -1);
              });
              var valueAsString = HttpContext.Current.Request.QueryString[proName];
               var value = Parse(property.PropertyType, valueAsString);

               if (value == null)
                   continue;

               property.SetValue(obj, value, null);
           }
           return obj;
       }

       public static T GetReqeustForm<T>() where T : new()
       {
           var obj = new T();
           var properties = typeof(T).GetProperties();
           string proName = "";
           foreach (var property in properties)
           {
               List<string> allKey = new List<string>();
               allKey.AddRange(HttpContext.Current.Request.Form.AllKeys);
              
               proName = allKey.Find(delegate(string data)
               {
                   return (data.ToLower().IndexOf(property.Name.ToLower()) > -1);
               });
               var valueAsString = HttpContext.Current.Request.Form[proName];
               var value = Parse(property.PropertyType, valueAsString);

               if (value == null)
                   continue;

               property.SetValue(obj, value, null);
           }
           return obj;
       }


        public static T GetReqeustQueryString<T>() where T : new()
        {
            var obj = new T();
            var properties = typeof(T).GetProperties();
            string proName = "";
            foreach (var property in properties)
            {
                List<string> allKey = new List<string>();
                allKey.AddRange(HttpContext.Current.Request.QueryString.AllKeys);
                proName = allKey.Find(delegate (string data)
                {
                    return (data.ToLower().IndexOf(property.Name.ToLower()) > -1);
                });
                var valueAsString = HttpContext.Current.Request.QueryString[proName];
                var value = Parse(property.PropertyType, valueAsString);

                if (value == null)
                    continue;

                property.SetValue(obj, value, null);
            }
            return obj;
        }


        public static IEnumerable<T> GetListFromDataReader<T>(SqlDataReader reader) where T : new()
       {

            var obj = new T();
           var properties = typeof(T).GetProperties();
           string proName = "";
           var columnList = (reader.GetSchemaTable().Select()).Select(r => r.ItemArray[0].ToString());
           while (reader.Read())
           {
               var element = Activator.CreateInstance<T>();
               foreach (var property in properties)
               {
                   if (!columnList.Contains(property.Name) )
                   {
                       continue;
                   }
                   var o = (object)reader[property.Name];
                   if (o.GetType() != typeof(DBNull)) property.SetValue(element, ChangeType(o, property.PropertyType), null);
               }
               yield return element;
           }
           
       }

       public static List<T> ConvertDataReaderToObjectList<T>(SqlDataReader reader) 
       {

           var obj = new List<T>();
           var properties = typeof(T).GetProperties();
           string proName = "";
           var colNames = (reader.GetSchemaTable().Select()).Select(r => r.ItemArray[0].ToString()).ToList();
           while (reader.Read())
           {
              var item=Activator.CreateInstance<T>();
              foreach (var property in typeof(T).GetProperties())
              {
                    property.SetValue(item, null);
                  if (colNames.Find(delegate(string colName)
                  {
                      return colName.ToLower().Equals(property.Name.ToLower());
                  })!=null) {

                      Type convertTo = Nullable.GetUnderlyingType(property.PropertyType)??property.PropertyType;

                        if (convertTo.IsEnum)
                        {
                          object  value = Enum.Parse(convertTo, reader[property.Name].ToString(), true);

                            property.SetValue(item, Convert.ChangeType(value, convertTo), null);
                        }
                        else {
                            property.SetValue(item, Convert.ChangeType(reader[property.Name], convertTo), null);

                        }

                       
                     
                  }
              }

              obj.Add(item);

           }

           return obj;

       }



      /* public static IEnumerable<T> GetListFromDataReader<T>(IDataReader reader) where T : new()
       {
           var properties = typeof(T).GetProperties();

           var modelProperties = new List<string>();
           var columnList = (reader.GetSchemaTable().Select()).Select(r => r.ItemArray[0].ToString());
           while (reader.Read())
           {
               var element = Activator.CreateInstance<T>();
               Dictionary<string, string> dbMappings = DBColumn(element);
               string columnName;
               foreach (var f in properties)
               {

                   if (!columnList.Contains(f.Name) && !dbMappings.ContainsKey(f.Name))
                       continue;
                   columnName = dbMappings.ContainsKey(f.Name) ? dbMappings[f.Name] : f.Name;
                   var o = (object)reader[columnName];

                   if (o.GetType() != typeof(DBNull)) f.SetValue(element, ChangeType(o, f.PropertyType), null);
               }
               yield return element;
           }

       }*/

       public static object ChangeType(object value, Type conversion)
       {
           var t = conversion;

           if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
           {
               if (value == null)
               {
                   return null;
               }

               t = Nullable.GetUnderlyingType(t); ;
           }

           return Convert.ChangeType(value, t);
       }


        /*       public static Dictionary<string,string> DBColumn<T>(T item) where T:new()
        {

            Dictionary<string, string> dbMappings = new Dictionary<string, string>();
            var type = item.GetType();
            var properties = type.GetProperties();
            foreach (var property in properties)
            {
                var attributes = property.GetCustomAttributes(false);
                var columnMapping = attributes
            .FirstOrDefault(a => a.GetType() == typeof(DbColumnAttribute));
                if (columnMapping != null)
                {
                    dbMappings.Add(property.Name, ((DbColumnAttribute)columnMapping).Name);
                }
            }
            return dbMappings;
        }
        */

        public static string GetFullDate()
        {
            string value = string.Format("",DateTime.Now.Year
                                           , DateTime.Now.Month
                                            , DateTime.Now.Day
                                            , DateTime.Now.Hour
                                            , DateTime.Now.Second
                                             , DateTime.Now.Millisecond);

            return value;
        }

       public static object Parse(Type dataType,string ValueToConvert)
    {
        TypeConverter obj = TypeDescriptor.GetConverter(dataType);
        object value = ValueToConvert != null  ? obj.ConvertFromString(null, CultureInfo.InvariantCulture, ValueToConvert) : null ;
        return value;
    }


        public static bool Compare<T>(string op, T x, T y) where T : IComparable
        {
            bool result = false;
            switch (op)
            {
                case "==": result = (x.CompareTo(y) == 0); break;
                case "!=": result = x.CompareTo(y) != 0; break;
                case ">": result = x.CompareTo(y) > 0; break;
                case ">=": result = x.CompareTo(y) >= 0; break;
                case "<": result = x.CompareTo(y) < 0; break;
                case "<=": result = x.CompareTo(y) <= 0; break;
                default:   result = (x.CompareTo(y) == 0); break;
            }

            return result;
        }

        public static bool Compare<T>(string op,T opValue, T x, T y) where T : IComparable
        {
            bool result = false;
            switch (op)
            {
                case "==": result = (x.CompareTo(y) == 0); break;
                case "!=": result = x.CompareTo(y) != 0; break;
                case ">": result = x.CompareTo(y) > 0; break;
                case ">=": result = x.CompareTo(y) >= 0; break;
                case "<": result = x.CompareTo(y) < 0; break;
                case "<=": result = x.CompareTo(y) <= 0; break;
                case "%": result = (Convert.ToInt32(x)% Convert.ToInt32(opValue)).CompareTo(Convert.ToInt32(y)) <= 0; break;
                default: result = (x.CompareTo(y) == 0); break;
            }

            return result;
        }





    }
}
