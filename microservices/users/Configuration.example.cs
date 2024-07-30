namespace api
{
    public static class ConfigurationExample
    {
        public static string JwtKey { get; set; } = "";

        public static string PasswordKey { get; set; } = "";
        public static string ConnectionString { get; set; } = @"Server=host,port;Database=db;User Id=user;Password=password";
    }
}