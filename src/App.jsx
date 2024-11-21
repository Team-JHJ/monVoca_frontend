import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BasePage from '@/pages/base-page.jsx'
import MainPage from '@/pages/main-page.jsx'
import MainScreen from '@/pages/Main-Screen.jsx'
import NoteListPage from '@/pages/Note-list-page.jsx'
import VocaEditPage from '@/pages/Voca-edit-page.jsx'
import VocaAddPage from '@/pages/Voca-add-page.jsx'
import VocaLearningPage from '@/pages/Voca-learning-page.jsx'
import FlashcardChoicePage from '@/pages/Flashcard-choice-page.jsx'
import VocaFlashcardPage from '@/pages/Voca-flashcard-page.jsx'
import NoteAddPage from '@/pages/Note-add-page.jsx'
import ImageUploadPage from '@/pages/Image-upload-page.jsx'
import VocaQuizPage from '@/pages/Voca-quiz-page.jsx'
import SentenceQuizPage from '@/pages/Sentence-quiz-page.jsx'
import CompletionPage from '@/pages/Completion-page.jsx'
import VocaCheckPage from '@/pages/Voca-check-page.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/note-list',
        element: <NoteListPage />,
    },
    {
        path: '/note-add',
        element: <NoteAddPage />,
    },
    {
        path: '/',
        element: <BasePage />,
        children: [
            {
                path: '/main',
                element: <MainScreen />,
            },
            {
                path: '/voca-edit',
                element: <VocaEditPage />,
            },
            {
                path: '/add-word',
                element: <VocaAddPage />,
            },
            {
                path: '/edit-word',
                element: <VocaAddPage />,
            },
            {
                path: '/voca-learning',
                element: <VocaLearningPage />,
            },
            {
                path: '/flashcard-choice',
                element: <FlashcardChoicePage />,
            },
            {
                path: '/voca-flashcard',
                element: <VocaFlashcardPage />,
            },
            {
                path: '/image-upload',
                element: <ImageUploadPage />,
            },
            {
                path: '/example-quiz',
                element: <SentenceQuizPage />,
            },
            {
                path: '/voca-quiz',
                element: <VocaQuizPage />,
            },
            {
                path: '/voca-check',
                element: <VocaCheckPage />,
            },
            {
                path: '/completion',
                element: <CompletionPage />,
            },
        ],
    },
    {
        path: '*',
        element: <MainPage />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
