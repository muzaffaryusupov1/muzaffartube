import { Box, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Category, Videos } from '../'
import { colors } from '../../constants/colors'
import { ApiService } from '../../service/api.service'

const Main = () => {
	const [selectedCategory, setSelectedCategory] = useState('New')
	const [videos, setVideos] = useState([])

	const selectedCategoryHandler = category => setSelectedCategory(category)

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await ApiService.fetching(
					`search?part=snippet&q=${selectedCategory}`
				)
				setVideos(data.items)
			} catch (error) {
				console.log(error)
			}
		}

		getData()
	}, [selectedCategory])

	return (
		<Stack>
			<Category
				selectedCategoryHandler={selectedCategoryHandler}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<Box sx={{ p: { xs: 0, sm: 2, md: 2 }, height: '90vh' }}>
				<Container maxWidth={'90%'} sx={{ p: { xs: 0, sm: 1, md: 2 } }}>
					<Typography variant={'h4'} fontWeight={'bold'} mb={2}>
						{selectedCategory}{' '}
						<span style={{ color: colors.secondary }}>videos</span>
					</Typography>
					<Videos videos={videos} />
				</Container>
			</Box>
		</Stack>
	)
}

export default Main
