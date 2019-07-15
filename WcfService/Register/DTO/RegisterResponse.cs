using System.Runtime.Serialization;

namespace WcfService.Register.DTO
{
    [DataContract]
    public class RegisterResponse
    {
        [DataMember(Name = "message")]
        public string Message { get; set; }

        [DataMember(Name = "hasError")]
        public bool HasError { get; set; }
    }
}