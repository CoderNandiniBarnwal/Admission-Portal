import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Verify from '../components/Verify'
import ShowAdmission from '../components/ShowAdmission'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

function Home() {
  return (
    <div><Navbar/><Banner/><ShowAdmission/><Pagination/><Footer/></div>
  )
}

export default Home