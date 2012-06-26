using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Net.Http;

namespace Sage.SDataHandler
{

        [DataContract]
        public class SDataResourceMetadata<T> where T : class
        {
            [DataMember(Name = "$url")]
            public String url { get; set; }

            [DataMember(Name = "$httpStatus")]
            public String httpStatus { get; set; }

            [DataMember]
            public T Resource { get; set; }


            public SDataResourceMetadata(HttpResponseMessage httpResponse, bool isIQueryable)
            {
                //this.Timestamp = DateTime.Now;
                this.httpStatus = httpResponse.StatusCode.ToString();

                if (httpResponse.Content != null && httpResponse.IsSuccessStatusCode)
                {
                    Uri reqUri = httpResponse.RequestMessage.RequestUri;
                    this.url = reqUri.AbsoluteUri;

                    T responseObject;
                    httpResponse.TryGetContentValue<T>(out responseObject);
                    this.Resource = responseObject;
                }
            }
        }

}