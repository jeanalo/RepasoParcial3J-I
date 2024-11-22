import { addObserver, dispatch } from '../../store/index';
import { navigate } from '../../store/actions';

class NAV extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		const home = this.shadowRoot?.querySelector('#home');
		home?.addEventListener('click', () => {
			dispatch(navigate('HOME'));
		});

		const add = this.shadowRoot?.querySelector('#add');
		add?.addEventListener('click', () => {
			dispatch(navigate('ADD'));
		});

		const edit = this.shadowRoot?.querySelector('#modify');
		edit?.addEventListener('click', () => {
			dispatch(navigate('MODIFY'));
		});
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <nav class="menu">
        <ul>
          <li><a id='home'>HOME</a></li>
          <li><a id="add">ADD</a></li>
          <li><a id="modify">MODIFY</a></li>
        </ul>
      </nav>
      `;
		}
	}
}

customElements.define('my-nav', NAV);
export default NAV;
