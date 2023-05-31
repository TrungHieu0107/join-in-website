import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Menu, MenuItem, IconButton } from '@mui/material';

import { useState } from 'react';

const data = [
  {id: 1, name: 'Thanh Huy'}
]

const MyTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDetailClick = () => {
    console.log('Detail clicked for row:', selectedRow);
    handleOptionClose();
  };

  const handleChangeClick = () => {
    console.log('Change clicked for row:', selectedRow);
    handleOptionClose();
  };

  const handleAdminClick = () => {
    console.log('Admin clicked for row:', selectedRow);
    handleOptionClose();
  };

  const handleUserClick = () => {
    console.log('User clicked for row:', selectedRow);
    handleOptionClose();
  };

  const handleDeleteClick = () => {
    console.log('Delete clicked for row:', selectedRow);
    handleOptionClose();
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleOptionClick(event, row)}>
                  Options
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedRow && selectedRow.id === row.id)}
                  onClose={handleOptionClose}
                >
                  <MenuItem onClick={handleDetailClick}>Detail</MenuItem>
                  <MenuItem onClick={handleChangeClick}>
                    Change
                    <Menu
                      open={Boolean(selectedRow && selectedRow.id === row.id)}
                      onClose={handleOptionClose}
                    >
                      <MenuItem onClick={handleAdminClick}>Admin</MenuItem>
                      <MenuItem onClick={handleUserClick}>User</MenuItem>
                    </Menu>
                  </MenuItem>
                  <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
