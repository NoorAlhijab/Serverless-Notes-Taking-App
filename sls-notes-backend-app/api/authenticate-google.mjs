/**
 * Route: GET /auth
 */

import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from "@aws-sdk/client-cognito-identity";
import { jwtDecode } from "jwt-decode";
import * as util from "./util.mjs";

const cognitoIdentityClient = new CognitoIdentityClient({
  region: "us-east-1",
});

const identityPoolId = process.env.COGNITO_IDENTITY_POOL_ID;

export const handler = async (event) => {
  try {
    const idToken = util.getIdToken(event.headers);

    const getIdCmdParams = {
      IdentityPoolId: identityPoolId,
      Logins: {
        "accounts.google.com": idToken,
      },
    };

    const getIdCmd = new GetIdCommand(getIdCmdParams);
    const getIdCmdResponse = await cognitoIdentityClient.send(getIdCmd);
    console.log(
      `GetIdCommand response: ${JSON.stringify(getIdCmdResponse, null, 2)}`
    );

    const getCredentialsForIdentityCmdParams = {
      IdentityId: getIdCmdResponse.IdentityId,
      Logins: {
        "accounts.google.com": idToken,
      },
    };

    const getCredentialsForIdentityCmd = new GetCredentialsForIdentityCommand(
      getCredentialsForIdentityCmdParams
    );
    const getCredentialsForIdentityCmdResponse =
      await cognitoIdentityClient.send(getCredentialsForIdentityCmd);
    console.log(
      `GetCredentialsForIdentityCommand response: ${JSON.stringify(
        getCredentialsForIdentityCmdResponse, 
        null,
        2
      )}`
    );

    const decodedIdToken = jwtDecode(idToken);
    getCredentialsForIdentityCmdResponse.user_name = decodedIdToken.name;

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(getCredentialsForIdentityCmdResponse),
    };
  } catch (error) {
    console.log(`Error occured: ${error}`);

    return {
      statusCode: error.statusCode ? error.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: error.name ? error.name : "Exception",
        message: error.message ? error.message : "Unknown error",
      }),
    };
  }
};
