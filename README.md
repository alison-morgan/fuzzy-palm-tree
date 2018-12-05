### Getting Started

#### 1) Clone & Install Dependencies

- 1.1) `git clone https://github.com/alison-morgan/fuzzy-palm-tree`
- 1.2) `cd fuzzy-palm-tree` - cd into your newly created project directory.
- 1.3) Install NPM packages with your package manager of choice - i.e run `yarn install`.
- 1.4) `cd functions` run `yarn install`

#### 2) Rename Project

**You will need to be running Node verison 7.6 or greater for the rename functionality to work**

- 2.0) `npm run rename` - you'll be prompted to enter a project name and company name
- 2.1) Note down the package name value - you'll need this when setting up your Firebase project

#### 3) Add `Google Services` files (JSON)

- 3.0) Follow the `manually add firebase` to your app instructions [here](https://firebase.google.com/docs/android/setup#manually_add_firebase) to generate your `google-services.json` file if you haven't done so already - use the package name generated previously as your `Android package name`.
- 3.1) Place this file in the `android/app/` directory of your project.
  
#### 4) Activate developer mode on your Android device
(If you using simulator or already set it up before proceed to step 5)
- 4.0) Go to `Settings`
- 4.1) Search for Build number
- 4.2) Tap on Build number 7 times to enable developer options (After you pressed on it 3 times, you will see message with countdown)
- 4.3) After you get confirmation message that developer mode is on go back to main settings menu
- 4.4) Search for Developer options, navigate there
- 4.5) Enable USB debugging

#### 5) Start your app
- 5.0) Start the react native packager, run `yarn run start` from the root of your project.
- 5.1) If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `yarn run android` from the root of your project.

If all has gone well you'll see an one of two screens.
https://photos.app.goo.gl/wiHdWYjmKxhdK35o9
https://photos.app.goo.gl/du6PGV3sjTosN3LS9


### In case if app didn't start and you got an error

`BUILD FAILED in 0s
Could not install the app on the device, read the error above for details.
Make sure you have an Android emulator running or a device connected and have
set up your Android development environment:
https://facebook.github.io/react-native/docs/getting-started.html`
 
- Create local.properties file in the root of your android folder and add line of code
 `sdk.dir = /Users/USERNAME/Library/Android/sdk`,Where USERNAME is your OSX username

### If you getting error and after re-building your app it's still there follow steps:
 - 1.0) Delete app from your phone
 - 1.1) Kill you server by pressing `CTRL + C`
 - 1.2) In the root of your project run `yarn clean`(it will clean your watcham, metro and yarn caches and also delete you build folder inside `android/app`)
 - 1.3) Run `yarn run start -- --reset-cache` to start your server and reset cahce for metroBundler,just in case.
 - 1.4) Run `yarn run android` to build your app on android.

### Debugging remotely and other extras
- To debug you app remotely run `adb shell input keyevent 82`
- You can also enable Hot/Live reload by running the same command and selecting preferable option on your phone
- After you select all options that you need to work with run `yarn run android`
- To view console.logs another way you can run `yarn react-native log-android`
- In case if app doesn't want to install on your phone, you can check if devices connected by running `adb devices`
- If you see your device id after running `adb devices`, but still having troubles try running `adb kill-server` and then `adb start-server`
- You can also try to run `adb reverse tcp:8081 tcp:8081`
- Make sure that you installed latest version of Android SDK Build Tools(you can do it through your [`Android Studio`](https://developer.android.com/studio/releases/))

To start our project we used [`react-native-firebase`](https://github.com/invertase/react-native-firebase) boilerplate.