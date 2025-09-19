
# Jobbi Frontend

This project is a mobile application built with React Native and Expo.

## Prerequisites

- Node.js (recommended v18 or higher)
- npm (v9 or higher)
- Expo CLI

## Installing dependencies

1. Clone the repository or download the source code.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

## Install Expo CLI (if you don't have it)

```bash
npm install -g expo-cli
```

## Running the project

1. Start the development server:

```bash
npm start
```

2. Scan the QR code with the Expo Go app on your mobile device, or run on an Android/iOS emulator.

## Main structure

- `App.js`: App entry point.
- `screens/`: Main views (Login, Signup, Welcome).
- `components/`: Reusable components and styles.
- `assets/img/`: Images and resources.

## Notes

- If you have issues with the keyboard on Android/iOS, check the `KeyboardAvoiding` component.
- To add new screens, create files in the `screens/` folder and add them to navigation.

## Contact

For questions or support, contact the project developer.

## Images
To add new images upload them in ```.webp``` format. To do this, use this online tool: https://squoosh.app/

## API_URL
To obtain the IP of your computer you must follow the following steps:
### Windows
```bash
ipconfig
```
### Mac/Linux
```bash
ifconfig
```
> [Note] Look for something like 192.168.x.x or 10.0.x.x.

If you use an android emulator
```bash
http://10.0.2.2:3000
```