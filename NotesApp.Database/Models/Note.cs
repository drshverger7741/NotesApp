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
        public DateTimeOffset DateCreate { get; set; } 
        public DateTimeOffset DateToNeedComlete { get; set; }

        // Теги
        public List<string>? Tags { get; set; } = new List<string>();

        public int? ReminderId { get; set; }


    }
}
