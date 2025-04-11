import { useEffect, useState } from 'react';

import Loading from '../common/Loading/Loading'
import Error from '../common/Error/Error'
import styles from './Form.module.css'

const Form = ({ setPrice }) => {
    const [ isLoading, setIsloading ] = useState(true)
    const [ options, setOptions ] = useState({})
    const [ invalidForm, setInvalidForm ] = useState({
        invalidVehiclePrice: false,
        invalidVehicleType: false
    })

    const initialErrorState = invalidForm;

    const [ vehicleBasePrice, setVehicleBasePrice ] = useState(0)
    const [ vehicleType, setVehicleType ] = useState('')

    const {
        REACT_APP_API_ENDPOINT,
        REACT_APP_VEHICLES_TYPES_ENDPOINT,
        REACT_APP_PRICE_ENDPOINT
    } = process.env

    useEffect(() => {
        const getVehicleTypes = async () => {
            const response = await fetch(`${REACT_APP_API_ENDPOINT}${REACT_APP_VEHICLES_TYPES_ENDPOINT}`);

            if (response.ok) {
                const result = await response.json()

                setIsloading(false)
                setOptions(result.data)
            }
        }

        getVehicleTypes()
    }, [])

    
    const getPrice = async (e) => {
        cleanErrors()
        setVehicleType(e.target.value)
        if (e.target.value === '') {
            setInvalidForm({
                ...invalidForm,
                invalidVehicleType: true
            })
            return 
        }

        if (vehicleBasePrice === '' || vehicleBasePrice === 0) {
            setInvalidForm({
                ...invalidForm,
                invalidVehiclePrice: true
            })
            return 
        }

        const response = await fetch(`${REACT_APP_API_ENDPOINT}${REACT_APP_PRICE_ENDPOINT}?price=${vehicleBasePrice}&type=${e.target.value}`)
        
        if (response.ok) {
            const result = await response.json()

           setPrice(result.data)
           setVehicleBasePrice(0)
           e.target.value = ''
        }

        return
    }

    const cleanErrors = () => {
        setInvalidForm(initialErrorState)
    }

    return (
        <form className={styles.form}>
            <div className={styles.form__group}>
                <label>Vehicle Base Price</label>
                <input 
                    type="number"
                    id="vehicle-base-price"
                    name="vehicle-base-price"
                    className={styles.input}
                    placeholder='300.00'
                    onChange={(e => setVehicleBasePrice(e.target.value))}
                    value={vehicleBasePrice}
                />
                {invalidForm.invalidVehiclePrice && <Error message='Vehicle Price Base is required or must be higher than 0' />}
            </div>
            <div className={styles.form__group}>
                <label>Vehicle Type</label>
                {isLoading && (<Loading message="vehicle types" />)}
                {!isLoading && 
                    (<select
                        id="vehicle-type"
                        className={styles.select}
                        onChange={getPrice}
                        defaultValue={vehicleType}
                    >
                        
                        <option value="">-- Select --</option>
                        {options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                    )
                }
                {invalidForm.invalidVehicleType && <Error message='Vehicle Type is required' />}
            </div>
        </form>
    )
}

export default Form;