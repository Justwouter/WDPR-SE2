using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.DependencyInjection;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ZaalContext>(options =>
  options.UseSqlite("Data Source = ZaalDB.sqlite"));
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

//Two DB's might not be stable RN
builder.Services.AddDbContext<ProgrammaContext>(options =>
  options.UseSqlite("Data Source = ProgammaDB.sqlite"));

builder.Services.AddDbContext<TheaterContext>(options =>
    options.UseSqlite("Data Source = TheaterDB.sqlite"));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<TheaterContext>()
                .AddDefaultTokenProviders();
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("https://localhost:7153/swagger/index.html")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod()
                                                  .AllowAnyOrigin();
                            });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
