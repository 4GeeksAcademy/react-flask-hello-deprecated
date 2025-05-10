# This file includes global variables that will be available inside your project
# 1. In the front end code you can access this variables like this: console.log(process.env.VARIABLE_NAME)
# 1. In the back end code you access the variable by importing os and then typing print(os.getenv('VARIABLE_NAME'))

# Back-End Variables
DATABASE_URL=postgres://gitpod:postgres@localhost:5432/example
FLASK_APP_KEY="any key works"
FLASK_APP=src/app.py
FLASK_DEBUG=1
DEBUG=TRUE
STRIPE_SECRET_KEY=sk_test_jm0zOjixQ1UXohjeJYMKHO4x
STRIPE_PUBLIC_KEY=pk_test_y6j09buhEITjgLAbivNqMsbP

# Front-End Variables
BASENAME=/
BACKEND_URL=https://congenial-space-trout-q79qxvwp64wj244g4-3001.app.github.dev/
REACT_APP_BACKEND_URL=https://congenial-space-trout-q79qxvwp64wj244g4-3001.app.github.dev/

# .env file
REACT_APP_SUCCESS_URL=https://congenial-space-trout-q79qxvwp64wj244g4-3000.app.github.dev/success
REACT_APP_CANCEL_URL=https://congenial-space-trout-q79qxvwp64wj244g4-3000.app.github.dev/cancel
