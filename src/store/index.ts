import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as reducers from './reducers';
import * as actionCreators from './actions';
import { TServices, TState } from "../types/store";
import { withExtraArgument } from "redux-thunk";
import type { Router } from "@remix-run/router";
import { authService } from '../api/auth';
import { advertsService } from '../api/adverts';

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

const services: TServices = { authService, advertsService };

export default function configureStore(preloadedState: TState, { router }: { router: Router }) {
	const store = createStore(
		reducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				withExtraArgument({ services, router }),
			)
		)
	);
	return store;
}
