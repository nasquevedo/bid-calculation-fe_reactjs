import styles from './Fee.module.css'

const Fee = ({ style, fee, label }) => {
    return (
        <div className={`${style} ${styles.subitem}`}>
            <label>{label}</label>
            <label>{fee}</label>
        </div>
    )
}

export default Fee;