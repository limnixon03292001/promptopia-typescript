"use client"

import { FormEvent, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from '@components/Form'

export default function CreatePrompt() {
    const router = useRouter()
    const {data: session}  = useSession()
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: ''
    })

    const sessionx = session as SessionData
     
    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/new`,{
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: sessionx?.user?.id
                })
            })

            if(response.ok){
                router.push("/")
            }   
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
     <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
     />
    )
  }
  