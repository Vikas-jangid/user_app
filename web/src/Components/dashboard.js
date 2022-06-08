import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



const useStyles = makeStyles({
  delete: {
    cursor:'pointer',
  },
});

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 170 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'contactNumber',
    label: 'Contacts',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
  }
];

let rows = [];

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [usersData, setUsersData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  
  useEffect(()=> {
    const token = localStorage.getItem('user');
    if(!token) {
      navigate('/login');
    }
    axios.get(`http://localhost:9002/`)
    .then(res => {
      var usersData = res.data;
      setUsersData( usersData );
    })
  }, [usersData._id]);
  
  const handleDelete = () => {
    setOpen(true);
  };
  
  const deleteUser = (id) => {
    setOpen(false);
    axios.delete(`http://localhost:9002/${id}`)
    .then(res => {
      return res;
    })
    .catch(err=> {
      return err;
    })
    axios.get(`http://localhost:9002/`)
    .then(res => {
      var usersData = res.data;
      setUsersData( usersData );
    })
  }

  const closeDialog = () => {
    setOpen(false);
  } 


  const editUser = (id) => {
    navigate('/edit/' + `${id}`)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 2 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 10 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.contactNumber}</TableCell>
                        <TableCell>{<DeleteIcon onClick={() =>  handleDelete(row._id)} className={classes.delete} />} {<CreateIcon onClick={() => editUser(row._id)} className={classes.delete}/>}</TableCell>
                        <Dialog
                          open={open}
                          onClose={handleDelete}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Delete Confirmation"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Do Your Really Want To Remove This User.?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={closeDialog}>NO</Button>
                            <Button onClick={()=>deleteUser(row._id)} autoFocus>
                              YES
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
}
