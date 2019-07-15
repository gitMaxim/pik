using System.Linq;
using WcfService.Register.DTO;

namespace WcfService.Register
{
    public class RegisterMethods
    {
        private readonly string[] _correctLogins = new string[] { "pikuser", "guestuser" };

        public RegisterResponse Register(RegisterRequest request)
        {
            bool isLoginCorrect = IsLoginCorrect(request.Login);

            var response = new RegisterResponse
            {
                HasError = !isLoginCorrect,
                Message = isLoginCorrect ? "Успешно" : "Ошибка. Не найден логин."
            };

            return response;
        }

        private bool IsLoginCorrect(string login)
        {
            return _correctLogins.Contains(login);
        }
    }
}