using System.ComponentModel.DataAnnotations;

namespace NotesApp.DataBase.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        // Связь многие-ко-многим с заметками
        public ICollection<Note>? Notes { get; set; } = new List<Note>();
    }
}
