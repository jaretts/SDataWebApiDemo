using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApiSDataProvider
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(name: "SDataSingleResourceKind",
                 routeTemplate: "sdata/{controller}('{selector}')",
                 defaults: new { selector = RouteParameter.Optional });

            routes.MapHttpRoute(name: "SDataCollection",
                routeTemplate: "sdata/{controller}/{query}",
                defaults: new { query = RouteParameter.Optional });

            routes.MapHttpRoute(name: "SDataGenericCollection",
                routeTemplate: "sdata/-/{query}",
                defaults: new { query = RouteParameter.Optional });

            routes.MapHttpRoute(name: "SDataCollectionFull",
                routeTemplate: "sdata/-/-/-/{controller}/{query}",
                defaults: new { query = RouteParameter.Optional });
        }
    }
}