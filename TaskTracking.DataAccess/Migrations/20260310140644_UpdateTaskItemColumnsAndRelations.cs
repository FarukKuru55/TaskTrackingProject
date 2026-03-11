using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTracking.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTaskItemColumnsAndRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PriorityId",
                table: "TaskItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TaskStatusId",
                table: "TaskItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriorityId",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "TaskStatusId",
                table: "TaskItems");
        }
    }
}
