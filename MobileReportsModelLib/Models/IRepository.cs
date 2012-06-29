using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MobileReports.Models;

namespace MobileReports.Models
{
    public interface IRepository<T> where T : MobileModelEntity // class
    {
        IQueryable<T> GetAll();

        T GetTemplate();
    }
}
