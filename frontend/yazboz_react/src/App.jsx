import { useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import { Routes,Route } from 'react-router-dom'
import Anasayfa from './pages/Anasayfa'
import Diger from './pages/Diger'
import Dijital from './pages/Dijital'
import Login from './pages/Login'
import Spor from './pages/Spor'
import Tarih from './pages/Tarih'
import Detail from './pages/Detail'
import Panel from './pages/Panel'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'


function App() {


  return (
    <>
     <PageContainer>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Anasayfa/>}/>
          <Route path='/tarih' element={<Tarih/>}/>
          <Route path='/spor' element={<Spor/>}/>
          <Route path='/dijital' element={<Dijital/>}/>
          <Route path='/diger' element={<Diger/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/article/:id" element={<Detail/>} />
          <Route path="/create-article" element={<Panel/>} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer></Footer>
     </PageContainer>
    </>
  )
}

export default App
