import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import firebase from "../../services/firebase";

export default class RecordModify extends HTMLElement {
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

  connectedCallback() {
    this.render();

    const editButton = this.shadowRoot?.querySelector('#edit');
    editButton?.addEventListener('click', () => {
      dispatch({
        type: 'SET_SELECTED_RECORD',
        payload: {
          id: this.uid,
          image: this.image,
          name: this.name,
          artist: this.artist,
          price: this.price,
          stock: this.stock,
        },
      });
      dispatch(navigate('EDIT'));
    });

    const deleteButton = this.shadowRoot?.querySelector('#delete');
    deleteButton?.addEventListener('click', this.deleteRecord.bind(this));
  }

  async deleteRecord() {
    if (!this.uid) {
      alert('Error: No se puede eliminar un registro sin ID.');
      return;
    }

    try {
      // Eliminar el registro de Firebase
      await firebase.deleteRecord(this.uid);

      // Actualizar el estado global eliminando el registro
      dispatch({
        type: 'DELETE_RECORD',
        payload: this.uid,
      });

      alert('Registro eliminado exitosamente');
    } catch (error) {
      console.error('Error eliminando el registro:', error);
      alert('Error eliminando el registro.');
    }
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <section data-uid="${this.uid}">
        <img src='${this.image || ''}' alt="Album Cover">
        <h1>${this.name || 'Undefined Name'}</h1>
        <h2>${this.artist || 'Undefined Artist'}</h2>
        <h3>${this.price ? `$${this.price}` : 'N/A'}</h3>
        <h3>${this.stock ?? 'Out of Stock'}</h3>
        <button id='edit'>EDIT</button>
        <button id='delete'>DELETE</button>
      </section>
      `;
    }
  }
}

customElements.define('my-recordmodify', RecordModify);
