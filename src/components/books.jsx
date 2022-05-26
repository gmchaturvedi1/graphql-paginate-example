import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GET_BOOKS, File_Upload } from '../graphql/queries';
import { TableHead } from '@mui/material';
import { TablePaginationActions } from './Paginate';
import CircularProgress from '@mui/material/CircularProgress';
const first = 50;
const delay = true;
export default function CustomPaginationActionsTable() {
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(50);
 const [mutate] = useMutation(File_Upload);
 const { error, data, loading, fetchMore, networkStatus } = useQuery(GET_BOOKS, {
  variables: { first, delay },
  notifyOnNetworkStatusChange: true,
 });

 const onChange = ({
  target: {
   validity,
   files: [file],
  },
 }) => {
  if (validity.valid)
   mutate({ variables: { file }, refetchQueries: [{ query: GET_BOOKS, variables: { first, delay }, notifyOnNetworkStatusChange: true }] });
 };
 if (error) {
  console.log(error.message);
  return <div>An error occurred</div>;
 }
 //if (loading || !data) return <div>loading</div>;

 //  if (networkStatus === 1) {
 //   return <div>Loading...</div>;
 //  }

 // Avoid a layout jump when reaching the last page with empty rows.
 const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.books.edges.length) : 0;

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  console.log(event.target.value);
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };
 console.log(page, rowsPerPage);
 return (
  <>
   <AppBar position='static' style={{ background: '#fff' }}>
    <Toolbar>
     <Typography variant='h4' component='h4' sx={{ flexGrow: 1, color: '#000' }}>
      User List
     </Typography>
    </Toolbar>
   </AppBar>
   <div style={{ padding: '2px 40px' }}>
    <Typography variant='h6' component='h6' sx={{ flexGrow: 1, color: '#000', mb: 1 }}>
     Import Data
    </Typography>
    <Typography component='p' sx={{ flexGrow: 1, color: '#000', mb: 1 }}>
     Click the button below to upload your users from a csv file. Each column of the first row in this file should be the keys.
    </Typography>
    <input accept='csv/*' style={{ display: 'none' }} id='raised-button-file' multiple type='file' onChange={onChange} />
    <label htmlFor='raised-button-file'>
     <Button variant='raised' component='span' style={{ background: '#2D4EFF', mb: 2, color: '#fff' }}>
      Upload
     </Button>
    </label>

    <Typography variant='h6' component='h6' sx={{ flexGrow: 1, color: '#000', mb: 1, mt: 1 }}>
     View Users
    </Typography>
    <Typography component='p' sx={{ flexGrow: 1, color: '#000', mb: 1 }}>
     You can view and filter your users based on any criteria you set using filters below.
    </Typography>

    <TableContainer component={Paper} style={{ background: '#fff', maxHeight: 480 }}>
     {loading ? (
      <div style={{ textAlign: 'center' }}>
       <CircularProgress color='secondary' />
      </div>
     ) : (
      <Table stickyHeader aria-label='custom pagination table'>
       <TableHead>
        <TableCell style={{ background: '#F4F7F9' }}>ID</TableCell>
        <TableCell style={{ background: '#F4F7F9' }}>Name</TableCell>
        <TableCell style={{ background: '#F4F7F9' }}>Email</TableCell>
        <TableCell style={{ background: '#F4F7F9' }}>Price</TableCell>
        <TableCell style={{ background: '#F4F7F9' }}>Quantity</TableCell>
        <TableCell style={{ background: '#F4F7F9' }}>Total Spend</TableCell>
       </TableHead>
       <TableBody style={{}}>
        {(rowsPerPage > 0 ? data.books.edges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data.books.edges).map((row) => (
         <TableRow key={row.ID}>
          <TableCell>{row.node.ID}</TableCell>
          <TableCell>{row.node['First Name'] + '' + row.node['Last Name']}</TableCell>
          <TableCell>{row.node.Email}</TableCell>
          <TableCell>{row.node.Price}</TableCell>
          <TableCell>{row.node.Quantity}</TableCell>
          <TableCell>{row.node['Total Spend']}</TableCell>
         </TableRow>
        ))}
       </TableBody>
       <TableFooter>
        <TableRow>
         <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={6}
          count={data.books.edges.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
           inputProps: {
            'aria-label': 'rows per page',
           },
           native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
         />
        </TableRow>
       </TableFooter>
      </Table>
     )}
    </TableContainer>
   </div>
  </>
 );
}
