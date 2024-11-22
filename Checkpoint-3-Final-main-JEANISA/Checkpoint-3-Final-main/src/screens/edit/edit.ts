import { appState, dispatch } from '../../store';
import firebase from "../../services/firebase";
import { navigate } from "../../store/actions"; // Importa correctamente la acción navigate
import { DataShapeRecord } from '../../types/record';

export class EDIT extends HTMLElement {
  selectedRecord: DataShapeRecord | undefined = appState.selectedRecord;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  updateRecord() {
    if (!this.selectedRecord) {
      alert('No record selected for editing.');
      return;
    }

    // Obtener los valores de los inputs con conversión explícita de tipo
    const updatedRecord: Partial<DataShapeRecord> = {
      image: (this.shadowRoot?.querySelector('#image') as HTMLInputElement)?.value,
      name: (this.shadowRoot?.querySelector('#name') as HTMLInputElement)?.value,
      artist: (this.shadowRoot?.querySelector('#artist') as HTMLInputElement)?.value,
      price: Number((this.shadowRoot?.querySelector('#price') as HTMLInputElement)?.value),
      stock: Number((this.shadowRoot?.querySelector('#stock') as HTMLInputElement)?.value),
    };

    // Actualizar el registro en Firebase
    firebase.updateRecord(this.selectedRecord.id, updatedRecord)
      .then(() => {
        alert('Registro actualizado');
        // Actualizar el estado global con el registro modificado
        dispatch({
          type: 'UPDATE_RECORD_IN_LIST',
          payload: { ...this.selectedRecord, ...updatedRecord },
        });
        // Navegar de vuelta a la pantalla de MODIFY
        dispatch(navigate('MODIFY'));
      })
      .catch((error) => {
        console.error('Error updating record:', error);
        alert('Error actualizando el registro.');
      });
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <my-nav></my-nav>
        <h1>Edit Product</h1>
        <input id="image" placeholder="URL Image" value="${this.selectedRecord?.image || ''}">
        <input id="name" placeholder="Name of the album" value="${this.selectedRecord?.name || ''}">
        <input id="artist" placeholder="Artist" value="${this.selectedRecord?.artist || ''}">
        <input id="price" type="number" placeholder="Price" value="${this.selectedRecord?.price || 0}">
        <input id="stock" type="number" placeholder="Stock" value="${this.selectedRecord?.stock || 0}">
        <button id="save">Guardar</button>
      `;

      const saveButton = this.shadowRoot.querySelector('#save');
      saveButton?.addEventListener('click', this.updateRecord.bind(this));
    }
  }
}

customElements.define('app-edit', EDIT);
