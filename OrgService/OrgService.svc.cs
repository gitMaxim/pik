using System.Collections.Generic;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace OrgService
{
    public class OrgService : IOrgService
    {
        public EntityCollection RetrieveMultiple(QueryExpression query)
        {
            var entities = new List<Entity>();
            entities.Add(new Entity("QueryExpressionRetrieveResult"));

            var entityCollection = new EntityCollection(entities);

            return entityCollection;
        }

        //public EntityCollection RetrieveMultiple(FetchExpression query)
        //{
        //    var entities = new List<Entity>();
        //    entities.Add(new Entity("FetchExpressionRetrieveResult"));

        //    var entityCollection = new EntityCollection(entities);

        //    return entityCollection;
        //}
    }
}
