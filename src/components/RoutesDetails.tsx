import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {fetchBusRoutes} from "../store/busRoutesSlice"

const RoutesDetails = (props) => {
  let params = useParams() ; 
  //console.log(params.id);

  const routes = useAppSelector((state)=> state.buses.routes);
  const dispatch = useAppDispatch() ;
  useEffect(()=> {
    dispatch(fetchBusRoutes(params.id))
  },[])
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
    </>
  )
}

export default RoutesDetails