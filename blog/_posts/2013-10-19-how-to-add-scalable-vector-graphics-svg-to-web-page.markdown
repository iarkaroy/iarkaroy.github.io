---
title: "How to Add Scalable Vector Graphics (SVG) to Web Page"
layout: post
---
Scalable Vector Graphics (SVG) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999. SVG images and their behaviors are defined in XML text files.

If you want to embed your hand-crafted SVG in your web page, you can use any of the methods discussed below.

<br>

## Using `<object>` Tag

If you intend using any advanced SVG features such as CSS and scripting, the HTML5 <object> tag is your best option:

    <object type="image/svg+xml" data="the-image.svg">Your browser does not support SVG.</object>

You can provide fallback text or images within the `object` block.

<br>

## Using `<embed>` Tag

Although it’s similar to `<object>`, `<embed>` never has been and probably never will be part of any HTML or XHTML specification. However, it’s supported by most browsers and is often used to implement Flash plugins.

    <embed type="image/svg+xml" src="the-image.svg" />

<br>

## Using `<iframe>`

Since browsers can render SVG documents in their own right, it’s possible to load images within an `iframe`:

    <iframe src="the-image.svg">Your browser does not support iframes.</iframe>

You can provide fallback text or images within the `iframe` block.

<br>

## Embedding Inline SVG XML

An SVG image can be added as a code island directly within your HTML5 page using outer `<svg>` tags:

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Embedded SVG</title>
        </head>
        <body>
            <h1>Embedded SVG</h1>

            <!-- SVG code -->
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54 51.3" enable-background="new 0 0 54 51.3" xml:space="preserve">
                <path fill="#FFFFFF" d="M48.8,37.8L32.2,9l2.6-4.5L27,0l-7.8,4.5L21.8,9L5.2,37.8H0v9l7.8,4.5l2.6-4.5h33.2l2.6,4.5l7.8-4.5v-9H48.8z M15.6,37.8L27,18l11.4,19.8H15.6z"/>
            </svg>

        </body>
    </html>

<br>

## Using `<img>` Tag

SVGs can be added to your web page like any other image:

    <img src="the-image.svg" />

The usual width, height, alt and other attributes can be added should you require them.

<br>

## Using a CSS Background Image

SVGs can be used as a CSS background for any element:

    #bg-svg {
        background-image: url(the-image.svg);
    }