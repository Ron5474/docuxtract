'use server'

export async function getJsonData(formData: FormData) {
  // console.log('Sending a Request to Server')
  const response = await fetch('http://localhost:3010/api/v0/document/upload', {
    method: 'POST',
    body: formData
  })
  
  const result = await response.json()
  // console.log('Res: ', result)
  return result
}