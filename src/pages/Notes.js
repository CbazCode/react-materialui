import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes() {

  const {data, loading} = useFetch('http://localhost:3001/notes');

  const [notes, setNotes] = useState([]);
  console.log(notes);
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

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      {
        loading ?
        <h1>Loading...</h1> :
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            notes?.map(note => {
              return (
              <div xs={12} md={6} lg={4} key={note.id}>
                <NoteCard note={note} handleDelete={handleDelete} />
              </div>)
            })
          }
          </Masonry>
      }

    </Container>
  )
}
