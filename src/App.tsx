import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./providers/Auth";
import { ThemeProvider } from "./providers/Theme";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
