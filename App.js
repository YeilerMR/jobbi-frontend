import { UserProvider } from './src/hooks/UserContext.js';
import { ServiceProvider } from './src/hooks/ServiceContext.js';
import RootStack from './src/routes/RootStack.js';

export default function App() {
  return (
    <ServiceProvider>
      <UserProvider>
        <RootStack />
      </UserProvider>
    </ServiceProvider>
  );
}
