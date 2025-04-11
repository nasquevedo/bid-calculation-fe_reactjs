import { useContext } from 'react'

import { PriceContext } from "../../context/PriceContext"
import Fee from './Fee/Fee'
import styles from './Price.module.css'

const Price = () => {
    const priceInfo = useContext(PriceContext);

    const { fees } = priceInfo;

    const rows = [];
    for (const fee in fees) {
        rows.push(<Fee style={styles.item__container} fee={fees[fee].value} label={fees[fee].name} key={fee} />);
    }

    return (
        <div className={styles.price__container}>
            <div className={`${styles.item__container} ${styles.resalted}`}>
                <label>Vehicle Base Price</label>
                <label>{priceInfo.vehicle_base_price}</label>
            </div>
            <div className={styles.item__container}>
                <label>Vehicle type</label>
                <label>{priceInfo.vehicle_type}</label>
            </div>
            <div className={`${styles.item__container} ${styles.resalted}`}>
                <label>Total Fees</label>
                <label>{priceInfo.total_fees}</label>
            </div>
            {rows}
            <hr></hr>
            <div className={`${styles.item__container} ${styles.resalted}`}>
                <label>Total</label>
                <label>{priceInfo.total}</label>
            </div>
        </div>
    )
}

export default Price;