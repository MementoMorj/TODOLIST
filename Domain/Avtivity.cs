using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    
    public class Activity
    {
        public Guid Id { get; set; }
        public string TaskName { get; set; }
        public DateTime DataOfCreation { get; set; }
        public DateTime DateOfExperation { get; set; }
        public string TaskDescription { get; set; }
        public string TaskStatus { get; set; }
       
    }
}