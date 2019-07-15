using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System.ServiceModel;

namespace OrgService
{
    [ServiceContract]
    public interface IOrgService
    {
        [OperationContract]
        EntityCollection RetrieveMultiple(QueryExpression query);
    }
}
