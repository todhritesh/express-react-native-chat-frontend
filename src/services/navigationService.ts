import {NavigationActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

function navigate(routeName, params) {
	setTimeout(()=>{
		_navigator.navigate(routeName,params);
	},1200)
}

function goBack() {
	setTimeout(()=>{
		_navigator.dispatch(NavigationActions.back());
	},1200)
}


export default {
	navigate,
	setTopLevelNavigator,
	goBack,
};