![demo.gif](https://github.com/ansonyao/monthlyStarHistory/blob/master/demo.gif)

# Why do we need another Star History Repo?

This repo is inspired by the current one 'star-history' by timqian. The problem is that 'star-history' is using API v3. Unfortunately, Github seems to have a limitation on how far you can go back in pagination with API v3. My personal expeirience with v3 is that Github refused the API request when you go to more than 1000 pages (something like getStarGazer?page=1100 will get a rejection). This makes the API v3 hard to deal with when a repo has lots of stars like (react.js). On the other hand, API v4 is based on GraphQL and does not have this problem and you can traverse the stargazers as much as you want to. So I created this new repo to do it with API v4. 
