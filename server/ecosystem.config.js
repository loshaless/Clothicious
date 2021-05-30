module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
      DB_USERNAME: "postgres",
      DB_PASSWORD: "postgres",
      DB_URL: "clothicious.cu3mzzmaivmv.us-east-1.rds.amazonaws.com",
      JWT_PASSWORD: "password"
    },
    env_production: {
      NODE_ENV: "production",
      DB_URL: "clothicious.cu3mzzmaivmv.us-east-1.rds.amazonaws.com",
      JWT_PASSWORD: "password"
    }
  }]
}