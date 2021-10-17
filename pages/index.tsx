import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

const Home: NextPage = () => {

  const [ shortened, setShortened ] = useState('')

  const onSubmit = async (event: any) => {
    event.preventDefault()

    const data = new FormData(event.target)

    console.log(Object.fromEntries(data))

    const { url, custom } = Object.fromEntries(data)

    interface Data {
      url: string;
    }

    const response = await axios.post('/api/url', { url, short: custom })

    if (response.status === 201) setShortened((response.data as Data).url)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cake url shortener</title>
        <meta name="description" content="Cake shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={onSubmit}>
        <div id={styles.box}>
          <h1 className={styles.texts}> Create your custom link</h1>
          <div id="input-container">
            <input
              name="url"
              className={`${styles.field} ${styles.input} ${styles.input_url}`}
              // className="field input input-url"
              id={styles.input_url}
              placeholder="Paste here your long url"
              pattern="(?:https?):\/\/[a-z0-9_-]+\.\w+.*"
            />

            <br/>

            <input
              name="custom"
              className={`${styles.field} ${styles.input}`}
              // className="field input"
              id={styles.shortened}
              placeholder="custom url (optional)"
            />

            <br/>

            <input
              type="submit"
              className={styles.input}
              id={styles.create}
              value="Short it"
            />

          </div>

            <h1 id={styles.urlCustom} className={styles.texts}>
              <br/> {`\n${shortened}\n`} <br/>
            </h1>

        </div>
      </form>
      
      <br/>
      <br/>
      <footer className={styles.footer}>
        <a id={styles.source}
          href="https://github.com/Choco02/url-shortener-react"
          target="_blank"
          rel="noreferrer">
            
            Created by
            Choco02
        </a>
      </footer>
    </div>
  )
}

export default Home
