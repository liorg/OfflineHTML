using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace Test.DataModel
{
    /// <summary>
    /// Summary description for Gazitcatalogitem
    /// </summary>
    public class Gazitcatalogitem
    {
        public string ItemCode { get; set; }
        public string ItemDesc { get; set; }
        public string FeatureCode { get; set; }
        public int SupplierCode { get; set; }
        public string SupplierDesc { get; set; }

        public int FamilyTypeCode { get; set; }
        public string FamilyTypeDesc { get; set; }

        public int SubFamilyTypeCode { get; set; }
        public string SubFamilyTypeDesc { get; set; }


        public double Cost { get; set; }
        public double PriceNoVat { get; set; }
        public int MaxPayments { get; set; }
        public int SaleId { get; set; }
        public string DescSale { get; set; }

        public double PersentDiscount { get; set; }
        public double PriceSaleNoVAT { get; set; }
        public double PriceSale { get; set; }
        public string ItemStatus { get; set; }
        public string DeltaId { get; set; }

        public DateTime UpdateDate { get; set; }
        public string IsOnSale { get; set; }
        public double Price { get; set; }
        public double VAT { get; set; }

    }
}