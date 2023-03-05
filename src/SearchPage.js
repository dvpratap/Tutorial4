import React, {useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import './App.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [records, setRecords] = useState([]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch('https://express-t4.onrender.com/api/users')
        .then(response=> response.json())
        .then(json=> setRecords(json))
        .catch(error => {
          console.error(error);
        });
    }, []);

    const filteredData = records.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
    const handleCardClick= event =>{
          console.log(event.currentTarget.id);
          navigate('/dataPage', {state: event.currentTarget.id});
    }
    const handleSearch= event =>{
        setInput(event.target.value);
        console.log(input);
    }
  
    return (
      <div className='App'>
      <Container maxWidth="sm">
      <div>
    <Card sx={{height:'75px', marginBottom:"20px"}}>
      <TextField sx={{maxWidth: "100%", marginBottom: "30px", marginTop:'7px'}}
          id="search"
          label="Search"
          defaultValue=""
          onChange={handleSearch}
        />
        </Card>
        </div>
      <Grid container spacing={2}>
        {filteredData.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{height:'100%'}}>
            <CardActionArea id={item._id} target="_blank" rel="noopener" onClick={handleCardClick}>
              <CardMedia
                component="img"
                height="140"
                image={item.picture}
                alt={item.name}
              />
              <CardContent >
                <Typography gutterBottom variant="h4" component="h2">
                  {item.name}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      </div>
    );
  }  

export default SearchPage