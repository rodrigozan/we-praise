using api;
using api.Data;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//Inicia a API
StartAPI(builder);

void StartAPI(WebApplicationBuilder builder)
{

    ConfigureAuthentication(builder);
    ConfigureMvc(builder);
    ConfigureServices(builder);


    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseAuthentication();
    app.UseAuthorization();  
    app.MapControllers();
    app.UseCors("CorsPolicy");
    app.Run();
}

void ConfigureAuthentication(WebApplicationBuilder builder)
{

    var key = Encoding.ASCII.GetBytes(Configuration.JwtKey);

    builder.Services.
        AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).
        AddJwtBearer(x =>
        {
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        });
}

void ConfigureMvc(WebApplicationBuilder builder)
{

    builder
        .Services
        .AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder => builder
             .AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader());
        })
        .AddMemoryCache()   
        .AddControllers()
         .AddJsonOptions(x =>
         {
             x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
             x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;
         })
        .ConfigureApiBehaviorOptions(options => {
            options.SuppressModelStateInvalidFilter = true;
        });
}

void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    builder.Services.AddTransient<TokenService>();

    builder.Services.AddMvc().AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.NullValueHandling = NullValueHandling.Include;
        options.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
    });

    builder.Services.AddSwaggerGen();

}


