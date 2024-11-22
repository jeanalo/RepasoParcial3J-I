import Firebase from './firebase';

export async function getDataRecord() {
	try {
		const movies = await Firebase.getRecord();
		console.log(movies);
		return movies;
	} catch (error) {
		console.error(error);
	}
}