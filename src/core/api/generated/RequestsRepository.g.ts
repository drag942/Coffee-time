import {AuthenticationApiRequest} from "./AuthenticationApiRequest.g";

export class RequestsRepository {
    authenticationApiRequest = new AuthenticationApiRequest(this.baseurl);

    constructor(private baseurl: string) {
    }
}