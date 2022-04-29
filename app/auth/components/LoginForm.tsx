import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react"

// Link crash with Nextjs use, override like this https://github.com/chrisbull/blitz-app-with-chakra-ui-template/tree/main/app/core/components

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Form
                submitText="Sign In"
                schema={Login}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    const user = await loginMutation(values)
                    props.onSuccess?.(user)
                  } catch (error: any) {
                    if (error instanceof AuthenticationError) {
                      return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                    } else {
                      return {
                        [FORM_ERROR]:
                          "Sorry, we had an unexpected error. Please try again. - " +
                          error.toString(),
                      }
                    }
                  }
                }}
              >
                <FormControl id="email">
                  <LabeledTextField name="email" label="Email" placeholder="Email" />
                </FormControl>

                <FormControl id="password">
                  <LabeledTextField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>
              </Form>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link href={Routes.ForgotPasswordPage()}>
                    <ChakraLink color={"blue.400"}>Forgot Password?</ChakraLink>
                  </Link>
                </Stack>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don&apos;t have an account?{" "}
                  <Link href={Routes.SignupPage()}>
                    <ChakraLink color={"blue.400"}>Sign Up Now</ChakraLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  )
}

export default LoginForm
