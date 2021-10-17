import { useRouter } from 'next/router'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../styles/index.module.css'


const Id = () => {

    const router = useRouter()
    const { id } = router.query

    interface Data {
        url: string
    }

    const [preview, setPreview] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (id && !preview) {
            axios.get(`/api/url?url=${id}`).then(response => setPreview((response.data as Data).url))
        }

    }, [id, preview])

    useEffect(() => {
        if (preview) setRedirect(true)
        if (redirect) {
            setRedirect(false)

            setTimeout(() => {
                // @ts-ignore
                window.location = preview
            }, 10 * 1000)
        }
    }, [redirect, preview])

    return (
        <div className={styles.container}>
            You will be redirect to <a href={preview}>{preview}</a>
            <LinkPreview url={preview} width="400px" />
        </div>
    )
}

export default Id
