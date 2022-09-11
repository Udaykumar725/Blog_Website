import { Grid } from '@mui/material'
import Banner from '../../banner/Banner'
import Catogories from './Catogories'
import Posts from './post/Posts'

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item xs={12} sm={2} lg={2}>
          <Catogories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Posts />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
