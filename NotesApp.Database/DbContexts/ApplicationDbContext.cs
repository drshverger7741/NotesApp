using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;
using NotesApp.DataBase.Models;

namespace NotesApp.DataBase.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }
        public DbSet<Note> Note { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Reminder> Reminder { get; set; }

    }
}
