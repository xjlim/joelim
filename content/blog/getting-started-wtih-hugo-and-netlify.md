+++
date = "2017-06-21T23:52:58-07:00"
description = "Getting Started with Hugo and Netlify"
image = "/img/hello-world-with-netlify.png"
imageAlt = "Hello world with Netlify"
keywords = ["Hugo", "Netlify"]
tags = ["Hugo", "Netlify"]
title = "Getting Started with Hugo and Netlify"

+++

As promised, this is the follow up post to my [first](/blog/writing-a-blog-in-2017) post. In this article, I will go over how to get started with Hugo and Netlify.

### Installation
Hugo is a static site generator written in Golang. Installing it on Mac is as simple as running

```bash
$ brew install hugo
```

and verify with

```bash
$ hugo -v
Hugo Static Site Generator v0.23 darwin/amd64 BuildDate: 2017-06-18T01:24:03-07:00
```

Otherwise, refer to the Hugo's [installation guide](https://gohugo.io/overview/installing/) for more details.

To create a new Hugo project, run

```bash
$ hugo new site myprojectname

$ cd myprojectname

$ hugo server
```

This will start a server that serves your static site at http://localhost:1313, which is empty for now. With LiveReload, the server will watch for file changes and refresh the site when it happens.

### Hello World
Let's start creating our first article.

```bash
$ # create a new file at /content/post/ directory
$ hugo new post/hello-world.md

$ echo 'hello world' >> content/post/hello-world.md
```

If you open the file, you should see something like this

![alt text](/img/hello-world.png "Hello world markdown")

Note the weird syntax at the top of the file, that is TOML front matter. It is basically a variant of YAML used to specify configs in key-value pairs. Hugo will always prepopulate them with the current *date* in ISO format, *title* of the file and *draft* status set to true. To preview draft while developing, rerun the `hugo server` command with -D flag.

```bash
$ hugo server -D
```

Right now there will still be nothing because we have not specify how we want to render our contents. To do so, Hugo provides us with [template roles](https://gohugo.io/templates/overview/) and the Go [html/template](https://golang.org/pkg/html/template/) library. Template roles are basically the type of layouts the site can have. Hugo uses these to know which layout to render as the user navigates the site. The key ones are *homepage*, *list* and *single*.

*[homepage:](https://gohugo.io/templates/homepage/)*
This is the home of our site.

*[list:](https://gohugo.io/templates/list/)*
This is for pages with multiple content, such as the page to render our list of blogs posts.

*[single:](https://gohugo.io/templates/content/)*
This is for a single piece of content, such as our hello-world post.

For each of those, Hugo uses a priority list to decide which layout file to serve for a given route. But for simplicity, I will use the ones that is simplest to remember. You can look into the docs, links provided above, for more details.

A typical blog consists of a homepage, pages with list of content such as list of tags or list of blog posts and most importantly, articles. Let's walk through a simple example.

```bash
$ echo '<a href="/post">Blog</a>' >> layouts/index.html

$ mkdir layouts/_default

$ echo '{{ .Content }}' >> layouts/_default/single.html

$ touch layouts/_default/list.html
```

Open *list.html* and paste the following code:


```html
<!-- list.html -->
 <ul>
    {{ range .Pages }}
        <a class="post_links post_title" href="{{ .Permalink }}">{{ .Title }}</a>
    {{ end }}
</ul>
```

Now you can check out the site, it should the anchor link named "Blog" at the homepage, clicking on it will bring you to /blog with a single link with the title of the blog post and clicking on it will show you the "hello world" article we wrote. The route */blog* maps to */content/blog* directory and is what Hugo refer to as a *section*. We told it to show the list of blog posts under the *blog* directory by rendering an unordered list of links. The code above basically says iterate through the page variable *pages*, which is an array of blog posts and render, for each, an anchor that links to itself with its title as the text. For more advanced usage of templating, refer to Hugo's [Go Template Primer](https://gohugo.io/templates/go-templates/) and [Template Functions](https://gohugo.io/templates/functions/). A list of [variables](https://gohugo.io/templates/variables#taxonomy-terms-page-variables) that each page have access to can be found at Hugo's documentation site.

### Overview
Now that we understood the basics of how Hugo works, I will briefly go over the structure of a Hugo project. This is what we have so far:

```bash
├── archetypes
├── config.toml
├── content
│   └── post
│       └── hello-world.md
├── data
├── layouts
│   ├── _default
│   │   ├── list.html
│   │   └── single.html
│   └── index.html
├── static
└── themes
```

- archetypes: This specifies what the default content page for each section looks like, so if I have a */archetypes/post.md* and I declare a Key Value Pair(KVP) of `description=""` in its front matter, every post that I create thereafter will have the KVP `description=""` in its front matter. This can be very handy as it save us time typing the default fields for each content.
- config.toml: this is the config file for our project. You can think of this as a place to declare global variables. In other words, all the KVPs declared here will be accessible in all pages using *.Site.\<Key\>* like *.Site.BaseURL*.
- content: This is where posts are written to.
- data: This is where config files(in TOML, YAML or JSON) lie. You can think of this as a place to declare items that are too large to be hold in the front matter. Data contents can be accessed using *.Site.Data*.
- layouts: This tells Hugo how to render the markup for each page. In addition to *_default* directory, you could have *partials* directory, which is the place to specify common reusable layouts. For instance, the semantic header and footer that can be common to all pages.
- static: This is where assets(css, js, images) are placed.
- themes: This is where themes are located. Once you have install the themes to this directory, you can then use it by declaring theme="\<your-theme-name\>" in config.toml. Using theme is a good way to get started with Hugo as it abstracts the layouts of the site and allows you to focus on creating content.

### Themes
Let's try adding a theme to our site. I will go with [hugo-xmin](https://github.com/yihui/hugo-xmin), a lightweight theme. Before that, let's source control this project to Git with `git init` so that the following command will work.

```bash
$ git init

$ # we are using git submodule to make it easier for updating the theme in near future
$ git submodule add https://github.com/yihui/hugo-xmin themes/hugo-xmin

$ # to update to the latest some time in the future
$ git submodule update --recursive --remote

$ # remove the layouts we created before. Be careful with mistyping as it might unintentionally delete your other files. Alternatively, delete them manually.
$ find layouts -type f -name "*.html" -exec rm -f {} \;
```

Edit the *config.toml* to include `theme="hugo-xmin"`.

```toml
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "hugo-xmin"
```

The site should be updated with a minimalistic theme.

![alt text](/img/hello-world-with-hugo-xmin.png "Hello world with Hugo Xmin theme")

### Deployment
Before you can deploy, you have to publish your drafts. Remove the line `draft=true` from *hello-world.md*.

```md
+++
date = "2017-06-22T01:41:26-07:00"
title = "hello world"

+++

hello world
```

[Netlify](https://www.netlify.com/) is a hosting platform build for speed. You can get started with it for free easily or make use of [Github Pages](https://pages.github.com/).

To deploy to Netlify, first push the project to github.

```bash
$ GITHUB_USERNAME=<your-github-username>

# create a github project from commandline. Alternatively, use a github client.
$ curl -u $GITHUB_USERNAME https://api.github.com/user/repos -d '{"name":"getting-started-with-hugo-and-netlify"}'

$ git remote add origin https://github.com/$GITHUB_USERNAME/getting-started-with-hugo-and-netlify
```

Create an account on [Netlify](https://www.netlify.com/) using your Github account. Once created, click on *New site from Git* button. Then follow the instructions to select the repository you have just created on Github. For build settings, set *Build command* as `hugo` and *Publish directory* as `public`. Click on *Show advanced* and add key `HUGO_VERSION` and value `0.23`. Finally, click *deploy*.

![alt text](/img/hello-world-with-netlify-build.png "Hello world with Netlify build")

If all goes well, the site should be up and running.
![alt text](/img/hello-world-with-netlify.png "Hello world with Netlify")

