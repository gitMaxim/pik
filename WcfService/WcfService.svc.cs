using System;
using WcfService.Register;
using WcfService.Register.DTO;

namespace WcfService
{
    public class WcfService : IWcfService
    {
        public RegisterResponse Register(RegisterRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException("Null request");
            }

            var registerMethods = new RegisterMethods();
            RegisterResponse response = registerMethods.Register(request);

            return response;
        }
    }
}
