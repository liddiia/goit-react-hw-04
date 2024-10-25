import css from './ErrorMessage.module.css'

const ErrorMesage = ({error}) => {
  return (
    <div>
      <p className={css.errorMessage}>Oops, some error occured. {error}... Please, try again later.</p>
    </div>
  )
}

export default ErrorMesage