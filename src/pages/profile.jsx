import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/loader';
const profile = () => {
  const { isAuthenticated, user, loading } = useContext(Context);

  return (
    loading ? <Loader /> : <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default profile