import React from "react";
import {LoadState} from "../../common/loadState";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors, isIos, windowWidth} from "../../core/theme";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {defaultIdExtractor} from "../../common/helpers";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {CafeInfo} from "../../core/api/CoffeeRequest";
import {MainPageAsyncActions} from "./mainPageAsyncActions";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {MainPageComponent} from "./components/mainPageComponent";
import {PlainHeader} from "../../common/components/Headers";
import {NavigationActions} from "../../navigation/navigation";
import {NavigationState, TabView} from "react-native-tab-view";
import {ImageResources} from "../../common/ImageResources.g";
import SwitchSelector from "react-native-switch-selector";

interface IStateProps {
    cafes: CafeInfo[];
    loadState: LoadState;
    error: string | null;
}
interface IRoute {
    key: "list" | "map";
    title: string;
}

interface IState {
    tabs: NavigationState<IRoute>;
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

export class MainPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(undefined, true);
    componentDidMount(): void {
        this.dispatchProps.getCafes();
    }

    constructor(props: IEmpty) {
        super(props);

        this.state = {
            tabs: {
                index: 0,
                routes: [
                    { key: "list", title: "List" },
                    { key: "map", title: "Map" },
                ],
            }
        };
    }
    render(): JSX.Element {

        return(
            <View style={styles.container}>
                <TabView
                   renderScene={this.renderScene}
                   onIndexChange={this.handleIndexChange}
                   navigationState={this.state.tabs}
                   swipeEnabled={!isIos}
                   renderTabBar={this.renderCheckBox}
                />
            </View>
        );
    }
    private tryAgain = (): void => {
        this.dispatchProps.getCafes();
    };
    private handleIndexChange = (index: number): void => {
        this.setState({tabs: {...this.state.tabs, index}});
        console.log(this.state.tabs.index);
    };

    private renderScene = ({route}: { route: IRoute }):
        JSX.Element | null => {
        switch (route.key) {
            case "list":
                return this.renderList();
            case "map":
                return this.renderEmptyComponent();
            default:
                return null;
        }
    };
    private renderList = (): JSX.Element => {
       return (
           <FlatListWrapper
                data={this.stateProps.cafes}
                loadState={this.stateProps.loadState}
                keyExtractor={defaultIdExtractor}
                errorText={this.stateProps.error}
                EmptyComponent={this.renderEmptyComponent}
                renderItem={this.renderPost}
                tryAgain={this.tryAgain}
                onRefresh={this.tryAgain}
                loadMore={this.tryAgain}
           />
       );
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

    private renderEmptyComponent = (): JSX.Element => {
        return (
            <EmptyComponent title={"Список пуст"}/>
        );
    };
    private renderCheckBox = (): JSX.Element => {
        return (
            /*TODO: fix linter errors and cache this array*/
            <SwitchSelector
                style={styles.switchView}
                options={[
                    {value: 0, imageIcon: ImageResources.icon_list as string, label: "0"},
                    {value: 1, imageIcon: ImageResources.icon_map as string, label: "0"},
                ]}
                initial={this.state.tabs.index}
                value={this.state.tabs.index}
                hasPadding={true}
                textColor={Colors.warmGreyTwo}
                onPress={this.handleIndexChange}
                buttonColor={Colors.browny}
                borderColor={Colors.warmGreyTwo}
                selectedColor={Colors.white}
                disableValueChangeOnPress={true}
            />
        );
    }
}

const styles = styleSheetCreate({
    switchView: {
        width: windowWidth / 2,
        marginVertical: 5,
        marginHorizontal: windowWidth / 4
    }as ViewStyle,
    container: {
        flex: 1,
        backgroundColor: Colors.greyLight
    } as ViewStyle,
    component: {
        paddingTop: 15,
    } as ViewStyle,
});