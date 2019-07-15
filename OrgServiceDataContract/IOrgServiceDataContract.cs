using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System.ServiceModel;

namespace OrgServiceDataContract
{
    [ServiceContract]
    public interface IOrgServiceDataContract
    {
        [OperationContract]
        EntityCollection RetrieveMultiple(QueryExpression query);

        //[OperationContract]
        //EntityCollection RetrieveMultiple(FetchExpression query);
    }
}
