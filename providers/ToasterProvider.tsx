// можно замутить прикольные уведомлялки через тостер

'use client'

import { Toaster } from "react-hot-toast"

const ToasterProvider = () => {
    return (
        <Toaster toastOptions={{style: {
            color: '#fff',
            background: '#333'
        }}} />
    )
}

export default ToasterProvider;

// засунем этот провайдер просто в layout, и будем юзать тоаст везде, где захотим