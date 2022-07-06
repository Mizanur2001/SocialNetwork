import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000" })

export const logIn = async (formData) => { API.post('/login', formData) }
export const signUp = async (formData) => { API.post('/register', formData) }