import { Configuration, FrontendApi } from "@ory/client";
import { config } from "../../utilities/config";

export class IdentityProvider{
  private identityProvider: FrontendApi;
  private identityProviderURL: string

    constructor() {
      this.identityProviderURL = config.identity.public_url!;
      this.identityProvider = new FrontendApi(
        new Configuration({
          basePath: this.identityProviderURL,
          baseOptions: { withCredentials: true },
        })
      );
    }
  
    helper(){
      return this.identityProvider
    }
}