import React from 'react'
import { TableComponent } from '../../components/TableComponent';

const Freelancers = () => {
	return (
		<TableComponent
			columns={[]}
			namespace='freelancer'
			fieldKey='Name'
			searchKey='name'
			tableTitle='Freelancer List'
		/>
	)
}

export default Freelancers