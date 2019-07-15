using System;
using System.Configuration;
using System.ServiceModel;
using Microsoft.Xrm.Sdk.Query;
using OrgServiceDataContract;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length != 1)
            {
                Console.WriteLine("Error: only oppId required.");
                return;
            }

            if (!Guid.TryParse(args[0], out Guid oppId))
            {
                Console.WriteLine("Error: couldn't parse passed oppId argument.");
                return;
            }

            try
            {
                var crmQueries = new CrmQueries();

                QueryExpression queryExpression = crmQueries.CreateFlatworkQueryExpression(oppId);
                FetchExpression fetchExpression = crmQueries.CreateFlatworkFetchExpression(oppId);

                string serviceAddress = ConfigurationManager.AppSettings["orgServiceAddress"];
                int maxBufferSize = int.Parse(ConfigurationManager.AppSettings["maxBufferSize"]);
                int timeoutSeconds = int.Parse(ConfigurationManager.AppSettings["timeoutSeconds"]);

                TimeSpan defaultTimeSpan = new TimeSpan(0, 0, timeoutSeconds);

                var binding = new BasicHttpBinding(BasicHttpSecurityMode.Transport)
                {
                    MaxReceivedMessageSize = maxBufferSize,
                    MaxBufferSize = maxBufferSize,
                    CloseTimeout = defaultTimeSpan,
                    SendTimeout = defaultTimeSpan,
                    ReceiveTimeout = defaultTimeSpan,
                    Security =
                    {
                        Transport =
                        {
                            ClientCredentialType = HttpClientCredentialType.None
                        }
                    }
                };

                var address = new EndpointAddress(serviceAddress);
                var orgServiceFactory = new ChannelFactory<IOrgServiceDataContract>(binding, address);
                IOrgServiceDataContract orgService = orgServiceFactory.CreateChannel();

                var result = orgService.RetrieveMultiple(queryExpression);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
