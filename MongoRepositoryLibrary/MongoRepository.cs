using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MobileReports.Models;
using MongoDB.Driver;

namespace MongoRepository.Repository
{
    public class MongoRepository<T> : IRepository<T> where T : MobileModelEntity //class
    { 
        String connectionString = "mongodb://localhost";
        MongoDatabase db;
        String collectionName;

        public MongoRepository(String init_CollectionName)
        {
            var server = MongoServer.Create(connectionString);
            db = server.GetDatabase("test");
            collectionName = init_CollectionName;
        }

        public IQueryable<T> GetAll()
        {
            MongoCollection<T> pcollect = db.GetCollection<T>(collectionName);
            return pcollect.FindAllAs<T>().AsQueryable<T>();
        }
    }

}
