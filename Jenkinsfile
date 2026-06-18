pipeline {
    agent any

    environment {
        // Securely bind Jenkins credentials to pipeline environment variables
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls code from your newly linked GitHub repo
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs project dependencies along with the netlify-cli tool
                sh 'npm install'
                sh 'npm install netlify-cli --no-save' 
            }
        }

        stage('Build Project') {
            steps {
                // Compiles your production-ready static assets
                sh 'npm run build' 
            }
        }

         stage('Deploy to Netlify') {
            steps {
                // Vite compiles into the 'dist' directory
                sh './node_modules/.bin/netlify deploy --dir=dist --prod'
            }
        }

        }
    }
}
