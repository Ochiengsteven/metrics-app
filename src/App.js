import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <>
      <h1>Crypto Tracker</h1>
      <Home />
    </>
    // <Router>
    //   <Switch>
    //     <Route path="/" exact component={Home} />
    //     {/* <Route path="/crypto/:cryptoId" component={CryptoDetails} /> */}
    //   </Switch>
    // </Router>
  );
}

export default App;
