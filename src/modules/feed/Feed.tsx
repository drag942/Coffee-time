import React from "react";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {Post} from "../../core/api/generated/dto/Post.g";
import {LoadState} from "../../common/loadState";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {FeedAsyncActions} from "./feedAsyncActions";
import {ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors} from "../../core/theme";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {defaultIdExtractor} from "../../common/helpers";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {FeedPost} from "./components/FeedPost";

interface IStateProps {
    posts: Post[];
    loadState: LoadState;
    error: string | null;
}

interface IDispatchProps {
    getPosts: () => void;
}

@connectAdv(
    ({feed}: IAppState): IStateProps => ({
        posts: feed.posts,
        loadState: feed.loadState,
        error: feed.error
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        getPosts: (): void => {
            dispatch(FeedAsyncActions.getPosts());
        }
    })
)
export class Feed extends BaseReduxComponent<IStateProps, IDispatchProps> {
    componentDidMount(): void {
        this.dispatchProps.getPosts();
    }

    render(): JSX.Element {
        const {posts, error, loadState} = this.stateProps;
        const {getPosts} = this.dispatchProps;

        return(
            <FlatListWrapper
                style={styles.container}
                data={posts}
                loadState={loadState}
                keyExtractor={defaultIdExtractor}
                errorText={error}
                EmptyComponent={this.renderEmptyComponent}
                renderItem={this.renderPost}
                tryAgain={getPosts}
                onRefresh={getPosts}
                loadMore={getPosts}
            />
        );
    }

    private renderPost = ({item}: {item: Post}): JSX.Element => <FeedPost id={item.id} title={item.body} body={item.body}/>;

    private renderEmptyComponent = (): JSX.Element => <EmptyComponent title={"Список пуст"}/>;
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    } as ViewStyle,
});