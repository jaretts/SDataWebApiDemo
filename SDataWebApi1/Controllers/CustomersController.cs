using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MobileReports.Models;

namespace WebApiSDataProvider.Controllers
{
    public class CustomersController : DefaultController<Customer>
    {
        public CustomersController(IRepository<Customer> repo) : base(repo) {  }
    }

}
