import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyC21f_g_GSecw4Ykh3yBQjm_ASa9aXzSHQ',
	authDomain: 'fir-react-ffc97.firebaseapp.com',
	databaseURL: 'https://fir-react-ffc97.firebaseio.com',
	projectId: 'fir-react-ffc97',
	storageBucket: 'fir-react-ffc97.appspot.com',
	messagingSenderId: '786356102871',
	appId: '1:786356102871:web:b44483a8cce2238758f292'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
