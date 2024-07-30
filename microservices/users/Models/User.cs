using api;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public long Celular { get; set; }
        public string Instruments { get; set; }
        public string Subteam { get; set; }
        public bool Active { get; set; }
        public string Role { get; set; }
    }
}