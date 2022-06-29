import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/Medicine/Medicine';
import Patients from './container/Patients/Patients';

function App() {
  return (
      <Layout>
        <Switch>
          <Route path={'/Medicine'} exact component={Medicine} />
          <Route path={'/Patients'} exact component={Patients} />
        </Switch>
      </Layout>
  );
}

export default App;
