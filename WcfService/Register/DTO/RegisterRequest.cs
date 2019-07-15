using System.Runtime.Serialization;

namespace WcfService.Register.DTO
{
    [DataContract]
    public class RegisterRequest
    {
        [DataMember(Name = "login")]
        public string Login { get; set; }

        [DataMember(Name = "lastName")]
        public string LastName { get; set; }

        [DataMember(Name = "firstName")]
        public string FirstName { get; set; }
    }
}