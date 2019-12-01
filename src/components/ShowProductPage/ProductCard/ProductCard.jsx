import React, { useState, useEffect } from 'react'
import classes from './ProductCard.module.css'
import { Form, TextInput } from 'grommet'
import firebase from '../../../utils/firebase'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton'
import { Line } from 'rc-progress'
import { Button, Alert, Loader } from 'rsuite'

const ProductCard = ({ des, pri, filen, id, fetchAllProducts }) => {
	const [description, setDescription] = useState(des)
	const [price, setPrice] = useState(pri)
	const [progress, setProgress] = useState(0)
	const [imageURL, setImageURL] = useState('')
	const [filename, setFilename] = useState(filen)

	useEffect(() => {
		fetchImage()
	}, [])

	const fetchImage = async () => {
		return await firebase
			.storage()
			.ref(`images/${filename}`)
			.getDownloadURL()
			.then(url => setImageURL(url))
			.catch(err => console.log(err))
	}

	const handleUploadStart = () => {
		setProgress(0)
	}

	const handleProgress = progress => {
		setProgress(progress)
	}

	const handleUploadError = err => {
		console.log(err)
	}

	const handleUploadSuccess = async thisFileName => {
		setProgress(100)
		setFilename(thisFileName)
		firebase
			.storage()
			.ref(`images/${thisFileName}`)
			.getDownloadURL()
			.then(url => {
				setImageURL(url)
				Alert.success('Thay hình thành công!')
			})
	}

	const handleSubmit = () => {
		firebase
			.firestore()
			.collection('goms')
			.doc(id)
			.set({ imageName: filename, description: description, price: price })
		setProgress(100)
		Alert.success('Đã cập nhật')
		setProgress(0)
	}

	const handleDelete = () => {
		firebase
			.firestore()
			.collection('goms')
			.doc(id)
			.delete()
			.then(() => {
				Alert.success('Xóa thành công')
				fetchAllProducts()
			})
	}
	return (
		<section className={classes.ProductCard}>
			{imageURL ? (
				<img src={imageURL} alt='loading...' />
			) : (
				<Loader backdrop content='loading...' vertical />
			)}
			<section className={classes.mainContent}>
				<section style={{ margin: 'auto', width: 200 }}>
					<Line percent={progress} strokeWidth='4' />
				</section>
				<Form>
					<TextInput
						placeholder='Mô tả'
						value={description}
						onChange={event => setDescription(event.target.value)}
						style={{ margin: '1rem auto', display: 'inline-block' }}
					/>
					<TextInput
						placeholder='Giá'
						value={price}
						onChange={event => setPrice(event.target.value)}
						style={{ margin: '1rem auto', display: 'inline-block' }}
					/>
					<section style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button type='submit' color='cyan'>
							<CustomUploadButton
								hidden
								accept='image/*'
								name='filename'
								randomizeFilename
								storageRef={firebase.storage().ref('images')}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
								onProgress={handleProgress}
							>
								Thay đổi hình ảnh
							</CustomUploadButton>
						</Button>
						<Button type='submit' color='cyan' onClick={handleDelete}>
							Xóa
						</Button>
						<Button type='submit' color='cyan' onClick={handleSubmit}>
							Cập nhật
						</Button>
					</section>
				</Form>
			</section>
		</section>
	)
}

export default ProductCard
