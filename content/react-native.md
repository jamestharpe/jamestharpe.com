---
date: 2023-05-08T12:01:59-04:00
description: "An overview and guide to learning React Native: An open-source framework for building mobile applications using JavaScript and React"
tags: [ "react", "javascript" ]
title: "React Native"
---

# React Native (JavaScript Library)

**React Native** is a declarative, component-based [JavaScript](javascript.md) library based on [React](react.md) for building cross-platform mobile applications for iOS, Android, and other platforms from a shared code base. React Native uses native components instead of web components as building blocks, which enables the applications to have the look, feel, and performance of native mobile apps. React Native is a popular library for building mobile applications because it has a robust ecosystem and developer-friendly features, such as hot reloading. Projects using React Native can expect to share roughly 90% of the codebase across platforms, with only about 10% of code required to be platform specific.

Unlike other cross-platform frameworks, React Native does not use web views. React Native application code looks very similar to React; however, each component in a React Native application is a wrapper around a native component. Some components, such as `<View>` and `<Text>` components, work across iOS and Android while other components are OS specific. React includes a set of core components which include a basic set of cross-platform components that translate to the corresponding native iOS and Android components. Additional components can be installed from 3rd party packages, or developed locally.

React Native uses JavaScript for styling as well. Style names and values are similar to CSS, but are not CSS and use camelCase. Layouts are done with Flexbox and each component may have its own corresponding stylesheet. React Native also provides platform-specific styling to make adherence to style-guide conventions across platforms easier.

<!-- 

* Expo for emulation
* Jest for unit and snapshot testing
* Detox for end-to-end testing
* Push notifications: One Signal (free but not private, or paid), Firebase Cloud Messaging (free), AWS Amplify, Expo
* Fast Lane for streamlined app store deployments, beta build distribution
 -->

## Learning React Native

To get started learning React Native, it's helpful to have knowledge of [JavaScript](javascript.md) or [TypeScript](typescript.md). If you already know [React](react.md), are familiar with JSX, and/or have knowledge of mobile app development, learning React Native will be even easier.

Here's a set of learning resources that, together, provide a complete resource for learning React Native:

* [React Native: Getting Started](https://reactnative.dev/docs/getting-started) covers the basics of building an environment and writing a cross-platform application for iOS and Android.
* [React Native Core Components and APIs](https://reactnative.dev/docs/components-and-apis) covers the components and APIs included with React Native, in depth.
* [React Native Architecture](https://reactnative.dev/architecture/overview) provides details of React Native's internals
* [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/) covers test automation for React Native applications
* [React Native Crash Course](https://www.youtube.com/watch?v=NgDaPmxewcg) will walk you through a full, cross-platform mobile app build from start to finish
* [CodePush: Getting Started](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/) shows how to deploy app updates without always having to push new versions to the App Store and Play Store using CodePush.

## Popular React Native components and libraries

The [React Native Directory](https://reactnative.directory/) contains components and libraries that have been vetted by the [React Native Community](https://github.com/react-native-community) and is the best place to start when trying to find a component or library for use in a React Native application.

Some of the most popular components and libraries include:

* [`react-native-vision-camera`](https://github.com/react-native-camera/react-native-camera) provides access to the devices camera and allows photo, video, and snapshot capture.
* [`react-native-fingerprint-scanner`] supports authentication through the device's Touch ID and Face ID features
* [`react-native-video`](https://github.com/react-native-video/react-native-video) supports streaming video
* [`react-navigation`](https://github.com/react-navigation/react-navigation/tree/main/packages/native) provides routing and navigation

*

## React Native resources

* [React Native Official Website](https://reactnative.dev/)
