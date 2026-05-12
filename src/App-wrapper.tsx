import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
