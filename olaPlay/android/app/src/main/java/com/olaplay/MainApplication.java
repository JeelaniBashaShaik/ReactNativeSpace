package com.olaplay;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactlibrary.RNReactNativeGetMusicFilesPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import com.RNFetchBlob.RNFetchBlobPackage;  


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
            new RNReactNativeGetMusicFilesPackage(),
            new RNSoundPackage(),
        
            new MapsPackage(),
      
          
            new RNFSPackage(),
            new VectorIconsPackage(),
            new RNFetchBlobPackage()


            
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
    
  }
}
