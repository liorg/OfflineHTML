<%@ WebHandler Language="C#" Class="SignatureService" %>

using System;
using System.Web;
using Test.DataModel;
public class SignatureService : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        if (context.Request.Url.AbsolutePath.Contains("SetMissionSignature"))
        {
            System.IO.Stream body = context.Request.InputStream;
            System.Text.Encoding encoding = context.Request.ContentEncoding;
            System.IO.StreamReader reader = new System.IO.StreamReader(body, encoding);
            //if (context.Request.ContentType != null)   
            //{   
            //    context.Response.Write("Client data content type " + context.Request.ContentType);   
            //}   
            string s = reader.ReadToEnd();
            //string[] content = s.Split('&');
            //for (int i = 0; i < content.Length; i++)
            //{
            //    string[] fields = content[i].Split('=');
            //    context.Response.Write(" <DIV><STRONG>" + fields[0] + "</STRONG></DIV>  ");
            //    context.Response.Write("<DIV>" + fields[1] + "</DIV> ");
            //}
            //context.Response.Write(s);   
            context.Response.Write("<DIV>eee</DIV> ");
            body.Close();
            reader.Close();

        }
        context.Response.Write("Hello World");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}