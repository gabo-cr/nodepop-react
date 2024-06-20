import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { withExtraArgument } from "redux-thunk";
import type { Router } from "@remix-run/router";

import { TServices, TState } from "../types/store";

import * as reducers from './reducers';
import * as actionCreators from './actions';

import { authService } from '../api/auth';
import { advertsService } from '../api/adverts';
import { tagsService } from "../api/tags";


const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

const services: TServices = { authService, advertsService, tagsService };

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
