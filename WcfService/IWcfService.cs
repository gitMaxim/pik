using System.ServiceModel;
using System.ServiceModel.Web;
using WcfService.Register.DTO;

namespace WcfService
{
    [ServiceContract]
    public interface IWcfService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "Register",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        RegisterResponse Register(RegisterRequest request);
    }
}
