export enum AttributeRecord {
	uid = 'uid',
	image = 'image',
	name = 'name',
	artist = 'artist',
	price = 'price',
	stock = 'stock',
}

class Record extends HTMLElement {
	uid?: string;
	image?: string;
	name?: string;
	artist?: string;
	price?: number;
	stock?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return Object.values(AttributeRecord);
	}

	attributeChangedCallback(propname: AttributeRecord, oldValue: string | undefined, newValue: string | undefined) {
		if (propname === AttributeRecord.price || propname === AttributeRecord.stock) {
			this[propname] = newValue ? Number(newValue) : undefined;
		} else {
			this[propname] = newValue;
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <section data-uid="${this.uid}">
      <img src='${this.image}' alt="Album Cover">
      <h1>${this.name}</h1>
      <h2>${this.artist}</h2>
      <h3>${this.price ? `$${this.price}` : 'N/A'}</h3>
      <h3>${this.stock ?? 'Out of Stock'}</h3>
      </section>
      `;
		}
	}
}

customElements.define('my-record', Record);
export default Record;
