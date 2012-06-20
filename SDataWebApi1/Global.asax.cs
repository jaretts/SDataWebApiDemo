using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using WebApiSDataProvider.Controllers;
using WebApiSDataProvider.DependencyResolvers;
using WebApiSDataProvider.SData;
using MobileReports.Models;
using MongoRepository.Repository;
using Microsoft.Practices.Unity;


namespace WebApiSDataProvider
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            RegisterDependencyResolver();
            GlobalConfiguration.Configuration.MessageHandlers.Add(new SDataHandler());

        }

        private static void RegisterDependencyResolver()
        {
            UnityContainer unity = new UnityContainer();
            
            // Register the Customer Controller
            unity.RegisterType<CustomersController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<Customer>, MongoRepository<Customer>>(
                                new HierarchicalLifetimeManager(),
                                new InjectionConstructor("customers"));

            // Register the Products Controller
            unity.RegisterType<ProductController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<Products>, MongoRepository<Products>>(
                                new HierarchicalLifetimeManager(), 
                                new InjectionConstructor("Products"));

            // Register the Customer Controller
            unity.RegisterType<SalesOrderController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<SalesOrder>, MongoRepository<SalesOrder>>(
                                new HierarchicalLifetimeManager(),
                                new InjectionConstructor("SalesOrderHeader"));


            GlobalConfiguration.Configuration.DependencyResolver = new IoCContainer(unity);
        }
    }
}