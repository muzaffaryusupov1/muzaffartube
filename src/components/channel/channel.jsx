import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChannelCard, Videos } from '../'
import { ApiService } from '../../service/api.service'

const Main = () => {
	const [channelDetail, setChannelDetail] = useState()
	const [videos, setVideos] = useState([])
	const { id } = useParams()

	useEffect(() => {
		const getData = async () => {
			try {
				const dataChannelDetail = await ApiService.fetching(
					`channels?part=snippet&id=${id}`
				)
				setChannelDetail(dataChannelDetail.items[0])
				const dataVideos = await ApiService.fetching(
					`search?channelId=${id}&part=snippet%2Cid&order=date`
				)
				setVideos(dataVideos?.items)
			} catch (error) {
				console.log(error)
			}
		}
		getData()
	}, [id])

	console.log(channelDetail)

	return (
		<Box minHeight={'95vh'} mt={'1vh'}>
			<Box>
				<Box
					width={'100%'}
					height={'200px'}
					zIndex={10}
					sx={{
						backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						objectFit: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				/>
				<ChannelCard video={channelDetail} marginTop={'-100px'} />
			</Box>
			<Container maxWidth={'90%'}>
				<Videos videos={videos} />
			</Container>
		</Box>
	)
}

export default Main
