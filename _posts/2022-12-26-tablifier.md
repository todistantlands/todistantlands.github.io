---
layout: post
title: "Behold: The Tablifier"
share: true
---
{%- include tablifier.html -%}
Ok ok so:

1. Something old
1. Something new
1. Something borrowed
1. Something blue
	- The bass
	- The rock
	- The mic
	- The treble
{: .random-table}

Click the "pull" button. Try it a few times.

Big whoop, you say, you've seen it before. [Michael Raston does like 17 of these per post.](http://lizardmandiaries.blogspot.com/) And you're right! It's just a lil button.

But what if I told you, that this is the entirety of the code it took to go from that table to that button:

```
{% raw %}{%- include tablifier.html -%}{% endraw %}
Ok ok so:

1. Something old
1. Something new
1. Something borrowed
1. Something blue
	- The bass
	- The rock
	- The mic
	- The treble
{: .random table}
```

## Just get to the point
The Tablifier is a small JavaScript utility you can import into any blog post or web page and, with almost zero effort, created automated generators from plaintext tables. It should play nice with markdown, Blogger, Wordpress, and basically anything else that spits out HTML-formatted lists. You can stick this into any existing post with a numbered or bulleted list and have a functional automated table in seconds.

The rest of this post explains how the Tablifier works and how to get it running in your own blog posts and webpages, followed by a few notes on its limits and future plans. The Tablifier is open-source, open use, whatever. It's for you to use. Have fun with it.

## How does it work?
The Tablifier...
1. Waits for your page to finish loading.
2. Scans the page for any lists tagged with the `.random-table` class property.
3. Stick a "pull" button underneath each list.

It can handle ordered (numbered / lettered) or unordered (bullet) lists, and it can handle nested lists with pretty much no limit.

## How do I use it?
It's extremely easy. Two steps!

### Step 1: Embed the script in your page.
First, you need to copy/paste the following script somewhere into your post:
```
<script>
	class Table {
		static separator = ": ";
		
		constructor(list, name = false) {
			this.name = name;
			this.list = this.populateList(list); //nodeList
		}

		populateList(list) {
			let node = list;
			let arr = false;
			if (["UL","OL"].includes(node.tagName)) {
				arr = [];
				for (let x of node.children) {
					if (x.children.length == 0) {
						arr.push(x.innerHTML);
					} else {
						let newName = false;
						if (x.tagName == "LI") {
							newName = x.innerHTML.replace(/\s/g, " ").match(/(.+)?(<ul>|<ol>)/im)[1].trim();
						}
						arr.push(new Table(x.querySelector("ul,ol"),newName));
					}
				}
			}
			return arr;
		}

		pull() {
			let len = this.list.length;
			let list = this.list;
			let e = list[Math.floor(Math.random() * len)];
			if (e instanceof Table) {
				return ("" + ((e.name && e.name + Table.separator )|| "") + e.pull());
			} else return e;
		}
	}

	const Tables = {
		count:0
	};

	window.onload = (event) => {
		document.querySelectorAll(".random-table").forEach(
			function(node) {
				let id;
				if (!node.id) {
					node.id = "_UNASSIGNED_"+(++Tables.count);
				}
				id = node.id;
				Tables[id] = new Table(node);
				Tables[id]._button = `
					<p>
					<button onclick="document.getElementById('${id}_readout').innerHTML = Tables['${id}'].pull();">Pull</button> 
					<span id="${id}_readout"></span>
					</p>`;
				document.getElementById(id).outerHTML += Tables[id]._button;
			}
		);
	};
</script>
```
*(Note: I am not a computer scientist. I have no formal training in web design. I am 100% self-taught. A friend once told me my code has a distinctive "accent". I make no apologies for my accent, or any jank in the above; it works.)*

How you import the script will depend a little bit on your specific workflow. Mine, for instance, is set up in such a way that I can rapidly import the whole thing using the tag `{% raw %}{%- include tablifier.html -%}{% endraw %}`. My workflow is also fairly idiosyncratic. If you're using Blogger or WordPress, the easiest option will be to put your editor in HTML mode. Here are links on how to do that:
- [Editing HTML in WordPress](https://wordpress.com/support/editors/#edit-html-in-the-word-press-editor)
- [Editing HTML in Blogger](https://support.google.com/blogger/thread/50045059/how-can-i-edit-as-html-in-the-new-blogger-interface?hl=en)

Once you're in HTML view, just paste the script somewhere into the document. Put it somewhere where it won't be get in your way, like the very end of the post. Note that anything between `<script>` tags won't be visible in the final post, so don't worry about it looking ugly on your page.

If you're not using Blogger or WordPress, you probably know better than I do how to insert JavaScript into one of your pages. Mind the `<script>` tags in the blob above.

### Step 2: Add class tags
This part might be a little tricky for those not familiar with HTML, but I promise it's not too hard. Each list you want to automate needs to include a bit of code that tells the Tablifier to give it a button. The Tablifier does this by checking the list's HTML to see if it has the `class = "random-table"` property. Here's how you give it that property, first for HTML users (if you're using Blogger or WordPress, that's you), and then in certain Markdown environments.

I said this takes seconds. If you're new to HTML, it might take a few minutes the first few times -- but rest assured the Tablifier was created for users without any prior experience. This should still be pretty easy.

#### In HTML
Let's say wrote out your list in Blogger. In Blogger's editor, it looks like this:

![bloggerscrn1.png](/img/bloggerscrn1.png)

In HTML, every list is designated by a `<ol>` or `<ul>` tag (for "ordered list" or "unordered list"). A tag also include any number of addition properties. What we want to do is find the tag designating our list and add a property. When you switch Blogger to the HTML view, you'll see something like this:

![bloggerscrn2.png](/img/bloggerscrn2.png)

This may look like a lot, but we only need to find one thing: *The first* `<ul>` *or* `<ol>` *tag after "Here's my list"*. There it is!

![bloggerscrn3.png](/img/bloggerscrn3.png)

Blogger's added a weird and mostly redudant styling property. We can ignore that. Afterward, but still inside the tag (before the `>`), let's add `class="random-table"`. Maybe sure to include it exactly as written there, with the quotation marks and the hyphen in `random-table`. That leaves us with this:

![bloggerscrn4.png](/img/bloggerscrn4.png)

Note that Blogger's Preview feature does a lot of weird stuff to posts. If you've ever tried to click a link in a post preview, you've noticed it doesn't work. The "Pull" button won't work in Blogger's preview mode either, though it should appear.

I don't use WordPress so I can't show you exactly what it would look like, but the principles are the same:
1. Find the `<ul>` or `<ol>` tag belonging to your list.
2. Add a `class="random-table"` property inside the tag.

#### In Markdown
Again, if you're writing posts in Markdown chances are you know your workflow better than I do, so I can only provide a few tips. If you aren't writing your posts in Markdown or don't know what Markdown is, you can safely skip this section.

First, some versions of Markdown (like [kramdown](https://kramdown.gettalong.org/), which my blog uses) allow you to designate CSS properties in-line. In kramdown, you can apply the `random-table` class in-line like this: `{: .random-table}`. It's worth checking if whatever you use to convert Markdown to HTML for your blog has similar functionality.

If it doesn't, you need to get at the content after it's been converted to HTML and manually add the `class="random-table"` property as described above.

### Note on multiple tables
You only need to give the `class="random-table"` property to the highest-level tag for each list.  Nested lists will be handled along with their parent list. However, if you have two or more *separate, non-nested* lists, each one will need the `class="random-table"` property. If you're new to HTML, finding the correct tags might take some trial and error.

## What are its limits?
Right now the Tablifier is pretty basic. It can't do weighted lists, and nested tables are each specific to one result. That means if you wanted a result that combines, say, a letter from A to C and a number from 1 to 3, you'd have to do it like this:

- A
	- 1
	- 2
	- 3
- B
	- 1
	- 2
	- 3
- C
	- 1
	- 2
	- 3
{: .random-table #abc123}

In the near future, I'd like to give it a little more configurability, including more fine-grained control over where buttons appear and what they say. I'd also like to provide some dials for how it renders outputs from nested lists.

I'd also like to find a way to host the code in such a way that people could import it using a `<script src>` call or something easy like that. I feel like that involves some significant overhead to do securely though, and I'm not exactly versed in that stuff, so the copy/paste method will have to do for now. Maybe a github repository for it? I don't know.

Finally, I'd like to make it a bit more robust and user-friendly, especially for people who don't usually use HTML. I'm thinking I could teach it how to look for a list inside a classed `<div>` tag, which might be a little easier than digging around for the right list tag.

## I want to use it now
Good! Use it! You have what you need.

You're welcome to fiddle around with the code, experiment, iterate, etc. I would appreciate a link back to this page if you find it handy. :)