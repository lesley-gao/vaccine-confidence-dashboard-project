/**
 * This component is a custom input field with validation and animation.
 * It uses react-hook-form to manage form state and validation.
 * It displays error or hint messages based on the validation state of the input field.
 */
import { findInputError } from '../utils/findInputError.js'
import { isFormInvalid } from "../utils/isFormInvalid.js"
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { BsInfoCircle } from 'react-icons/bs'
import { useState } from 'react'

const InputMessage = ({ message, isError }) => {
    return (
        <motion.p
            className={`absolute -top-6 flex items-center gap-1 px-2 text-[15px] ${isError ? 'text-red-500' : 'text-indigo-500'
                }`}
            {...framer_message}
        >
            {isError ? <MdError /> : <BsInfoCircle />}
            {message}
        </motion.p>
    )
}

const framer_message = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}

export default function Input({ label, type, id, placeholder, validation, name }) {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const [isFocused, setIsFocused] = useState(false)
    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)

    const getHintMessage = () => {
        if (name === 'cPassword') {
            return 'Please enter your password again'
        }
        if (validation.pattern) {
            return validation.pattern.message
        }
        if (validation.minLength) {
            return `Minimum ${validation.minLength.value} characters`
        }
        if (validation.maxLength) {
            return `Maximum ${validation.maxLength.value} characters`
        }
        return ''
    }

    return (
        <div className="flex flex-col w-full ">

            <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputMessage
                            message={inputError.error.message}
                            isError={true}
                            key={inputError.error.message}
                        />
                    )}
                    {!isInvalid && isFocused && (
                        <InputMessage
                            message={getHintMessage()}
                            isError={false}
                            key="hint"
                        />
                    )}
                </AnimatePresence>
                <input
                    id={id}
                    type={type}
                    className={`input-field ${isInvalid ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    {...register(name, validation)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    )
}