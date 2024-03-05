using System.ComponentModel.DataAnnotations;

namespace NotesApp.DataBase.Models
{
    public class Reminder
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset DateToNeedComleteReminder { get; set; }

        // Связь один-к-одному с заметкой
        public int? NoteId { get; set; }
        public Note? Note { get; set; }
    }
}
