import React, { useState } from 'react'
import { Form, TextInput, Button } from 'grommet'
import classes from './AddProductPage.module.css'
import FileUploader from 'react-firebase-file-uploader'
import firebase from '../../utils/firebase'
import { Line } from 'rc-progress'
import cogoToast from 'cogo-toast'
const AddProductPage = () => {
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [imageURL, setImageURL] = useState('')
	const [progress, setProgress] = useState(0)
	const [filename, setFilename] = useState('')

	const handleUploadStart = () => {
		setProgress(0)
		cogoToast.loading('Đang tải...')
	}

	const handleProgress = progress => {
		setProgress(progress)
	}

	const handleUploadError = err => {
		console.log(err)
		cogoToast.warn('Error')
	}

	const handleUploadSuccess = async thisFileName => {
		setProgress(100)
		cogoToast.success('Tải xong')
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
			.then(url => setImageURL(url))
	}

	const handleSubmit = e => {
		e.preventDefault()
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
				cogoToast.success('Thêm gốm thành công!')
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
						<label
							style={{
								display: 'inline-block',
								boxSizing: 'border-box',
								border: '2px solid #7D4CDB',
								cursor: 'pointer',
								padding: '4px 22px',
								fontSize: '18px',
								borderRadius: '18px',
								backgroundColor: '#7D4CDB',
								color: '#f8f8f8',
								margin: '0.5rem'
							}}
						>
							Thêm ảnh
							<FileUploader
								hidden
								accept='image/*'
								name='filename'
								randomizeFilename
								storageRef={firebase.storage().ref('images')}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
								onProgress={handleProgress}
							/>
						</label>

						<Button type='submit' primary label='Đăng' onClick={handleSubmit} />
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
