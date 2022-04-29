import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

import {
  Container,
  Flex,
  Stack,
  Spacer,
  Center,
  Square,
  Circle,
  Heading,
  Text,
  Box,
  Button,
  Link as ChakraLink,
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
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Blitz Vote</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Yee Siang&apos;s first Blitz + Chakra UI app
            </Text>
          </Stack>
          <Link href={Routes.LoginPage()}>
            <Button bg={"blue.400"} _hover={{ bg: "blue.500" }} mb={2} isFullWidth={true}>
              <strong>Login</strong>
            </Button>
          </Link>
          <Link href={Routes.SignupPage()}>
            <Button variant="outline" _hover={{ bg: "blue.500" }} mb={2} isFullWidth={true}>
              <strong>Sign Up</strong>
            </Button>
          </Link>
        </Stack>
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
