import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {CreateProductPage} from '.'

const setup = () => render(<CreateProductPage />)

const getNameInput = () => screen.getByLabelText(/name/i)

describe('Create product page', () => {
  it('There must be a create product form page with header "Store Form App"', () => {
    setup()

    expect(
      screen.getByRole('heading', {name: /store form app/i}),
    ).toBeInTheDocument()
  })

  it('The form must have the following fields: name, size, type and a submit button.', () => {
    setup()

    const nameInputEl = screen.getByLabelText(/name/i)
    const sizeInputEl = screen.getByLabelText(/size/i)
    const typeInputEl = screen.getByLabelText(/type/i)
    const submitBtnEl = screen.getByRole('button', {name: /submit/i})

    expect(nameInputEl).toBeInTheDocument()
    expect(sizeInputEl).toBeInTheDocument()
    expect(typeInputEl).toBeInTheDocument()
    expect(submitBtnEl).toBeInTheDocument()
  })

  it('the type select should contain the options electronic, furniture and clothing', () => {
    setup()

    userEvent.click(screen.getByLabelText(/type/i))

    const [electronicOptionEl, furnitureOptionEl, clothingOptionEl] =
      screen.getAllByRole('option')

    expect(electronicOptionEl).toBeInTheDocument()
    expect(furnitureOptionEl).toBeInTheDocument()
    expect(clothingOptionEl).toBeInTheDocument()
  })

  describe('form validations', () => {
    it('should show the name field is requied when the user clicks on submit', () => {
      setup()

      const nameInputEl = getNameInput()
      const submitBtnEl = screen.getByRole('button', {name: /submit/i})

      expect(nameInputEl).toHaveValue('')

      userEvent.click(submitBtnEl)

      expect(screen.getByText('The Name is required')).toBeInTheDocument()
    })

    it('should remove the validation message when the user fills the form and clicks on submit', () => {
      setup()

      const nameInputEl = getNameInput()
      const submitBtnEl = screen.getByRole('button', {name: /submit/i})

      userEvent.click(submitBtnEl)

      expect(screen.getByText('The Name is required')).toBeInTheDocument()

      userEvent.type(nameInputEl, 'foo')

      userEvent.click(submitBtnEl)

      expect(screen.queryByText('The Name is required')).not.toBeInTheDocument()
    })
  })
})
