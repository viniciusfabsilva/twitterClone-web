import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useSelector, useState } from 'react'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-white" />
)

const validationSchema = yup.object({
  name: yup.string().required('Digite seu nome!'),
  username: yup.string().required('Digite seu nome de usuário!'),
  email: yup.string().required('Digite seu email!').email('Email inválido.'),
  password: yup.string().required('Digite sua senha!'),
})

export function Register({ signInUser }) {
  const formik = useFormik({
    onSubmit: async values => {
      try {
        const res = await axios.post("http://localhost:9901/signup", {
          name: values.name,
          email: values.email,
          username: values.username,
          password: values.password
        })

        signInUser(res.data)
      } catch (error) {
        window.alert(error.response.data)
      }

    },
    initialValues: {
      email: '',
      password: ''
    },
    validateOnMount: true,
    validationSchema,

  })


  return (
    <div className="flex flex-col justify-center h-full p-12 space-y-6">
      <h1 className="text-3xl">Crie Sua Conta</h1>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>

        <div className="space-y-2">

          <Input
            name="name"
            placeholder="Nome"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />

          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div className="space-y-2">

          <Input name="username"
            placeholder="Nome de usuário"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />

          {formik.errors.username && formik.touched.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        <div className="space-y-2">

          <Input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />

          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="space-y-2">

          <Input
            name="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />

          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-birdBlue py-4 rounded-full disabled:opacity-50 w-full text-lg"
          disabled={formik.isSubmitting || !formik.isValid} >{formik.isSubmitting ? 'Enviando...' : 'Cadastrar'}
          {}
        </button>
            
      </form>
      <span className="text-sm text-silver text-center">
        Já tem uma conta? <a className="text-birdBlue" href="/login">Acesse.</a>
      </span>
    </div>
  )
}