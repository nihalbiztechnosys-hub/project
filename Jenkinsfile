pipeline {
    agent any

    environment {
        // Securely binds your Jenkins stored secrets to Windows environment variables
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
        NETLIFY_SITE_ID   = credentials('netlify-site-id')
    }

    stages {
       
        stage('Install Dependencies') {
            steps {
                // 'bat' runs commands through Windows cmd.exe
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                // Compiles your Vite application into the 'dist' folder
                bat 'npm run build'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                // Executes the Netlify CLI deployment command via cmd batch syntax
                bat 'npx netlify deploy --dir=dist --prod'
            }
        }
    }
}
