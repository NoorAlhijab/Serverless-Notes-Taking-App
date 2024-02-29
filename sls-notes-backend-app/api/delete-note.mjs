/**
 * Route: DELETE /note/t/{timestamp}
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.NOTES_TABLE;

export const handler = async (event) => {
  try {
    const timestamp = parseInt(event.pathParameters.timestamp);
    const params = {
      TableName: tableName,
      Key: {
        user_id: util.getUserId(event.headers),
        timestamp: timestamp,
      },
    };

    const deleteCmd = new DeleteCommand(params);
    const response = await ddbDocClient.send(deleteCmd);
    console.log(`DeleteCommand response: ${(response, null, 2)}`);

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
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
