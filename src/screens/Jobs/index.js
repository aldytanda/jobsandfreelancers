import React from 'react'
import { TableComponent } from '../../components/TableComponent';

const columns = [
		{ name: 'Fee', selector: 'fee' },
]

const Jobs = () => {
	return (
		<TableComponent
			columns={columns}
			namespace='job'
			fieldKey='Title'
			searchKey='title'
			tableTitle='Job List'
		/>
	)
}

export default Jobs