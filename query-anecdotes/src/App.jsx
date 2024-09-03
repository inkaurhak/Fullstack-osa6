import { useQuery } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Vote from './components/Vote'

const App = () => {

  	const result = useQuery({
    	queryKey: ['anecdotes'],
    	queryFn: getAnecdotes,
    	retry: false
  	})
  
  	console.log(JSON.parse(JSON.stringify(result)))

  	if ( result.isLoading ) {
    	return <div>loading data...</div>
  	}

  	if (result.isError) {
    	return <div>anecdote service not available due to problems in server</div>
  	}

  	const anecdotes = result.data

  	return (
		<NotificationContextProvider>
			<div>
				<h3>Anecdote app</h3>
		
				<Notification />
				<AnecdoteForm />
		
				{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<Vote type='vote' label='vote' anecdote={anecdote}/>
					</div>
				</div>
				)}
			</div>
		</NotificationContextProvider>
  	)
}

export default App
