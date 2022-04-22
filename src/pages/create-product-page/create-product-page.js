import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'

const menuItemList = ['Electronic', 'Furniture', 'Clothing']

export const CreateProductPage = () => {
  const [nameErrorMsg, setNameErrorMsg] = React.useState(false)

  const validateForm = ({name}) => {
    const nameValue = name.value

    setNameErrorMsg(!nameValue)
  }

  const handleSubmit = e => {
    e.preventDefault()

    validateForm(e.target.elements)
  }

  return (
    <>
      <Typography component="h1" variant="h3">
        Store Form App
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          helperText={nameErrorMsg && 'The Name is required'}
        />
        <TextField label="Size" />
        <TextField label="Type" select defaultValue="Electronic">
          {menuItemList.map(menuItem => (
            <MenuItem key={menuItem} value={menuItem}>
              {menuItem}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
