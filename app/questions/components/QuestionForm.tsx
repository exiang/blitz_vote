import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react"

export function QuestionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <FormControl>
        <LabeledTextField name="text" label="Text" placeholder="Text" />
      </FormControl>

      <FormControl>
        <LabeledTextField name="choices.0.text" label="Choice 1" />
      </FormControl>

      <FormControl>
        <LabeledTextField name="choices.1.text" label="Choice 2" />
      </FormControl>

      <FormControl>
        <LabeledTextField name="choices.2.text" label="Choice 3" />
      </FormControl>
    </Form>
  )
}
