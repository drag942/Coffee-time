import {BaseRequest} from "../index";
import {Post} from "./dto/Post.g";

export class MobilePostsApiRequests extends BaseRequest {
    constructor(protected baseurl: string) {
        super();
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts(config?: Object): Promise<Post[]> {
        return this.fetch(
            "/posts",
            Object.assign({
                    method: "GET"
                    }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}