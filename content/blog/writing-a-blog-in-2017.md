+++
date = "2017-06-19T21:28:40-07:00"
description = "Writing a blog in 2017"
image = ""
imageAlt = ""
keywords = ["blog", "static site generator"]
tags = ["hugo", "netlify"]
title = "Writing a Blog in 2017"

+++
Blogging platform? *Hugo✓* Custom domain? *Namecheap ✓* Hosting? *Netlify✓* Now what?

As I sit pondering about what to write, I think back to why I decided to blog in the first place.

> I wanted to document my learning process as a programmer.

As such, I will dedicate my **first** blog post to share my experience with my blog setup.

### The Blogging Landscape
There is a gazillion of blogging solutions available today:

- social blogging sites like *Tumblr*
- CMS like *Wordpress, Joomla*
- custom client-server architecture with templating engine
- static site generators like *Jekyll, Hugo*

Like many, I find myself struggling to make a decision in this dilemma. An obvious strategy is to rule out the obvious.

### Decision Making
'What are my needs?' I needed a fast, free and practical technical blog. Hence, not Tumblr. CMS like Wordpress, while popular with its fanciful themes and plugins, does not appeal to me. They are too common, much like Bootstrap in 2017.

> As a programmer, I like to seek out challenges to learn and improve myself.

'How about building my own blog?' It seems like a decent challenge. Heck, I could even leverage technologies like React or Vue to build an isomorphic blog. But, James Long's [RIP Over Engineered Blog](http://www.jlongster.com/RIP-Over-Engineered-Blog) article is a cautionary tale for me. I left it as a challenge for my future self.

> I was reminded of the acronym KISS(Keep It Simple, Stupid).

I began compiling a list of components for building my own blog. A database to store all my posts. A server to handle routing and parse formatted content before persisting them. A templating engine like Pug or Nunjucks. This is pretty much a client-server architecture.

I would have gone with the aforementioned approach had I not came across Sara Soueidan's [article](https://www.sarasoueidan.com/blog/jekyll-ghpages-to-hugo-netlify/). In it, she detailed her migration from Jekyll to Hugo and her research into how fast Hugo is convinced me to give it a go.

### Hugo and Go
[Hugo](https://gohugo.io/) is a static site generator. It prides itself as a fast and flexible static site generator built with Golang. Installation is a breeze with Homebrew. I had it up and running within seconds. It bears a strong resemblance to Jekyll, its competitor. Hugo uses a set of rules to render its content, such as naming conventions for its directory layout, front matter and so on. The biggest challenge for me is to understand the rules and learn how to use its templating engine, Blackbird, which is in Golang. I ended up spending a few hours on its documentation, which is pretty up to date but can be confusing at times. Fortunately, it is open sourced and the community behind it make good use of its [discourse forum](https://discourse.gohugo.io) for technical discussion.

### Action
After spending an entire day or so on it, my blog was live on [Netlify](https://www.netlify.com), a hosting platform that promises performance at its core. Its continuous delivery feature prompted me to move my site from Github Pages as I find it really helpful to be able to monitor my deployments.

I will be writing a follow-up article detailing the steps I took to get it working with Hugo and Netlify.

### Final thoughts
Static site generators come with the benefits of being fast, compiled time vs runtime of the client-server architecture. However, they do come with a learning curve and a lock-in to their framework. Jekyll uses Liquid, a Ruby templating engine whereas Hugo uses Blackbird. A switch from one to another will means a complete rewrite if they do not provide an easy migration tool. While building a blog from scratch can seem daunting, it is worthwhile in the long run as you get to work with the technology you are most comfortable with and it provides you with the flexibility to manage your own content.

P.S. Another reason for my choice of technology is that it is generally free and I can use a custom domain. I tend to penny-pinch on the cloud and a custom blog with a custom domain would mean paying for at least $5/month on either Digital Ocean or Linode.

Thanks for reading!

###### Disclaimer: I am by no means an expert blogger. Statements are my own.