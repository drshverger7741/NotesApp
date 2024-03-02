using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NotesApp.DataBase.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Status {  get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateToNeedComlete { get; set; }

        // Связь один-ко-многим с тегами
        public ICollection<Tag> Tags { get; set; } = new List<Tag>();

        // Связь один-к-одному с напоминанием
        public Reminder Reminder { get; set; }

    }
}
