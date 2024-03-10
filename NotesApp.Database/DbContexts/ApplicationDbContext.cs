using Microsoft.EntityFrameworkCore;
using NotesApp.DataBase.Models;

namespace NotesApp.DataBase.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Note> Note { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Reminder> Reminder { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>()
                .Property(e => e.DateCreate)
                .HasConversion(v => v.UtcDateTime, v => new DateTimeOffset(v, TimeSpan.Zero));

            modelBuilder.Entity<Note>()
                .Property(e => e.DateToNeedComlete)
                .HasConversion(v => v.UtcDateTime, v => new DateTimeOffset(v, TimeSpan.Zero));

            modelBuilder.Entity<Reminder>()
                .Property(e => e.DateToNeedComleteReminder)
                .HasConversion(v => v.UtcDateTime, v => new DateTimeOffset(v, TimeSpan.Zero));

        }

    }
}
