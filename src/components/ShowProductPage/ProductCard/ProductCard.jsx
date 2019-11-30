import React, { useState, useEffect } from 'react'
import classes from './ProductCard.module.css'
import { Form, TextInput, Button } from 'grommet'
import firebase from '../../../utils/firebase'
import FileUploader from 'react-firebase-file-uploader'
import { Line } from 'rc-progress'

const ProductCard = ({ des, pri, filen, id }) => {
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
			.then(url => setImageURL(url))
	}

	const handleSubmit = () => {
		firebase
			.firestore()
			.collection('goms')
			.doc(id)
			.set({ imageName: filename, description: description, price: price })
		setProgress(100)
		setProgress(0)
	}
	return (
		<section className={classes.ProductCard}>
			{imageURL && <img src={imageURL} alt='loading...' />}
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
						<label
							style={{
								display: 'inline-block',
								boxSizing: 'border-box',
								border: '2px solid #7D4CDB',
								outline: 'none',
								overflow: 'visible',
								cursor: 'pointer',
								padding: '4px 22px',
								fontSize: '18px',
								borderRadius: '18px',
								backgroundColor: '#7D4CDB',
								color: '#f8f8f8',
								margin: '0.5rem',
								transitionProperty:
									'color, background-color, border-color, box-shadow',
								transitionDuration: '0.1s',
								transitionTimingFunction: 'ease-in-out',
								textAlign: 'center'
							}}
						>
							Thay đổi hình ảnh
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

						<Button
							type='submit'
							primary
							label='Thay đổi   '
							onClick={handleSubmit}
							style={{ margin: '0.5rem' }}
						/>
					</section>
				</Form>
			</section>
		</section>
	)
}

export default ProductCard
