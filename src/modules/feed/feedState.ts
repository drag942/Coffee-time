import {LoadState} from "../../common/loadState";
import {Post} from "../../core/api/generated/dto/Post.g";

export interface IFeedState {
    posts: Post[];
    loadState: LoadState;
    error: string | null;
}

export const FeedInitialState: IFeedState = {
    posts: [],
    loadState: LoadState.needLoad,
    error: null,
};