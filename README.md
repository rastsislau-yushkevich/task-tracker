# Getting Started with the app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run Frontend Locally

Clone the project

```bash
  git clone https://github.com/rastsislau-yushkevich/shop-frontend.git
```

Go to the project directory

```bash
  cd tracker-fe
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

For the envs you'll need the following variables:
```bash
  NEXT_PUBLIC_API_URL
  NEXTAUTH_SECRET
  NEXTAUTH_URL
  NEXT_PUBLIC_DDN_TOKEN
```

## Run Hasura DDN Locally

Clone the project

```bash
  git clone https://github.com/rastsislau-yushkevich/shop-frontend.git
```

Go to the project directory

```bash
  cd hasura-tracker
```

Install DDN

```bash
  curl -L https://graphql-engine-cdn.hasura.io/ddn/cli/v4/get.sh | bash
```

Authenticate DDN

```bash
  ddn auth login
```

Start the local PostgreSQL container and Adminer

```bash
  docker compose -f app/connector/my_pg/compose.postgres-adminer.yaml up -d
```
Create a local build 

```bash
  ddn supergraph build local
```

Start local services

```bash
  ddn run docker-start
```

Run your first query

```bash
  ddn console --local
```

## Deployment

You can find the deployed version [here](https://task-tracker-omega-blush.vercel.app/).

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

