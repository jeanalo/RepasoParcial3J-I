import { initializeApp } from 'firebase/app';
import { getFirestore, updateDoc, doc, deleteDoc, collection, addDoc, getDocs } from 'firebase/firestore'; // Importar deleteDoc
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { DataShapeRecord } from '../types/record';

const firebaseConfig = {
	apiKey: "AIzaSyBIL2rfXnAg34IUexksMM5y-gITLbD3LtM",
	authDomain: "parcial3-ed5d5.firebaseapp.com",
	projectId: "parcial3-ed5d5",
	storageBucket: "parcial3-ed5d5.appspot.com",
	messagingSenderId: "690934854283",
	appId: "1:690934854283:web:9a1bef3eb7f401c5145a8e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addRecord = async (record: Omit<DataShapeRecord, 'id'>) => {
	try {
		const ref = collection(db, 'records');
		await addDoc(ref, record);
		console.log('Record added successfully');
	} catch (error) {
		console.error('Error adding record:', error);
		alert('Error adding record');
	}
};

export const getRecord = async () => {
	try {
		const snapshot = await getDocs(collection(db, 'records'));
		const records: DataShapeRecord[] = [];
		snapshot.forEach((doc) => {
			const data = doc.data() as Omit<DataShapeRecord, 'id'>;
			records.push({ id: doc.id, ...data });
		});
		return records;
	} catch (error) {
		console.error('Error fetching records:', error);
		alert('Error fetching records');
		return [];
	}
};

export const updateRecord = async (recordId: string, data: Partial<DataShapeRecord>) => {
	try {
		const ref = doc(db, 'records', recordId);
		await updateDoc(ref, data);
		alert('Record updated successfully');
	} catch (error) {
		console.error('Error updating record:', error);
		alert('Error updating record');
	}
};

export const deleteRecord = async (recordId: string): Promise<void> => {
	try {
		const recordRef = doc(db, 'records', recordId); // Referencia al documento
		await deleteDoc(recordRef); // Eliminar el documento
		console.log('Registro eliminado exitosamente');
	} catch (error) {
		console.error('Error eliminando el registro:', error);
		throw new Error('Error eliminando el registro');
	}
};

export default { addRecord, getRecord, updateRecord, deleteRecord };
