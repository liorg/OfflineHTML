<%@ WebHandler Language="C#" Class="data" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using Test.DataModel;
public class data : IHttpHandler
{
    //SELECT ItemCode, ItemDesc, FeatureCode, SupplierCode, SupplierDesc,
    //FamilyTypeCode, FamilyTypeDesc, 
    //SubFamilyTypeCode, SubFamilyTypeDesc,
    //Cost, PriceNoVat, MaxPayments, SaleId, DescSale, 
    
    //PersentDiscount, PriceSaleNoVAT, PriceSale, ItemStatus, DeltaId, 
    //UpdateDate, IsOnSale, Price, VAT FROM "main"."gazitcatalogitems";
   
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        var connStr = @"Password=atadsi;Persist Security Info=True;User ID=MMIS_Data_dbo;Initial Catalog=MMIS_Bezeq_MobileXXX;Data Source=.\sqlexpress";
        List<Gazitcatalogitem> Gazitcatalogitems = new List<Gazitcatalogitem>();

        using (var conn = new SqlConnection(connStr))
        {
            var command = "SELECT ItemCode, ItemDesc, FeatureCode, SupplierCode, SupplierDesc, FamilyTypeCode, FamilyTypeDesc, SubFamilyTypeCode, SubFamilyTypeDesc, Cost, PriceNoVat, MaxPayments, SaleId, DescSale, PersentDiscount, PriceSaleNoVAT, PriceSale, ItemStatus, DeltaId, UpdateDate, IsOnSale, Price, VAT FROM gazitcatalogitems";
            var cmd = new SqlCommand(command, conn);
            cmd.Connection.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Gazitcatalogitem item = new Gazitcatalogitem();
                item.ItemCode = dr.GetString(0);
                item.ItemDesc = dr.GetString(1);
                item.FeatureCode = dr.GetString(2);
                item.SupplierCode = dr.GetInt32(3);
                item.SupplierDesc = dr.GetString(4);
                item.FamilyTypeCode = dr.GetInt32(5);
                item.FamilyTypeDesc = dr.GetString(6);
                item.SubFamilyTypeCode = dr.GetInt32(7);
                item.SubFamilyTypeDesc = dr.GetString(8);
                item.Cost = dr.GetDouble(9);
                item.PriceNoVat = dr.GetDouble(10);
                item.MaxPayments = dr.GetInt32(11);
                item.SaleId = dr.GetInt32(12);
                item.DescSale = dr.GetString(13);

                item.PersentDiscount = dr.GetDouble(14);
                item.PriceSale = dr.GetDouble(15);
                item.PriceSaleNoVAT = dr.GetDouble(16);
                item.ItemStatus = dr.GetString(17);
                item.DeltaId = dr.GetString(18);

                item.UpdateDate = dr.GetDateTime(19);
                item.IsOnSale = dr.GetString(20);
                item.Price = dr.GetDouble(21);
                item.VAT = dr.GetDouble(22);
                
                Gazitcatalogitems.Add(item);
            }
            dr.Close();
        }

        var oSerializer = new JavaScriptSerializer();
        string sJSON = oSerializer.Serialize(Gazitcatalogitems);
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