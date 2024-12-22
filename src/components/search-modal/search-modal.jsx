import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../constants/colors'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export default function BasicModal() {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	// dkceiosj\
	const [value, setValue] = React.useState('')
	const navigate = useNavigate()

	const changeHandler = e => {
		e.preventDefault()
		if (value) {
			navigate(`/search/${value}`)
			setValue('')
		}
	}

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Paper
					component={'form'}
					onSubmit={changeHandler}
					sx={{
						border: `1px solid ${colors.secondary}`,
						pl: 2,
						boxShadow: 'none',
						mr: 5,
					}}
				>
					<input
						type='text'
						placeholder='Search...'
						className='search-bar'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					{/* <IconButton type='submit'>
				<Search />
			</IconButton> */}
				</Paper>
			</Modal>
		</div>
	)
}
