"use client"

import { useState, useEffect, ChangeEvent } from "react"
import PromptCard from "./PromptCard"

type PromptCardListProps = {
  data: {
    _id: string,
    creator: {
      _id: string,
      email: string,
      username: string,
      image: string
    },
    prompt: string,
    tag: string
  }[],
  handleTagClick: any
}

const PromptCardList = ({ data, handleTagClick } : PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout"> 
      {data.map((post) => (
        <PromptCard
          key = {post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [allPosts, setAllPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
  const [searchedResults, setSearchedResults] = useState([])
  
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setAllPosts(data)
  }

  useEffect(() => {
  
    fetchPosts()
  
  },[])

  // const filterPrompts = (searchtext: string) => {
  //   const regex = new RegExp(searchtext, "i") // i mean for case-insensitive
  //   return allPosts.filter(
  //     (item: Posts) => {
  //        regex.test(item.creator.username) ||
  //        regex.test(item.tag) ||
  //        regex.test(item.prompt)
  //   })
  // }

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item: Posts) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(searchTimeout) {
      clearTimeout(searchTimeout)
    }
    setSearchText(e.target.value)
    // console.log(searchText)
    //debounce
    setSearchTimeout(
      setTimeout(() => {
   
        const searchResult = filterPrompts(e.target.value)
        console.log("x",searchResult)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      )  : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )
    }
    
    </section>
  )
}
