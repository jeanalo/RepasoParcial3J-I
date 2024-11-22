import { addObserver, dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { DataShapeRecord } from '../../types/record';
import firebase from '../../services/firebase';
import '../../components/export';

const formData: Omit<DataShapeRecord, 'id'> = {
    image:'',
    name: '',
    artist:'',
    price: 0,
    stock:0,
};

export class ADD extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		
	}

	submitForm() {
		console.log(formData);
		firebase.addRecord(formData);
	}

	changeImage(e: any) {
		formData.image = e?.target?.value;
	}
	changeName(e: any) {
		formData.name = e?.target?.value;
	}
	changeArtist(e: any) {
		formData.artist = e?.target?.value;
	}


	changePrice(e: any) {
		formData.price = Number(e?.target?.value);
	}
	changeStock(e: any) {
		formData.stock = e?.target?.value;
	}


	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `<my-nav></my-nav>
        <h1>ADD</h1>`;

		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Add New Product';
		this.shadowRoot?.appendChild(title);

		const pImage = this.ownerDocument.createElement('input');
		pImage.placeholder = 'url image';
		pImage.addEventListener('change', this.changeImage);
		this.shadowRoot?.appendChild(pImage);

		const pName = this.ownerDocument.createElement('input');
		pName.placeholder = 'name of the album';
		pName.addEventListener('change', this.changeName);
		this.shadowRoot?.appendChild(pName);

		const pArtist = this.ownerDocument.createElement('input');
		pArtist.placeholder = 'artist';
		pArtist.addEventListener('change', this.changeArtist);
		this.shadowRoot?.appendChild(pArtist);

		const pPrice = this.ownerDocument.createElement('input');
		pPrice.placeholder = 'price';
		// pPrice.type = "number";
		pPrice.addEventListener('change', this.changePrice);
		this.shadowRoot?.appendChild(pPrice);

		const pStock = this.ownerDocument.createElement('input');
		pStock.placeholder = 'stock';
		// pPrice.type = "number";
		pStock.addEventListener('change', this.changeStock);
		this.shadowRoot?.appendChild(pStock);

		const save = this.ownerDocument.createElement('button');
		save.innerText = 'Guardar';
		save.addEventListener('click', this.submitForm);
		this.shadowRoot?.appendChild(save);

	}
}

customElements.define('app-add', ADD);