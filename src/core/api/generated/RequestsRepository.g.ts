import {AuthenticationApiRequest} from "./AuthenticationApiRequest.g";
import {ProfileApiRequest} from "./ProfileApiRequest.g";
import {RunsApiRequest} from "./RunsApiRequest.g";
import {MobilePostsApiRequests} from "./MobilePostsApiRequests";

export class RequestsRepository {
    authenticationApiRequest = new AuthenticationApiRequest(this.baseurl);
    mobilePostApiRequest = new MobilePostsApiRequests(this.baseurl);
    profileApiRequest = new ProfileApiRequest(this.baseurl);
    runsApiRequest = new RunsApiRequest(this.baseurl);

    constructor(private baseurl: string) {
    }
}