import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-white" />
)

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email!').email('Email inválido.'),
  password: yup.string().required('Digite sua senha!'),
})

export function Login({ signInUser }) {
  const formik = useFormik({
    onSubmit: async values => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
          auth: {
            username: values.email,
            password: values.password
          }
        })


        signInUser(res.data)
      }
      catch (error) {
        if (error.response.status === 404) {
          alert('Email ou senha inválidos. Por favor verifique novamente o email e senha inseridos')
        }
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
    <div className="h-full flex justify-center">
      <div className="bg-birdBlue lg:flex-1"></div>
      <div className="flex-1 flex justify-center items-center p-12 space-y-6">
        <div className="max-w-md">
          <h1 className="text-3xl">Acesse Sua Conta</h1>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <Input name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={formik.isSubmitting} />

              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Input name="password" type="password" placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={formik.isSubmitting} />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <button type="submit" className="bg-birdBlue py-4 rounded-full disabled:opacity-50 w-full text-lg" disabled={formik.isSubmitting || !formik.isValid} >{formik.isSubmitting ? 'Enviando...' : 'Entrar'}</button>
          </form>

          <span className="text-sm text-silver text-center">
            Não tem conta? <a className="text-birdBlue" href="/signup">Inscreva-se</a>
          </span>
        </div>
      </div>
    </div>
  )
}