import React from "react";
import {LoadState} from "../../common/loadState";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import { ImageStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Ref, styleSheetCreate} from "../../common/utils";
import {Colors, isIos, windowHeight, windowWidth} from "../../core/theme";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {defaultIdExtractor} from "../../common/helpers";
import {CafeInfo} from "../../core/api/CoffeeRequest";
import {MainPageAsyncActions} from "./mainPageAsyncActions";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {MainPageComponent} from "./components/MainPageComponent";
import {PlainHeader} from "../../common/components/Headers";
import {NavigationActions} from "../../navigation/navigation";
import {NavigationState, TabView} from "react-native-tab-view";
import {ImageResources} from "../../common/ImageResources.g";
import SwitchSelector from "react-native-switch-selector";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import Geolocation from "@react-native-community/geolocation";
import {PERMISSIONS, request} from "react-native-permissions";
import Carousel, {CarouselStatic} from "react-native-snap-carousel";
import {CarouselComponent} from "./components/CarouselComponent";

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

const options = [
    {value: 0, imageIcon: ImageResources.icon_list as string , label: ""},
    {value: 1, imageIcon: ImageResources.icon_map as string, label: ""},
];

let initialPosition: any;

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
            console.log(id);
        },
    })
)

export class MainPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(undefined, true);
    mapRef = new Ref<MapView>();
    carouselRef = new Ref<CarouselStatic<TouchableOpacity>>();
    componentDidMount(): void {
        this.dispatchProps.getCafes();
        this.requestLocationPermission();
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
    };

    private renderScene = ({route}: { route: IRoute }):
        JSX.Element | null => {
        switch (route.key) {
            case "list":
                return this.renderList();
            case "map":
                return this.renderMapComponent();
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
                style={styles.flatList}
           />
       );
    };

    private renderPost = ({item}: {item: CafeInfo}): JSX.Element => {
        return (
            <MainPageComponent
                id={item.id || ""}
                title={item.name}
                address={item.address}
                imageSource={item.images}
                onPress={this.dispatchProps.navigateToCafePage}
            />
        );

    };

    //TODO: Почему нельзя заранее сформировать маркеры и в принципе координаты?
    //TODO Координаты в API пришли в виде string, пришлось переводить их в объект для либы
    private renderMapComponent = (): JSX.Element => {
       const markers = this.stateProps.cafes.map(element => {
               const coordinate = {latitude: 0, longitude: 0};
               coordinate.latitude = parseFloat(element.coordinates.split(",")[0]);
               coordinate.longitude = parseFloat(element.coordinates.split(",")[1]);
               const index = this.stateProps.cafes.indexOf(element);

               return (
                       <Marker
                           key={element.coordinates}
                           coordinate={{longitude: coordinate.longitude, latitude: coordinate.latitude}}
                           onPress={(): void => this.onMarkerPress(index)}
                       />
                   );
           }
       );

        return (
            <View style={styles.map}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={initialPosition}
                    showsUserLocation={true}
                    ref={this.mapRef.handler}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                >
                    {markers}
                </MapView>
                <Carousel
                    data={this.stateProps.cafes}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={windowWidth}
                    itemWidth={225}
                    itemHeight={250}
                    containerCustomStyle={styles.carousel}
                    onSnapToItem={this.onCarouselItemChange}
                    ref={this.carouselRef.handler}
                    removeClippedSubviews={false}
                />
            </View>
        );
      };

    private requestLocationPermission = async (): Promise<void> => {
        //TODO: Для этого должен быть создан отдельный файл который должен проверять налачие доступов
        const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        console.log("Android: " + response);
        if (response === "granted") {
            this.locateCurrentPosition();
        }
    };

    private locateCurrentPosition = (): void => {
        Geolocation.getCurrentPosition(position => {
            console.log(position);

            initialPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0113,
                longitudeDelta: 0.0114,
            };
        });
    };

    private renderEmptyComponent = (): JSX.Element => (
        <EmptyComponent
            image={ImageResources.image_no_coffe}
            title={"Здесь пока ничего нет"}
        />
    );

    private renderCarouselItem = ({item}: {item: CafeInfo}): JSX.Element => (
        <CarouselComponent
            id={item.id || ""}
            title={item.name}
            address={item.address}
            imageSource={item.images}
            onPress={this.dispatchProps.navigateToCafePage}
        />
    );

    private renderCheckBox = (): JSX.Element => {
        return (
            <SwitchSelector
                style={styles.switchView}
                options={options}
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
    };

    private onCarouselItemChange = (index: number): void => {
        const location = this.stateProps.cafes[index];
        const latitude = parseFloat(location.coordinates.split(",")[0]);
        const longitude = parseFloat(location.coordinates.split(",")[1]);
        this.mapRef.ref.animateToRegion(
            {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
            });
    };

    private onMarkerPress = (index: number): void => {
        if (this.carouselRef.hasRef) {
            this.carouselRef.ref.snapToItem(index);
        }
    };
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
    map: {
        height: windowHeight,
        width: windowWidth,
        position: "absolute",
    } as ViewStyle,
    carousel: {
        position: "absolute",
        bottom: 0,
        marginBottom: 120,
    }as ViewStyle,
    imageCarousel: {
        width: windowWidth - 50,
        height: 150,
    }as ImageStyle,
    flatList: {
        opacity: 0,
    }as ViewStyle
});
