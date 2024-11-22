import "./components/export"

import "./components/export"
import { ADD } from "./screens/add/add";
import { EDIT } from "./screens/edit/edit";
import { HOME } from "./screens/home/home";
import './screens/home/home'
import './screens/add/add'
import './screens/edit/edit'
import './screens/modify/modify'
import { MODIFY } from "./screens/modify/modify";
import { addObserver,appState, dispatch } from "./store"; //importar observers y appState
import { GetRecords } from "./store/actions";

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
        addObserver(this)//le estoy diciendo que appContainer va a tener un observador el cual avisa cuando el appState cambia
    }

   async connectedCallback() {
        this.render()
		const action = await GetRecords();
		dispatch(action);
		console.log('records',appState.recordlist)
    }

	render() {
        //logica para cambiar de screen en el render
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		switch (appState.screen) {
			case 'HOME':
				const home = this.ownerDocument.createElement('app-home') as HOME;
				this.shadowRoot?.appendChild(home);
				break;

			case 'ADD':
				const add = this.ownerDocument.createElement('app-add') as ADD;
				this.shadowRoot?.appendChild(add);
				break;

                case 'MODIFY':
				const modify = this.ownerDocument.createElement('app-modify') as MODIFY;
				this.shadowRoot?.appendChild(modify);
				break;

                case 'EDIT':
				const edit = this.ownerDocument.createElement('app-edit') as EDIT;
				this.shadowRoot?.appendChild(edit);
				break;

			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);