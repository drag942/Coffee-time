import {actionCreator} from "../../core/store";
import {Post} from "../../core/api/generated/dto/Post.g";

export class FeedActions {
    static getPosts = actionCreator.async<IEmpty, Post[], Error>("FEED/GET_POSTS");
}