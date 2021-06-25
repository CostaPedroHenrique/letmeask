import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthrProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AdminRoom } from './pages/AdminRoom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';



function App() {
  
  return (
    <ThemeContextProvider>
    <AuthrProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' exact component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />

          <Route path='/admin/rooms/:id' component={AdminRoom} />
        </Switch>
      </BrowserRouter>
    </AuthrProvider>
    </ThemeContextProvider>
  );
}

export default App;
