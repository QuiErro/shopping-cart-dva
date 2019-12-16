import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Layouts from './layouts';
import IndexPage from './routes/IndexPage';
import Products from './routes/products';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
	  <Layouts location={history.location}>
		<Switch>
          <Route path="/" exact component={IndexPage} />
		  <Route path="/products" exact component={Products} />
        </Switch>
	  </Layouts>
    </Router>
  );
}

export default RouterConfig;
