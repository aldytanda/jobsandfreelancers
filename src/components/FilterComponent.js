import React from 'react';
import { TextField, ClearButton } from './StyledComponents';

export const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter} />
		<ClearButton onClick={onClear}>X</ClearButton>
	</>
)