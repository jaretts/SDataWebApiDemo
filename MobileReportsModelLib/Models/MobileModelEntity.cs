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
    public abstract class  MobileModelEntity
    {
        [DataMember(Name = "$url")]
        public String relativeUrl
        {
            get
            {
                return this.GetType().Name + "(" + this._id + ")";
            }
        }

        [DataMember(Name = "$key")]
        [Key]
        public String _id { get; set; }

    }
}
