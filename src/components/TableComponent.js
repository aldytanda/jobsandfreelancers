import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component'
import axios from 'axios';
import Moment from 'react-moment';
import { FilterComponent } from './FilterComponent';
import Button from './Button';
import { useHistory } from 'react-router-dom';

const dateFormatter = row => <Moment format="lll">{row.created}</Moment>

export const TableComponent = (props) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalRows, setTotalRows] = useState(0)
	const [perPage] = useState(5)
	const [filterText, setFilterText] = useState('')
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
	const [deleteData, setDeleteData] = useState([])

	const cols = props.columns

	const columns = useMemo(() => [
		{name: props.fieldKey, selector: props.searchKey},
		...cols,
		{ name: 'Created', selector: 'created', format: dateFormatter },
		{
			cell: (row) => <Button onClick={handleClickDelete} id={row.id}>X</Button>,
			ignoreRowClick: true,
			allowOverFlow: true,
			button: true
		},
		{
			cell: (row) => <Button onClick={handleClickGo} id={row.id}>GO</Button>,
			ignoreRowClick: true,
			allowOverFlow: true,
			button: true
		}
	], [])

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle)
				setFilterText('')
			}
		}
		return (<FilterComponent
			onFilter={e => setFilterText(e.target.value)}
			onClear={handleClear}
			filterText={filterText}
		/>)
	}, [filterText])

	const fetchData = async page => {
		setLoading(true)
		const req = `http://localhost:5000/${props.namespace}/page/${page}?${props.searchKey}=${filterText}`
		const response = await axios.get(req)

		setData(response.data.data.items)
		setTotalRows(response.data.data.total)
		setLoading(false)
	}

	const handleClickDelete = async (event) => {
		setLoading(true)
		const id = event.target.id
		const req = `http://localhost:5000/${props.namespace}/${id}`
		const response = await axios.delete(req)
		if (response.status == 201) {
			setDeleteData([...deleteData, id])
		} else {
			setLoading(false)
		}
	};

	const handlePageChange = page => {
		fetchData(page)
	}
	
	const history = useHistory()

	const handleClick = () => {
		history.push({
			pathname: `/${props.namespace}/details`,
			state: {mode: 'add'}
		})
	}

	const handleClickGo = (event) => {
		const id = event.target.id
		history.push({
			pathname: `/${props.namespace}/details/`,
			state: {mode: 'view', id: id}
		})
	}

	const actions = <Button key="add" onClick={handleClick}>Add</Button>

	useEffect(() => {
		fetchData(1)
	}, [filterText, resetPaginationToggle, deleteData])

	return (
		<div>
			<DataTable
				title={props.tableTitle}
				columns={columns}
				data={data}
				progressPending={loading}
				pagination
				paginationServer
				paginationTotalRows={totalRows}
				paginationResetDefaultPage={resetPaginationToggle}
				onChangePage={handlePageChange}
				paginationRowsPerPageOptions={[5]}
				paginationPerPage={perPage}
				subHeader={true}
				subHeaderAlign='center'
				subHeaderComponent={subHeaderComponentMemo}
				actions={actions}
			/>
		</div>
	)
}