---
slug: "/article/hello"
date: "2020-06-24"
title: "The Great Gatsby Adventure Begins..."
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> Here is a quote block. To be or not to be, that is the question.

**THIS IS BIG** wow, such styling. Styles allow us to express things. __What about this__? That was also a style. *Italic Text* is like, slanty text man. Here's a list:

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

Here's what we've all been waiting for

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

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote. ~~The world is flat.~~

---

term
: definition