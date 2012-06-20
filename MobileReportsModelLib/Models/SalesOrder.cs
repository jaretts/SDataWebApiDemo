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
    public class SalesOrder : MobileModelEntity
    {
        [DataMember]
        public String salesorderno { get; set; }

        [DataMember]
        public string customerno { get; set; }
    }
}
