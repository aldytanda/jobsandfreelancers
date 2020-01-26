import React, { useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import Moment from 'react-moment';
// import Button from '../../components/Button';
// import { TableComponent } from '../../components/TableComponent';

const JobDetail = () => {
	return (
		<JobForm/>
	)
}

const JobForm = withRouter((props) => {
	const [mode, setMode] = useState(props.location.state.mode)
	const [id, setId] = useState(props.location.state.id)
	const [data, setData] = useState({})
	const [title, setTitle] = useState('')
	const [fee, setFee] = useState(0)
	const [created] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const req = {
			method: 'post',
			url: `http://localhost:5000/job/`,
			data: {
				'title': title,
				'fee': parseInt(fee)
			}
		}
		const response = await axios(req)

		console.log(response)
	}

	const handleChangeTitle = (event) => {
		setTitle(event.target.value)
	}

	const handleChangeFee = (event) => {
		setFee(event.target.value)
	}

	const fetchData = async (id) => {
		const req = `http://localhost:5000/job/${id}`
		const response = await axios.get(req)
		console.log(response)
		setData(response.data.data)
		setMode('view')
	}

	useEffect(() => {
		if(id){
			fetchData(id)
		}
	}, [])

	let elements;
	
	if (mode == 'view') {
		elements = {
			title: <label>{data.title}</label>,
			fee: <label>{data.fee}</label>,
		}
	} else {
		elements = {
			title: <input type='text' placeholder='Job title' name='title' onChange={handleChangeTitle} />,
			fee: <input type='number' placeholder='Job fee' name='fee' onChange={handleChangeFee} />
		}
	}
	
	return(
		<div>
			<h4>{mode == 'view' ? 'Job Detail' : mode == 'edit' ? 'Edit a job' : 'Input a new job'}</h4>
			<form onSubmit={handleSubmit}>
				<label>
					Job Title:
					<br/>
					{elements.title}
				</label>
				<br/>
				<label>
					Job Fee:
					<br/>
					{elements.fee}
				</label>
				{mode != 'view' && <p><button>Submit</button></p>}
			</form>
		</div>
	)
})

export default JobDetail