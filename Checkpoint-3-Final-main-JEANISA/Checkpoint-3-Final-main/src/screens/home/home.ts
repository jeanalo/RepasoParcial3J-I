import { addObserver, dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import '../../components/export';

export class HOME extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML =  `<my-nav></my-nav>
        <h1>HOME</h1>
		<my-recordsection></my-recordsection> `;
	}
}

customElements.define('app-home', HOME);