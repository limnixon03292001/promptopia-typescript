type Post = {
    _id?: string
    prompt: string, 
    tag: string
}

type Posts = {
    _id: string,
    creator: {
      _id: string,
      email: string,
      username: string,
      image: string
    },
    prompt: string,
    tag: string
}

type SessionData = {
    user?: {
        name: string,
        email: string,
        image: string,
        id: string
    }
    expires?: string,
}