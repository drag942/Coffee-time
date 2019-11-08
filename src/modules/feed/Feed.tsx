import React from "react";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {Post} from "../../core/api/generated/dto/Post.g";
import {LoadState} from "../../common/loadState";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {FeedAsyncActions} from "./feedAsyncActions";
import {View, ViewStyle} from "react-native";
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
@connectAdv(({feed}: IAppState): IStateProps => ({
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

        return(
            <View style={styles.container}>
                <FlatListWrapper
                    data={posts}
                    loadState={loadState}
                    keyExtractor={defaultIdExtractor}
                    errorText={error}
                    EmptyComponent={this.renderEmptyComponent}
                    renderItem={this.renderPost}
                    tryAgain={this.tryAgain}
                    onRefresh={this.tryAgain}
                    loadMore={this.tryAgain}
                />
            </View>
        );
    }
    private tryAgain = (): void => {
       this.dispatchProps.getPosts();
    };

    private renderPost = ({item, index}: {item: Post}): JSX.Element => {
        return (
            <FeedPost id={item.id} title={item.body} body={item.body}/>
        );

    };

    private renderEmptyComponent = (): JSX.Element => {
        return (
          <EmptyComponent title={"Список пуст"}/>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    } as ViewStyle,
});