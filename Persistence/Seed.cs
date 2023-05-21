using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;
            
            var activities = new List<Activity>
            {
                new Activity
                {
                   TaskName="Task1",
                    DataOfCreation = DateTime.UtcNow,
                    DateOfExperation=DateTime.UtcNow.AddMonths(1),
                    TaskDescription="Write a code",
                    TaskStatus="Todo",
                  
                },
                new Activity
                {
                   TaskName="Task2",
                    DataOfCreation = DateTime.UtcNow,
                    DateOfExperation=DateTime.UtcNow.AddMonths(1),
                    TaskDescription="Eat a food",
                    TaskStatus="Todo",
                  
                },
                new Activity
                {
                   TaskName="Task3",
                    DataOfCreation = DateTime.UtcNow,
                    DateOfExperation=DateTime.UtcNow.AddMonths(1),
                    TaskDescription="Drink a water",
                    TaskStatus="Todo",
                  
                },
                 new Activity
                {
                   TaskName="Task4",
                    DataOfCreation = DateTime.UtcNow,
                    DateOfExperation=DateTime.UtcNow.AddMonths(1),
                    TaskDescription="Sleep a sleep",
                    TaskStatus="Todo",
                  
                },
                
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}