import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassowrd: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)

  }
  const habdleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })

  }


  return (
    <>
      <div className='p-3 max-w-lg mx-auto' >
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}  >

          <input type="text" placeholder="Full Name" className='border p-3 rounded-lg' id="fullName" name="fullName" value={user.fullName} onChange={handleChange} />
          <input type="text" placeholder="Username" className='border p-3 rounded-lg' id="username" name="username" value={user.username} onChange={handleChange} />
          <input type="text" placeholder="passowrd" className='border p-3 rounded-lg' id="passowrd" name="password" value={user.password} onChange={handleChange} />
          <input type="text" placeholder="Confirm passowrd" className='border p-3 rounded-lg' id="confirmPassowrd" name="confirmPassowrd" value={user.confirmPassowrd} onChange={handleChange} />

          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p className='text-white'>Male</p>
              <input
                type="checkbox"
                // defaultChecked
                onChange={() => habdleCheckbox("male")}
                className="checkbox checkbox-success mx-2" />
            </div>
            <div className='flex items-center'>
              <p className='text-white'>Female</p>
              <input
                type="checkbox"
                onChange={() => habdleCheckbox("female")}
                // defaultChecked
                className="checkbox checkbox-success mx-2" />
            </div>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >Sign up</button>

        </form>

        <div className='flex gap-3 mt-5' >
          <p className='text-black'>Have an account?</p>
          <NavLink to="/login"><span className='text-blue-700' >Sign in</span></NavLink>
        </div>

      </div>




    </>
  )
}

export default Signup