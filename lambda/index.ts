require('isomorphic-fetch');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');

// クエリ
const query = gql(`mutation CreateData($value: Float!, $datetime: AWSDateTime!){
  createData(value: $value, datetime: $datetime){
    id
    value
    datetime
  }
}`);

exports.handler = async (event: any) => {
  
  // event = {
  //   "value": 23.5,
  //   "datetime": 1578879458040
  // }
  console.log(JSON.stringify(event));

  const url = process.env.END_POINT;
  const region = process.env.REGION;
  const apiKey = process.env.API_KEY;
  const authType = 'API_KEY';

  const client = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
      type: authType,
      apiKey: apiKey
    },
    disableOffline: true,
    fetchPolicy: 'network-only'
  });

  if(event.value && event.datetime){
    const dt = new Date(event.datetime);
    const params =  {
      "datetime": dt.toISOString(), // AWSDateTimeへの変換 2011-10-05T14:48:00.000Z
      "value": parseFloat(event.value) // Floatへの変換
    }
    try {
      await client.mutate({
        variables: params,
        mutation: query
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
}

