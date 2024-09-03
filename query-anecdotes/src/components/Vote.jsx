import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updateAnecdote } from '../requests'

const Vote = ({ label, anecdote }) => {
    const queryClient = useQueryClient()

    const dispatch = useNotificationDispatch()

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
        const message = `voted '${anecdote.content}'`
        dispatch(message)
    }

    const updateAnecdoteMutation = useMutation({
    	mutationFn: updateAnecdote,
    	onSuccess: (updatedAnecdote) => {
      		queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    	}
  	})

    return (
        <button onClick={() => handleVote(anecdote)}>
            {label}
        </button>
    )
    
}

export default Vote