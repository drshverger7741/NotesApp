using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NotesApp.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddNullValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reminder_Note_NoteId",
                table: "Reminder");

            migrationBuilder.AlterColumn<int>(
                name: "NoteId",
                table: "Reminder",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Reminder_Note_NoteId",
                table: "Reminder",
                column: "NoteId",
                principalTable: "Note",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reminder_Note_NoteId",
                table: "Reminder");

            migrationBuilder.AlterColumn<int>(
                name: "NoteId",
                table: "Reminder",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reminder_Note_NoteId",
                table: "Reminder",
                column: "NoteId",
                principalTable: "Note",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
