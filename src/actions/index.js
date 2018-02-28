export const setMessage = messageText => ({
  type: 'SET_MESSAGE',
  payload: messageText
})

export const updatePeople = people => ({
  type: 'UPDATE_PEOPLE',
  payload: people
})

export const updatePerson = person => ({
  type: 'UPDATE_PERSON',
  payload: person
})

const dummyPeople = [
  { id: 1, name: 'Erik' },
  { id: 2, name: 'Carl' },
  { id: 3, name: 'Martin' },
  { id: 4, name: 'Maria' },
  { id: 5, name: 'Tobias' },
  { id: 6, name: 'Karl' },
  { id: 7, name: 'Atanas' },
  { id: 8, name: 'Filip' },
  { id: 9, name: 'Hemant' },
  { id: 10, name: 'David' },
]
export const fetchPeople = () => 
  dispatch =>
    dispatch(updatePeople(dummyPeople));

export const fetchPerson = id => 
  dispatch => 
    dispatch(
      updatePerson(
        dummyPeople.filter(dummyPerson => dummyPerson.id.toString() === id)[0]
      )
    )