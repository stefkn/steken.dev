---
slug: "/article/hello"
date: "2020-06-24"
title: "The Great Gatsby Adventure Begins..."
tags: "programming gatsby web"
published: false
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> Here is a quote block. To be or not to be, that is the question.

**THIS IS BIG** wow, such styling. Styles allow us to express things. __What about this__? That was also a style. *Italic Text* is like, slanty text man. Phasellus finibus, ligula quis vestibulum semper, mi dolor pharetra lorem, et tincidunt arcu nibh eu massa. Proin ex elit, ultrices sed nibh quis, faucibus hendrerit elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ultrices dolor at neque accumsan, nec molestie justo rutrum.

Here's a list:

- First thing
- Second thing
- Third thing

But you can also add numbers? [title](https://www.example.com)

1. hello
2. world
3. hamborger

What about a task list?

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

Hey look a table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

```javascript
function loadDogSong() {
    var request = new XMLHttpRequest();
    request.open('GET', "/dogsong.mp3", true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        dogBarkingBuffer = buffer;
      }, onError);
    }
    request.send()
}

function loadAndyTalk(data) {
    context.decodeAudioData(data, function(buffer) {
        andyTalkBuffer = buffer;
      }, onError);
}
```

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Here's a sentence with a footnote. [^1]

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

[^1]: This is the footnote. ~~The world is flat.~~

---

term
: definition