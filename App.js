import React from "react";
import RootStack from "./routes/RootStack.js";

import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';

export default function App() {
  return (
    <RootStack/>
  );
}
