package trucker.group;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.zoontek.rndevmenu.RNDevMenuPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNPermissionsPackage(),
            new GeolocationPackage(),
          new RNFetchBlobPackage(),
          new ReactNativeLocalizationPackage(),
          new RNDevMenuPackage(),
          new ReanimatedPackage(),
          new RNGestureHandlerPackage(),
          new AsyncStoragePackage(),
          new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    if (BuildConfig.DEBUG) {
        new TestConfigurationProvider().setTestIp(this);
    }

    SoLoader.init(this, /* native exopackage */ false);
  }
}
