import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"

import { Button, ButtonGroup } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  // const [question] = useQuery(getQuestion, { id: questionId })
  const [question, { refetch }] = useQuery(getQuestion, { id: questionId })
  const [updateChoiceMutation] = useMutation(updateChoice)

  const handleVote = async (id: number) => {
    try {
      await updateChoiceMutation({ id })
      refetch()
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <>
      <Head>
        <title>{question.text}</title>
      </Head>

      <div>
        <Heading>Question {question.text}</Heading>
        <ul>
          {question.choices.map((choice) => (
            <li key={choice.id}>
              {choice.text} - {choice.votes} votes
              <Button colorScheme="blue" size="xs" onClick={() => handleVote(choice.id)}>
                Vote
              </Button>
            </li>
          ))}
        </ul>

        <Link href={Routes.EditQuestionPage({ questionId: question.id })}>
          <Button colorScheme="teal">
            <a>Edit</a>
          </Button>
        </Link>

        <Button
          colorScheme="red"
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({ id: question.id })
              router.push(Routes.QuestionsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </Button>
      </div>
    </>
  )
}

const ShowQuestionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.QuestionsPage()}>
          <Button colorScheme="teal" variant="outline">
            <a>Questions</a>
          </Button>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = true
ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowQuestionPage
