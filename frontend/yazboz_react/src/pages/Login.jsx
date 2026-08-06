import React from 'react'
import '../css/Login.css'

function Login() {
  return (
    
    <div className='login-container'>
      <input type="text" placeholder='Kullanıcı Adı'/>
      <input type="password" placeholder='Şifre'/>

      <button>Giriş Yap</button>
    </div>
  )
}

export default Login