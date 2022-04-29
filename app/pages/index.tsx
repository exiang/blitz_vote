import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

import {
  Container,
  Flex,
  Spacer,
  Center,
  Square,
  Circle,
  Heading,
  Box,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Center>
          <Heading>Blitz Vote</Heading>
        </Center>
        <Button
          colorScheme="red"
          size="sm"
          variant="outline"
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>

        <Link href={Routes.QuestionsPage()}>
          <Button colorScheme="teal" variant="outline">
            <a>Questions</a>
          </Button>
        </Link>
      </>
    )
  } else {
    return (
      <Flex justify="center" alignItems="center">
        <Box maxW="480px" mx="auto">
          <Heading mt={10} mb={10}>
            Blitz Vote
          </Heading>
          <Link href={Routes.SignupPage()}>
            <Button colorScheme="teal" mb={3} isFullWidth={true}>
              <strong>Sign Up</strong>
            </Button>
          </Link>
          <Link href={Routes.LoginPage()}>
            <Button colorScheme="teal" mb={3} isFullWidth={true}>
              <strong>Login</strong>
            </Button>
          </Link>
        </Box>
      </Flex>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
