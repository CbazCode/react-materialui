import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import NoteCard from '../components/NoteCard'

export default function Notes() {

  const {data, loading} = useFetch('http://localhost:3001/notes');

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(data);
  }, [data])

  const handleDelete = async (id) => {
    await fetch('http://localhost:3001/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  return (
    <Container>
      {
        loading ?
        <h1>Loading...</h1> :
        <Grid container spacing={3}>
          {
            notes?.map(note => {
              return (
              <Grid item xs={12} md={6} lg={4} key={note.id}>
                <NoteCard note={note} handleDelete={handleDelete} />
              </Grid>)
            })
          }
        </Grid>
      }

    </Container>
  )
}
