"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from '@components/Profile'


export default function MyProfile() {

    const { data: session } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState<Posts[]>([])

    const sessionx = session as SessionData

    const handleEdit = (post: Post) => {
      console.log("fired edit")
      router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post: Post) => {
      console.log("fired delete")

      const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id?.toString()}`, {
            method: 'DELETE'
          })

          const filteredPosts = posts.filter((p) => p._id !== post._id)

          setPosts(filteredPosts)
        } catch (error) {
          console.log(error)
        }
      }
    }

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${sessionx?.user?.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
      
        if(sessionx?.user?.id || null) {
            fetchPosts()
        }
    },[sessionx?.user?.id])
    

  return (
    <Profile
        name= "My"
        desc= "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}
