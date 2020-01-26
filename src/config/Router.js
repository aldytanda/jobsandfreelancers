import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Error from '../screens/Error';
import Freelancers from '../screens/Freelancers';
import FreelancerDetail from '../screens/FreelancerDetail';
import Jobs from '../screens/Jobs';
import JobDetail from '../screens/JobDetail';

function Router() {
	return (
		<Switch>
			<Route path="/" exact><Redirect to="/jobs"></Redirect></Route>
			<Route path="/jobs" component={Jobs} exact></Route>
			<Route path="/freelancers" component={Freelancers} exact></Route>
			<Route path="/job/details" component={JobDetail} exact></Route>
			<Route path="/freelancer/details" component={FreelancerDetail} exact></Route>
			<Route component={Error}></Route>
		</Switch>
	)
}

export default Router;