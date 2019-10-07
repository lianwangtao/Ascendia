
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>ImageCat Password Recovery</title>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
    <form action="/update_password" method="POST">
      <h2>Update password</h2>
      Email Address: <input type="text" id="email" name="email">
      <br>
      New Password: <input type="password" id="password" name="password">
      <br>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
`

export default html
