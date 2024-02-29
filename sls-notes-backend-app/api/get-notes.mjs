/**
 * Route: GET /notes
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.NOTES_TABLE;

export const handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const limit = query && query.limit ? parseInt(query.limit) : 5;
    const user_id = util.getUserId(event.headers);

    const params = {
      TableName: tableName,
      KeyConditionExpression: "user_id = :uid",
      ExpressionAttributeValues: {
        ":uid": user_id,
      },
      Limit: limit,
      ScanIndexForward: false,
    };

    const startTimestamp = query && query.start ? parseInt(query.start) : 0;

    if (startTimestamp > 0) {
      params.ExclusiveStartKey = {
        user_id: user_id,
        timestamp: startTimestamp,
      };
    }

    const queryCmd = new QueryCommand(params);
    const data = await ddbDocClient.send(queryCmd);
    console.log(`QueryCommand response: ${JSON.stringify(data, null, 2)}`);

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(`Error occured: ${err}`);

    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
