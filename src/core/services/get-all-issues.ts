import { client, q } from 'core/services/db-client';

const getAllIssues = client
  .query(q.Paginate(q.Match(q.Ref('indexes/all_issues'))))
  .then((response: any) => {
    const issueRefs = response.data;
    // create new query out of issue refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProductDataQuery = issueRefs.map((ref: any) => {
      return q.Get(ref);
    });
    // query the refs
    return client.query(getAllProductDataQuery).then(data => data);
  })
  .catch(error => console.warn('error', error.message));

export { getAllIssues };
