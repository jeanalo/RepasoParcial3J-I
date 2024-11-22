import { appState } from "../../store";
import { DataShapeRecord } from "../../types/record";

class RECORDSECTION extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			const records: DataShapeRecord[] = appState.recordlist || [];
			this.shadowRoot.innerHTML = `
				<section id="records">
					${records
						.map(
							(record) => `
								<my-record
									uid="${record.id}"
									image="${record.image}"
									artist="${record.artist}"
									name="${record.name}"
									price="${record.price}"
									stock="${record.stock}"
								></my-record>
							`
						)
						.join('')}
				</section>
			`;
		}
	}
}

customElements.define('my-recordsection', RECORDSECTION);
export default RECORDSECTION;
