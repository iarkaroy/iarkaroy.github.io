---
title: "Drop Cap Letters in CSS"
layout: post
---
Drop Cap is a traditional newspaper technique of making the first letter of a paragraph capital and take the height of three or four lines. In that way, it is easier to grab the attention of the reader and specify the start of a section.

Now we are going to implement that style in our css using a new CSS3 technique.

## CSS First Letter

CSS allows you to add a property `:first-letter` which as you can guess allows you to style the first letter of the element.

Consider this paragraph:

    <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Ut in metus nec mauris egestas laoreet. Integer vehicula velit non massa suscipit at porta sem commodo. Donec nibh lectus, vulputate a aliquet quis, sollicitudin eget metus. Nullam quis tellus nibh. Praesent fermentum risus sit amet turpis eleifend dapibus. Duis tellus leo, tempor sit amet ultricies viverra, mollis at quam. Suspendisse hendrerit sagittis risus nec faucibus. Nam urna magna, porta vitae tincidunt sit amet, blandit eget diam. Vivamus a ornare augue. Vivamus sapien sem, facilisis vitae molestie eget, tempus ut augue. Sed suscipit facilisis mi, eu laoreet est gravida eu. Nulla et arcu quam, pellentesque adipiscing felis. Nam pretium augue sed sapien malesuada tempor. Nulla facilisi. Donec eu tempor mi.</p>

We can add the drop cap style to the paragraph using `:first-letter`

    p:first-letter {
        display:block;
        float:left;
        font-family:inherit;
        font-size: 360%;
        font-weight: bold;
        line-height: 85%;
        margin-right: 8px;
        margin-top: 5px;
    }

This css will stylize the first letter exactly how we want.