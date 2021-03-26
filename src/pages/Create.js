import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  btn :{
    backgroundColor: 'green',
    '&:hover':{
      backgroundColor: 'blue'
    }
    
  },
});

export default function Create() {
  const classes = useStyles();
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
      <Button
          onClick={()=> console.log('click')}
          type="submit"
          color="secondary"
          variant="contained"
          // startIcon={<SendIcon/>}
          endIcon={<KeyboardArrowRightIcon/>}
        >
          Submit
        </Button>
    </Container>
  )
}
