using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MobileReports.Models;

namespace WebApiSDataProvider.Controllers
{
    public class ProductController : DefaultController<Products>
    {
        public ProductController(IRepository<Products> repo)
            : base(repo){ }

    }
}
