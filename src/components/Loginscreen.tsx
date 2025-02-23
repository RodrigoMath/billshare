import {useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext.tsx"



export function Loginscreen() {
  
  const [error, setError] = useState(false);
  const navigate = useNavigate(); 
  const {username, setUsername, password, setPassword} = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (username === 'RodrigoRM' && password === '1234') {
      navigate('/home'); 
    } else {
      if(!error){
        const isError = !error;
        setError(isError);
      }
      alert('Credenciais inválidas!');
    } };
    return (
        <Box 
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            >
            <h2>Seja bem vindo(a)!</h2>
            <TextField id="outlined-basic" label="Login" variant="outlined" value={username} 
            onChange={(e) => setUsername(e.target.value)}/>
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
              <Stack direction="row" spacing={2}>
                {error? <Button variant="contained" color="error" onClick={handleSubmit}>
                  Entrar
                </Button> : <Button variant="contained" color="success" onClick={handleSubmit}>
                  Entrar
                </Button>}
              </Stack>
        </Box>
    );
}
