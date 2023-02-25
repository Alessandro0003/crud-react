import {  setCookie  } from 'cookies-next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/cardRegister.module.css'
import LoginCard from "../src/components/loginCard/loginCard";
import Input from "../src/components/inputs/input"
import Button from "../src/components/button/button"

export default function LoginPage(){
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormEdit = (event, name) => {   
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handleForm = async (event) => {
        try{
            event.preventDefault()
            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json()
            if(response.status !== 200) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.background}>
          <LoginCard title="Entre em Sua Conta" >
                <form className={styles.form} onSubmit={handleForm}>
                    <Input type="email" 
                        placeholder="Digite Seu Email" 
                        required
                        value={formData.email} 
                        onChange={(e) => {handleFormEdit(e, 'email')}}
                    />
                    <Input type="password" 
                        placeholder="Digite Sua Senha" 
                        required
                        alue={formData.password} 
                        onChange={(e) => {handleFormEdit(e, 'password')}}
                    />
                    <Button>Entrar</Button>
                    <Link href="/cadastro" className={styles.link}>Ainda não Possui cadastro?</Link>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </LoginCard>
        </div>
    )
}