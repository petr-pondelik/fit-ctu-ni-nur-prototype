import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";

export default function FloatingActionButtons() {
	return (
		<Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: 0, right: 0 }}>
			<Fab color="primary" aria-label="add" component={Link} to={"/event/create"}>
				<AddIcon />
			</Fab>
		</Box>
	);
}