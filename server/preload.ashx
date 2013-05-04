<%@ WebHandler Language="C#" Class="data" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using Test.DataModel;
public class data : IHttpHandler
{
    class exchangeandrefund
    {
        public string CATALOGID { get; set; }
        public string EQUIPMENTCODEID { get; set; }
        public string EQUIPMENTDESC { get; set; }
        public string FAMILYCODE { get; set; }
        public string FAMILYDESCDELTAID { get; set; }
        public string DELTAID { get; set; }
        public string UPDATEDATE { get; set; }
        public string TRANSACTIONID { get; set; }
        
        
    } 
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");

        var theText = System.IO.File.ReadAllText(@"c:\ee.csv");


        string[] allLines = theText.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.None);

        

        var query = from line in allLines
                    let data = line.Split(',')
                    select new exchangeandrefund
                    {
                        CATALOGID = data[0],
                        EQUIPMENTCODEID = data[1],
                        EQUIPMENTDESC = data[2],
                        FAMILYCODE = data[3],
                        FAMILYDESCDELTAID = data[4],
                        DELTAID = data[5],
                        UPDATEDATE = data[6],
                        TRANSACTIONID = data[7]
                    };
        List<exchangeandrefund> list = new List<exchangeandrefund>();
        
        foreach (var item in query)
        {
            try
            {
               
                list.Add(item);
            }
            catch (Exception ee)
            {
                
               // throw;
            }
           
            
        }
        System.Web.Script.Serialization.JavaScriptSerializer oSerializer =
         new System.Web.Script.Serialization.JavaScriptSerializer();
        string sJSON = oSerializer.Serialize(list);
        context.Response.Write(sJSON);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}