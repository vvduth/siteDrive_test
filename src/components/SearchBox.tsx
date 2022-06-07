import axios from 'axios'
import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useAppDispatch } from '../store/hooks'
import { receivedStops } from '../store/stopSlice'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')

  
   

    const config = {
        headers: {
          "Content-Type": "application/graphql",
        },
      };

    const body2 = `{
        stops(name: "${keyword}") {
          gtfsId
          name
          code
          lat
          lon
        }
      }`;
    
      const dispatch = useAppDispatch();
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`,
            body2,
            config
          );
          console.log(response.data.data.stops);
          dispatch(receivedStops(response.data.data.stops))
        } catch (e) {
          console.error(e);
        }
      };

      const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        fetchData();
       
      }
  
    return (
      <Form onSubmit={submitHandler} >
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    )
  }

export default SearchBox