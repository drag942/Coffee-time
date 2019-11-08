import {reducerWithInitialState} from "typescript-fsa-reducers";

import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {IAuth2Params} from "../../types/interfaces";
import {FeedActions} from "./feedActions";
import {FeedInitialState, IFeedState} from "./feedState";
import {LoadState} from "../../common/loadState";
import {Post} from "../../core/api/generated/dto/Post.g";

function getPostsStartedHandler(state: IFeedState): IFeedState {
    return newState(state, {loadState: LoadState.firstLoad, error: null});
}

function getPostsDoneHandler(state: IFeedState, {result}: Success<IEmpty, Post[]>): IFeedState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: null, posts: result});
}

function getPostsFailedHandler(state: IFeedState, failed: Failure<IAuth2Params, Error>): IFeedState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const feedReducer = reducerWithInitialState(FeedInitialState)
    .case(FeedActions.getPosts.started, getPostsStartedHandler)
    .case(FeedActions.getPosts.done, getPostsDoneHandler)
    .case(FeedActions.getPosts.failed, getPostsFailedHandler)
;