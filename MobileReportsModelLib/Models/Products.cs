using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using MongoDB.Bson.Serialization.Attributes;

namespace MobileReports.Models
{
    [DataContract]
    [BsonIgnoreExtraElements]
    public class Products : MobileModelEntity
    {
        [DataMember]
        public String name { get; set; }

        [DataMember]
        public double price { get; set; }
    }
}
