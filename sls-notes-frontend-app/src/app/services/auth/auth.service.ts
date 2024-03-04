import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

declare const google: any;

declare const API_ROOT: string;
declare const STAGE: string;

@Injectable()
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) {
    google.accounts.id.initialize({
      client_id: "371537520803-oddm5bfakncren0uvdpo4foavt9v5sc0.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
    });
  }

  async handleCredentialResponse(response) {
    console.log(
      `handleCredentialResponse(): response: ${JSON.stringify(
        response,
        null,
        2
      )}`
    );

    await this.setCredentials(response.credential);

    this.router.navigate([""]).then(() => {
      window.location.reload();
    });
  }

  /**
   *
   * @param id_token
   *
   * Set IDP id_token and aws credentials here
   */
  async setCredentials(id_token) {
    try {
      const options = {
        headers: {
          Authorization: id_token,
        },
      };

      const endpoint = API_ROOT + STAGE + "/auth";

      const credentials = await this.httpClient
        .get(endpoint, options)
        .toPromise();

      localStorage.setItem("id_token", id_token);
      localStorage.setItem("aws", JSON.stringify(credentials));
      return;
    } catch (err) {
      localStorage.removeItem("id_token");
      localStorage.removeItem("aws");
      throw err;
    }
  }

  getCredentials() {
    return localStorage.getItem("aws");
  }

  getIdToken() {
    return localStorage.getItem("id_token");
  }

  /**
   * In addition to AWS credentials expiring after a given amount of time,
   * the login token from the identity provider will also expire.
   * Once this token expires, it will not be usable to refresh AWS credentials,
   * and another token will be needed. The SDK does not manage refreshing of the token value
   */
  async isLoggedIn() {
    let id_token = this.getIdToken();

    if (id_token) {
      let endpoint =
        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token;
      try {
        return await this.httpClient.get(endpoint).toPromise();
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("No token found");
    }
  }

  async login() {
    google.accounts.id.prompt();

    /* let googleAuth = await gapi.auth2.getAuthInstance();
    let googleUser = await googleAuth.signIn({ scope: "profile email" });
    let id_token = googleUser.getAuthResponse().id_token;
    await this.setCredentials(id_token);

    this.router.navigate([""]).then(() => {
      window.location.reload();
    }); */
  }

  async logout() {
    google.accounts.id.disableAutoSelect();

    localStorage.removeItem("id_token");
    localStorage.removeItem("aws");
    this.router.navigate(["login"]);

    /* var googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();

    localStorage.removeItem("id_token");
    localStorage.removeItem("aws");
    this.router.navigate(["login"]); */
  }
}
