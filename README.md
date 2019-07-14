![demo.gif](https://github.com/ansonyao/monthlyStarHistory/blob/master/demo.gif)

# Why do we need another Star History Repo?

This repo is inspired by the current one 'star-history' by timqian. The major differece is that this repo uses Github API v4  to traverse the stargazers, rather than taking samples using API v3. 

# Why using API v4 rather than v3?
The benefit of using v4 is that you can traverse the stargazers quite efficiently. This is because v4 has a GraphQL interface and you can ask the server to only send back properties you are interested in. Additionaly, using v4 allows you to traverse ALL the stargazers whereas v3 seems to have a limitation on how far you can go back in pagination with API v3. For example, I used v3 to do something like getStarGazers?page=1100 and got a rejection from the server.

