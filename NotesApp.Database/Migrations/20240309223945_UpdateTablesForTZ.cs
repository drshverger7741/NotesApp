using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NotesApp.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTablesForTZ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReminderId",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Note");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReminderId",
                table: "Note",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Note",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
