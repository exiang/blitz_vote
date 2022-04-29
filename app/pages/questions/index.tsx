import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"

import { Button, ButtonGroup } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link href={Routes.ShowQuestionPage({ questionId: question.id })}>
              <a>{question.text}</a>
            </Link>
            <ul>
              {question.choices.map((choice) => (
                <li key={choice.id}>
                  {choice.text} - {choice.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <Button
        colorScheme="teal"
        variant="outline"
        size="xs"
        disabled={page === 0}
        onClick={goToPreviousPage}
      >
        Previous
      </Button>
      <Button
        colorScheme="teal"
        variant="outline"
        size="xs"
        disabled={!hasMore}
        onClick={goToNextPage}
      >
        Next
      </Button>
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewQuestionPage()}>
            <Button colorScheme="teal" variant="solid">
              <a>Create Question</a>
            </Button>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
