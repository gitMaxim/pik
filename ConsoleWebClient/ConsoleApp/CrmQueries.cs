using Microsoft.Xrm.Sdk.Query;
using System;

namespace ConsoleApp
{
    class CrmQueries
    {
        public QueryExpression CreateFlatworkQueryExpression(Guid oppId)
        {
            var queryExpression = new QueryExpression("new_flatwork")
            {
                ColumnSet = new ColumnSet(false),
                Criteria =
                {
                    Conditions =
                    {
                        new ConditionExpression("opportunityid", ConditionOperator.Equal, oppId),
                    }
                },
                LinkEntities =
                {
                    // opportunityid - предполагаемое название поля в карточке new_flatwork, где хранится id связанного opportunity
                    // opportunityid - поле в карточке opportunity, где хранит своё id
                    new LinkEntity("new_flatwork", "opportunity", "opportunityid", "opportunityid", JoinOperator.Inner)
                    {
                        Columns = new ColumnSet(false),
                        LinkEntities =
                        {
                            // new_integratoin_1c - в этом поле вроде бы опечатка; должно быть new_integration_1c?
                            new LinkEntity("opportunity", "new_integratoin_1c", "opportunityid", "ref_opportunityid", JoinOperator.Inner)
                            {
                                Columns = new ColumnSet(false),
                                LinkCriteria =
                                {
                                    Conditions =
                                    {
                                        new ConditionExpression("sync_date", ConditionOperator.OlderThanXDays, 7)
                                    }
                                },
                                EntityAlias = "new_integratoin_1c"
                            }
                        },
                        EntityAlias = "opportunity"
                    }                    
                }
            };

            return queryExpression;
        }

        public FetchExpression CreateFlatworkFetchExpression(Guid oppId)
        {
            var query = $@"
                <fetch mapping='logical'>
                  <entity name='new_flatwork'>
                    <filter type='and'>
                      <condition attribute='opportunityid' operator='eq' value='{oppId}'/>
                    </filter>
                    <link-entity name='opportunity' from='opportunityid' to='opportunityid' link-type='inner' alias='opportunity'>
                      <link-entity name='new_integratoin_1c' from='opportunityid' to='ref_opportunityid' link-type='inner' alias='new_integratoin_1c'>
                        <filter type='and'>
                          <condition attribute='sync_date' operator='olderthan-x-days' value='7'/>
                        </filter>
                      </link-entity>
                    </link-entity>
                  </entity>
                </fetch>";

            var fetchExpression = new FetchExpression(query);

            return fetchExpression;
        }
    }
}
