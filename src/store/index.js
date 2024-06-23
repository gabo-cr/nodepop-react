import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { withExtraArgument } from "redux-thunk";

import * as reducers from './reducers';
import * as actionCreators from './actions';
import { failureRedirects } from "./middlewares";

import { authService } from '../api/auth';
import { advertsService } from '../api/adverts';
import { tagsService } from "../api/tags";


const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState, { router }) {
	const store = createStore(
		reducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				withExtraArgument({ services: { authService, advertsService, tagsService }, router }),
				failureRedirects(router, {
          401: '/login',
          404: '/404',
        }),
			)
		)
	);
	return store;
}
