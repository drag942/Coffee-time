import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";

import {showToast} from "../../common/showToast";

import {FeedActions} from "./feedActions";
import {requestsRepository} from "../../core/api/requestsRepository";

export class FeedAsyncActions {
    static getPosts(): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IEmpty = {
            };

            try {
                dispatch(FeedActions.getPosts.started(params));
                const result = await requestsRepository.mobilePostApiRequest.getPosts();
                dispatch(FeedActions.getPosts.done({params, result}));
            } catch (error) {
                showToast(error.message);
                dispatch(FeedActions.getPosts.failed({params, error}));
            }
        };
    }
}