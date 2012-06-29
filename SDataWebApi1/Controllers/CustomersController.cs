using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MobileReports.Models;

namespace WebApiSDataProvider.Controllers
{
    public class CustomersController: DefaultController<Customer>
    {
        public CustomersController(IRepository<Customer> repo) : base(repo) {  }

        /*
        public Customer Put(string id, Customer customer)
        {

            //Console.Write(customer.ToString());

            var server = MongoServer.Create(connectionString);
            MongoDatabase db = server.GetDatabase("test");

            //IEnumerable<Products> found = db.GetCollection<Products>().Find();

            MongoCollection<Customer> pcollect = db.GetCollection<Customer>("customers");

            //pcollect.Save<Customer>(customer);

            var query = Query.EQ("_id", customer.Id);

            BsonElement bsonElem = new BsonElement("_id", customer.Id);

            var wrapper = BsonDocumentWrapper.Create(customer);
            var doc = wrapper.ToBsonDocument();
            doc.RemoveElement(bsonElem);

            var update = new UpdateDocument
            {
                { "$set", doc }
            };

            //swm - problem most likely is that $set is not digging the fact that _id in the update.

            pcollect.Update(Query.EQ("_id", customer.Id), update);

            Customer retVal = Get(customer.Id);
            return retVal;
            // pcollect.Update(

        }
         */
    }

}
