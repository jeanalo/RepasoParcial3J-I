import { addObserver, dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import '../../components/export';

export class MODIFY extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `<my-nav></my-nav>
        <h1>MODIFY</h1>
		<my-recordmodifysection></my-recordmodifysection>`;
	}
}

customElements.define('app-modify', MODIFY);