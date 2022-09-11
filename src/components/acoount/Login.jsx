import React, { useState, useContext } from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material'
import { API } from '../../services/api'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 5px rgba(0, 0, 0, 0.6);
`

const Image = styled('img')({
  width: 100,
  margin: 'auto',
  display: 'flex',
  padding: '50px 0 0 0 ',
})

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button {
    margin-top: 20px;
  }
`
const Text = styled(Typography)`
  color: #878787;
  text-align: center;
  padding-top: 18px;
`

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb621b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6363;
  line-height: 0;
  margin-top: 30px;
  font-weight: 600;
`

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #28740;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const loginInitialValue = {
  username: '',
  password: '',
}

const SignUpInitialValue = {
  name: '',
  userName: '',
  password: '',
}

const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'

  const [account, toggleAccount] = useState('login')
  const [signup, setSignup] = useState(SignUpInitialValue)
  const [login, setLogin] = useState(loginInitialValue)
  const [error, setError] = useState('')

  const { setAccount } = useContext(DataContext)
  const navigate = useNavigate()

  const toggleSignup = () => {
    account === 'login' ? toggleAccount('signup') : toggleAccount('login')
  }

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value })
  }

  const signupUser = async () => {
    let response = await API.userSignup(signup)
    if (response.isSuccess) {
      setError('')
      setSignup(SignUpInitialValue)
      toggleAccount('login')
    } else {
      setError('Something went wrong!!! Please try after sometime')
    }
  }

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const loginUser = async () => {
    let response = await API.userLogin(login)
    if (response.isSuccess) {
      setError('')
      console.log('working')
      sessionStorage.setItem(
        'accessToken',
        `Bearer ${response.data.accessToken}`,
      )
      sessionStorage.setItem(
        'refreshToken',
        `Bearer ${response.data.refreshToken}`,
      )

      setAccount({ username: response.data.username, name: response.data.name })

      isUserAuthenticated(true)

      navigate('/')
    } else {
      setError('Something went wrong!! Please try after sometime.')
    }
  }

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="logo" />
        {account === 'login' ? (
          <Wrapper>
            <TextField
              label="Enter username"
              value={login.username}
              variant="standard"
              onChange={onValueChange}
              name="username"
            />
            <TextField
              label="Enter your password"
              value={login.password}
              variant="standard"
              type="password"
              onChange={onValueChange}
              name="password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text>OR</Text>
            <SignupButton onClick={toggleSignup}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              label="Enter your name"
              name="name"
              onChange={onInputChange}
              variant="standard"
            />
            <TextField
              label="Enter your username"
              name="userName"
              onChange={onInputChange}
              variant="standard"
            />
            <TextField
              onChange={onInputChange}
              name="password"
              label="Enter your password"
              variant="standard"
              type="password"
            />

            {error && <Error>{error}</Error>}

            <SignupButton onClick={signupUser}>Signup</SignupButton>
            <Text>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  )
}

export default Login
