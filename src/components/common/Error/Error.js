import styles from './Error.module.css'

const Error = ({ message }) => {
    return (
        <div>
            <span className={styles.error}>{message}</span>
        </div>
    )
}

export default Error;