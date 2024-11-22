import { appState } from "../../store";
import { DataShapeRecord } from "../../types/record";

class RECORDMODIFYSECTION extends HTMLElement {
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
                <my-recordmodify
                  uid="${record.id}"
                  image="${record.image || ''}"
                  name="${record.name || ''}"
                  artist="${record.artist || ''}"
                  price="${record.price || 0}"
                  stock="${record.stock || 0}"
                ></my-recordmodify>
              `
            )
            .join('')}
        </section>
      `;
    }
  }
}

customElements.define('my-recordmodifysection', RECORDMODIFYSECTION);
export default RECORDMODIFYSECTION;
