import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const DataPage = () => {
    const location = useLocation();
    const [profile, setProfile] = useState([]);
const getProfile =  async () => {
    const {data} = await axios.get('https://express-t4.onrender.com/api/users/'+location.state);
    setProfile(data);
};
useEffect(() => {
     getProfile();
     // eslint-disable-next-line
    }, []);
  return (
    <div className='App'> 
    <Container maxWidth="sm">
    <Card sx={{height:'95%'}}>
              <CardMedia
                component="img"
                height="220"
                image={profile.picture}
                alt={profile.name}
              />
              <CardContent >
                <Typography gutterBottom variant="h3" component="h2">
                  {profile.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Gender: {profile.gender}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Email: {profile.email}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Contact: {profile.phone}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Address: {profile.address}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {profile.greeting}
                </Typography>
              </CardContent>
            </Card>
        </Container>
    </div>
  )
}

export default DataPage
