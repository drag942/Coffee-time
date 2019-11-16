import React from "react";
import {LoadState} from "../../common/loadState";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors} from "../../core/theme";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {defaultIdExtractor} from "../../common/helpers";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {CafeInfo} from "../../core/api/CoffeeRequest";
import {MainPageAsyncActions} from "./mainPageAsyncActions";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {MainPageComponent} from "./components/mainPageComponent";
import {PlainHeader} from "../../common/components/Headers";
import {NavigationActions} from "../../navigation/navigation";

interface IStateProps {
    cafes: CafeInfo[];
    loadState: LoadState;
    error: string | null;
}

interface IDispatchProps {
    getCafes: () => void;
    navigateToCafePage: (id: string) => void;
}
@connectAdv(({mainPage}: IAppState): IStateProps => ({
        cafes: mainPage.cafes,
        loadState: mainPage.loadState,
        error: mainPage.error
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        getCafes: (): void => {
            dispatch(MainPageAsyncActions.getCafes());
        },
        navigateToCafePage: (id: string): void => {
            dispatch(NavigationActions.navigateToCafePage({id}));
        }
    })
)

export class MainPage extends BaseReduxComponent<IStateProps, IDispatchProps> {
    static navigationOptions = PlainHeader(undefined, true);
    componentDidMount(): void {
        this.dispatchProps.getCafes();
    }
    render(): JSX.Element {
        const {cafes, error, loadState} = this.stateProps;

        return(
            <View style={styles.container}>
                <FlatListWrapper
                    data={cafes}
                    loadState={loadState}
                    keyExtractor={defaultIdExtractor}
                    errorText={error}
                    EmptyComponent={this.renderEmptyComponent}
                    renderItem={this.renderPost}
                    tryAgain={this.tryAgain}
                    onRefresh={this.tryAgain}
                    loadMore={this.tryAgain}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
    private tryAgain = (): void => {
        this.dispatchProps.getCafes();
    };

    private renderPost = ({item}: {item: CafeInfo}): JSX.Element => {
        return (
            <MainPageComponent
                id={item.id}
                title={item.name}
                address={item.address}
                imageSource={item.images}
                onPress={this.dispatchProps.navigateToCafePage}
            />
        );

    };

    private renderSeparator = (): JSX.Element => {
        return (
            <View style={{height: 10}}/>
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
    component: {
        paddingTop: 15,
    } as ViewStyle,
});