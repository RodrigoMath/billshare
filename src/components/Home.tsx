import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import UserContext from "../contexts/UserContext.tsx";
import {useContext, useState} from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Data',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'receipt',
      headerName: 'Recibo  ',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

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
  };

  
  export function Home(){
  const {username} = useContext(UserContext);
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = React.useState({
    description: "",
    lastName: "",
    date: "",
    //receipt: ""
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewRow({ description: "", lastName: "", date: "" });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRow((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddRow = () => {
    if (newRow.description && newRow.lastName && newRow.date) {
      setRows((prevRows) => [...prevRows, { id: prevRows.length + 1, ...newRow }]);
      setNewRow({ description: "", lastName: "", date: ""});
      handleClose();
    } else {
      alert("Preencha todos os campos!");
    }
  };
    return(
      <>
      <h1> Bem vindo, {username}</h1>
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      <Button variant="contained" disableElevation onClick={handleOpen}>Adicione uma nova fatura</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} 
        display = "flex"
        flexDirection= "row"
        flexWrap= "wrap">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Preencha seu comprovante de pagamento:
            </Typography>
            <TextField name="description" id="outlined-basic" label="Descrição" variant="outlined" sx={{ m: 1 }} value={newRow.description} onChange={handleChange}/>
            <TextField name="lastName" id="outlined-basic" label="???" variant="outlined" sx={{ m: 1 }} value={newRow.lastName} onChange={handleChange}/>
            <TextField name="date" id="outlined-basic" label="Data" variant="outlined" sx={{ m: 1 }} value={newRow.date} onChange={handleChange}/>
            <Button variant="outlined" disableElevation  sx={{ m: 1 }}>Coloque a imagem do pagamento</Button>
            <Button variant="contained" disableElevation onClick={handleAddRow} sx={{ m: 1 }}>Confirmar alteração</Button>

        </Box>
      </Modal>  
      </Box>
      </>
    );
}    