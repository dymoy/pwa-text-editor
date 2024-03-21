import { openDB } from 'idb';

/**
 * @function initdb
 * Create a new database named 'jate' which will be using version 1 of the database 
 */
const initdb = async () => {
  	openDB('jate', 1, {
		// Add our database schema if it has not already been initialized 
    	upgrade(db) {
			if (db.objectStoreNames.contains('jate')) {
				console.log('jate database already exists');
				return;
			}
			// Create a new object store for the data and give it a key name of 'id', which needs to increment automatically
			db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
			console.log('jate database created');
    	},
  	});
}

/**
 * @function putDb
 * Async function that updates the database with the requested content
 * @param {*} content - content to save to the database
 */
export const putDb = async (content) => {
	console.log('PUT to the database');

	// Create the connection to the database 
	const jateDb = await openDB('jate', 1); 

	// Define readwrite privileges for the transaction and access the desired IDBObjectStore
	const tx = jateDb.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');

	// Use .put() method to update the content in IDBObjectStore and await the promise to be fulfilled
	const request = store.put({id: 1, value: content});
	const result = await request;

	console.log('Data was successfully written to the database', result);
}

/**
 * @function getDb
 * Gets all the content from the database 
 */
export const getDb = async () => {
	console.log('GET all from the database');

	const jateDb = await open('jate', 1);

	// Define readonly privileges for the transaction 
	const tx = jateDb.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');

	// Use the .getAll() method to return all objects in the ObjectStore 
	const request = store.getAll();
	const result = await request;

	console.log('result.value', result);
	return result;
}

initdb();
