<%@ WebHandler Language="C#" Class="data" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using Test.DataModel;
public class data : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public static  string  CheckCustomerOkToJson 
    { 
        get
        {
            return HttpContext.Current.Session["CheckCustomerOkToJson"] as string;
        }
        set
        {
            HttpContext.Current.Session["CheckCustomerOkToJson"] = value;
            
        }
    }
    static  HttpContext _context;
    
    public static void UpdateCheckCustomerOk(string missionId,string missionSoId,bool flag)
    {
        var oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        var dicJson = CheckCustomerOkToJson;
        var key = missionId.Trim() + "_" + missionSoId.Trim();
        var dic = new Dictionary<string, bool>();

        if (!String.IsNullOrEmpty(dicJson))
        {
            dic = oSerializer.Deserialize(dicJson, dic.GetType()) as Dictionary<string, bool>;

        }
        if (dic.ContainsKey(key))
            dic[key] = flag;
        else    
            dic.Add(key, flag);
        CheckCustomerOkToJson = oSerializer.Serialize(dic);
        
    }
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        _context = context;
        UpdateCheckCustomerOk("1", "2", true);
        UpdateCheckCustomerOk("2", "4", true);

        context.Response.Write(CheckCustomerOkToJson);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}