import React from "react";

const PostsContext = React.createContext([]);

export const PostsProvider = PostsContext.Provider
export const PostsConsumer = PostsContext.Consumer

export default PostsContext;