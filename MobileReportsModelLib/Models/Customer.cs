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
    public class Customer : MobileModelEntity
    {
        [DataMember]
        public String customername { get; set; }

        [DataMember]
        public String addressline1 { get; set; }

        [DataMember]
        public String city { get; set; }

        [DataMember]
        public String state { get; set; }

        [DataMember]
        public String zipcode { get; set; }

        [DataMember]
        public String telephoneno { get; set; }

        [DataMember]
        public Double openorderamt { get; set; }
    }
}