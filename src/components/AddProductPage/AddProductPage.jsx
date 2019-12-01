import React, { useState } from 'react'
import { Form, TextInput } from 'grommet'
import classes from './AddProductPage.module.css'
import { Button, Alert } from 'rsuite'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton'
import firebase from '../../utils/firebase'
import { Line } from 'rc-progress'
const AddProductPage = () => {
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [imageURL, setImageURL] = useState('')
	const [progress, setProgress] = useState(0)
	const [filename, setFilename] = useState('')

	const handleUploadStart = () => {
		setProgress(0)
		Alert.info('Đang tải...')
	}

	const handleProgress = progress => {
		setProgress(progress)
	}

	const handleUploadError = err => {
		console.log(err)
		Alert.warning('Lỗi')
	}

	const handleUploadSuccess = async thisFileName => {
		setProgress(100)
		if (filename) {
			firebase
				.storage()
				.ref(`images/${filename}`)
				.delete()
		}
		setFilename(thisFileName)
		firebase
			.storage()
			.ref(`images/${thisFileName}`)
			.getDownloadURL()
			.then(url => {
				setImageURL(url)
				Alert.success('Tải xong')
			})
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (description === '' || price === '' || imageURL === '') {
			Alert.error('Điền đủ thông tin')
			return
		}
		firebase
			.firestore()
			.collection('goms')
			.add({ description: description, imageName: filename, price: price })
			.then(() => {
				setDescription('')
				setPrice('')
				setImageURL('')
				setProgress(0)
				setPrice('')
				Alert.success('Thêm gốm thành công!')
			})
	}

	return (
		<section>
			<section style={{ margin: 'auto', width: 200 }}>
				<Line percent={progress} strokeWidth='4' />
			</section>
			<section className={classes.AddProduct}>
				<Form>
					<TextInput
						placeholder='Mô tả'
						value={description}
						onChange={event => setDescription(event.target.value)}
					/>
					<TextInput
						placeholder='Giá'
						value={price}
						onChange={event => setPrice(event.target.value)}
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
								Chọn ảnh
							</CustomUploadButton>
						</Button>

						<Button type='submit' color='cyan' onClick={handleSubmit}>
							Đăng
						</Button>
					</section>
				</Form>
			</section>
			<section style={{ textAlign: 'center', margin: '0.5rem 0' }}>
				{imageURL && (
					<img
						style={{
							maxWidth: 600,
							maxHeight: 600,
							width: 'auto',
							height: 'auto'
						}}
						src={imageURL}
						alt='something'
					/>
				)}
			</section>
		</section>
	)
}

export default AddProductPage
