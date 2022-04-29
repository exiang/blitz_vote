import { useMutation, Link, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  HStack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

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
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Form
                submitText="Create Account"
                schema={Signup}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    await signupMutation(values)
                    props.onSuccess?.()
                  } catch (error: any) {
                    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                      // This error comes from Prisma
                      return { email: "This email is already being used" }
                    } else {
                      return { [FORM_ERROR]: error.toString() }
                    }
                  }
                }}
              >
                <FormControl id="email" isRequired>
                  <LabeledTextField name="email" label="Email" placeholder="Email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <LabeledTextField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>
              </Form>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href={Routes.LoginPage()}>
                    <ChakraLink color={"blue.400"}>Login Now</ChakraLink>
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

export default SignupForm
