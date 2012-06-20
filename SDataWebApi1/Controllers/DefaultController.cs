using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MobileReports.Models;

namespace WebApiSDataProvider.Controllers
{
    public class DefaultController<T> : ApiController where T : MobileModelEntity // class
    {
        public MobileReports.Models.IRepository<T> respository { get; set; }

        public DefaultController(IRepository<T> respository)
        {
            this.respository = respository;
        }

        /// GET api/default
        /// Must have Queryable attribute or OData does not work
        [Queryable] 
        public virtual IQueryable<T> Get()
        {
            IQueryable<T> retVal = respository.GetAll();

            if (retVal == null)
            {
                // should have something now 
                //throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return retVal;
        }

        // GET api/product/5
        public virtual T Get(String selector)
        {
            return Get().FirstOrDefault(y => y._id == selector);
        }

        // POST api/customers
        public void Post(string value)
        {
        }

        // PUT api/customers/5
        public void Put(int id, string value)
        {
        }

        // DELETE api/customers/5
        public void Delete(int id)
        {
        }

    }
}
