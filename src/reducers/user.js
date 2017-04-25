'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	isLoggedIn: false,
	user: {},
	status: null,
};

export default function user(state = initialState, action){

	switch(action.type){
		case TYPES.LOGGED_DOING:
			console.log('2222');
			return {
				...state,
				status: 'doing'
			};

		case TYPES.LOGGED_IN:
		console.log('4444');
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			}

		default: 
			return state;
	}

}