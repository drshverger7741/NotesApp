using System.ComponentModel.DataAnnotations;

namespace NotesApp.DataBase.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
