using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;

namespace Sage.SDataHandler
{
    public class SDataUriKeys
    {
        public static MediaTypeWithQualityHeaderValue JSON_ACCEPT_HEADER
                            = new MediaTypeWithQualityHeaderValue("application/" + SDataUriKeys.JSON_FORMAT_TYPE);

        public const int CONVERT_TO_SDATA = 1;
        public const int CONVERT_TO_ODATA = 2;

        public const String HEADER_SDATA_TRANSFORMED = "SDataTransformed";

        public const String SDATA_STARTINDEX = "startindex";
        public const String ODATA_STARTINDEX = "$skip";

        public const String SDATA_COUNT = "count";
        public const String ODATA_COUNT = "$top";

        public const String SDATA_ORDERBY = "orderby";
        public const String ODATA_ORDERBY = "$orderby";

        public const String SDATA_INCLUDE = "include";
        public const String ODATA_INCLUDE = "$expand";

        public const String SDATA_WHERE = "where";
        public const String ODATA_WHERE = "$filter";

        public const String SDATA_SELECT = "select";
        public const String ODATA_SELECT = "$select";

        public const String SDATA_FORMAT_PARAM = "format";
        public const String JSON_FORMAT_TYPE = "json";

    }
}