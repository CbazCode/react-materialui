import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display: 'block',

  },
  labelRadio:{
    marginBottom:30
  }
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory()
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money')

  const handleSubmit = (e) => {
      e.preventDefault();
      setTitleError(false);
      setDetailsError(false);
      if(!title || !details){
        if(!title) setTitleError(true)
        if(!details) setDetailsError(true)
        return
      }
      fetch('http://localhost:3001/notes',{
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'));
  }


  return (
    <Container>
      <Typography
        //That looks like
        variant="h6"
        //But in reality is
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          onChange={(e)=> setTitle(e.target.value)}
          label="Note title"
          color="secondary"
          variant="outlined"
          fullWidth
          required
          className={classes.field}
          error={titleError}
        />
        <TextField 
          onChange={(e)=> setDetails(e.target.value)}
          label="Details"
          color="secondary"
          variant="outlined"
          fullWidth
          required
          className={classes.field}
          multiline
          rows={4}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel className={classes.labelRadio} >Note category</FormLabel>
          <RadioGroup value= {category} onChange={(e)=> setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
            
            type="submit"
            color="secondary"
            variant="contained"
            // startIcon={<SendIcon/>}
            endIcon={<KeyboardArrowRightIcon/>}
          >
            Submit
          </Button>
        

      </form>

    </Container>
  )
}
