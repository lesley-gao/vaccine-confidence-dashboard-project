import { findInputError } from '../utils/findInputError.js'
import { isFormInvalid } from "../utils/isFormInvalid.js";
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

const InputError = ({ message }) => {
    return (
        <motion.p
            className="flex items-center gap-1 px-2  text-red-500  rounded-md"
            {...framer_error}
        >
            <MdError />
            {message}
        </motion.p>
    )
}

const framer_error = {
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

    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            <input
                id={id}
                type={type}
                className="input-field"
                placeholder={placeholder}
                {...register(name, validation)}
            />
        </div>
    )
}