import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

import { ColorModeScript } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <ColorModeScript initialColorMode="system" />
          <Container p="1em">
            <Main />
            <BlitzScript />
          </Container>
        </body>
      </Html>
    )
  }
}

export default MyDocument
