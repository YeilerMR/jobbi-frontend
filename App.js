import { UserProvider } from "./src/hooks/UserContext.js";
import RootStack from "./src/routes/RootStack.js";

export default function App() {
  return (
    <UserProvider>
      <RootStack/>
    </UserProvider>
  );
}
