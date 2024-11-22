// tambien llamado store

import { reducer } from './reducer';

export let emptyState = {
  //aqui van todas las variables que quiero que esten de forma global
	//aqui pone como inicia, puede iniciar vacio incluso
  screen: 'HOME',
  recordlist: [],
  selectedRecord: undefined
};

export let appState = emptyState;
//De aquí hacia abajo no se lo aprendan de memoria, siempre va a estar ahí el archivo, esto es configuración
let observers: any = [];

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	appState = reducer(action, clone);
	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};