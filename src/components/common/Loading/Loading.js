import styles from './Loading.module.css'

const loading = ({ message }) => {
    return (
        <div className={styles.container} >
            <label>Loading {message}...</label>
        </div>
    )
}

export default loading