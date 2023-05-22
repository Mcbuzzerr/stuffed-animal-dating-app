import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ margin: 0, minHeight: "100vh", overflowX: "hidden", overflowY: "auto", backgroundImage: "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
