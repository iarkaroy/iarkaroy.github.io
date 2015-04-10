---
title: "How to use Zaq: Codeigniter Template Parser Engine"
layout: post
---
Zaq is a PHP based template parser engine developed to work with Codeigniter. This library has been developed for developers to integrate php codes in views easily. Using this library will also allow the view file to be more readable. View files in Codeigniter (or in any other framework following MVC) always contains both html and php codes which make them a bit harder to read. This problem can be eradicated by using a parser engine which makes the view files a lot more easier to work with.

Codeigniter, by default, comes with an optional template parser. But, unfortunately, that one does not provide sufficient pseudo markup to work with. Zaq, without doubt, is able to provide much more flexibility while building view files with pseudo markup to replace php codes.

Let's take a look at Zaq's insight and usage.

<br>

## Installation

1. [**Download Zaq**](https://github.com/iarkaroy/Zaq-Codeigniter-Template-Parser/archive/master.zip)

2. Copy `libraries/Zaq.php` to your `application/libraries/` folder

3. Copy `config/zaq.php` to your `application/config/` folder.

4. Create the folder if not exists: `application/cache`

5. Set `application/cache` writable.

<br>

## Initialization

Like other libraries in CodeIgniter, the Zaq library class is initialized in your controller using the `$this->load->library()` method:

    $this->load->library('zaq');

Or you can autoload the library in `autoload.php`

Once loaded, the Zaq library object will be available using: `$this->zaq`

<br>

## Parsing Views/Templates

You can use the `parse()` method to parse (or render) your views or templates. The syntax is:

    $this->zaq->parse( $view, $data = array(), $return = FALSE );

The first parameter contains the name of the view file, the second parameter contains an associative array of data to be made available in the template, and the third parameter specify whether to return the parsed string.

Example:

    $data = array(
        'products' => array(
            array( 'title' => 'Shirts', 'link' => '/shirts' ),
            array( 'title' => 'Trousers', 'link' => '/trousers' ),
            array( 'title' => 'Shoes', 'link' => '/shoes' ),
            array( 'title' => 'Belts', 'link' => '/belts' ),
        ),
    );

    $this->zaq->parse( 'products/list', $data );

There is no need to “echo” or do something with the data returned by `$this->zaq->parse()`. It is automatically passed to the output class to be sent to the browser. However, if you do want the data returned instead of sent to the output class you can pass TRUE (boolean) as the third parameter:

    $string = $this->zaq->parse('products/list', $data, TRUE);

<br>

## Pseudo Markup

The pseudo markup of Zaq is much more cleaner than its equivalent php code. It enhance the readability and maintainability of the code. Designer will also be cheerful to work with a cleaner file.

<br>

#### **foreach:**

From the above example, we are creating a template file at `products/list.php`:

    <ul>
    {foreach products as product}
        <li><a href="{product[link]}">{product[title]}</a></li>
    {/foreach}
    </ul>

The html output will be:

    <ul>
        <li><a href="/shirts">Shirts</a></li>
        <li><a href="/trousers">Trousers</a></li>
        <li><a href="/shoes">Shoes</a></li>
        <li><a href="/belts">Belts</a></li>
    </ul>

To achieve the same output by php code:

    <ul>
    <?php foreach ( $products as $product ) : ?>
        <li><a href="<?php echo $product['link'] ; ?>"><?php echo $product['title'] ; ?></a></li>
    <?php endforeach ; ?>
    </ul>

Use foreach for associative array

    <ul>
    {foreach options as item = value}
        <li>{item} => {value}</li>
    {/foreach}
    </ul>


<br>

#### **if/elseif/else:**

    {if product[active]}
        ... do something ...
    {elif product[published]}
        ... some other thing ...
    {/if}

<br>

#### **echo:**

All variables and methods will be automatically preceded by `echo`:

    {somevar}
    <?php echo $somevar ; ?>

    {some_array[assoc_key]}
    <?php echo $some_array['assoc_key'] ; ?>

    {another_array[$key]}
    <?php echo $another_array[$key] ; ?>

    {date('Y-m-d H:i:s', now)}
    <?php echo date ( 'Y-m-d H:i:s' , $now ) ; ?>

    {time()}
    <?php echo time ( ) ; ?>

    {fname . lname}
    <?php echo $fname . $lname ; ?>

    {books->get_by_author(author)->first()->title}
    <?php echo $books -> get_by_author( $author ) -> first() -> title ; ?>

<br>

#### **constants:**

To use constants, precede the constant with `#`:

    {if defined('APP_VERSION') && #APP_VERSION > 2.0}
        ... do something ...
    {/if}

<br>

## How Zaq Works

1. Parse template and convert pseudo-markup to valid php code.

2. Store the code in a temporary file in its cache folder (configurable).

3. Load view from the temporary folder.

4. Delete the temporary file (configurable).

<br>

## Configuration

The configuration file, `zaq.php`, should be located in `application/config/`.

There are two configuration settings.

    $config['cache_dir'] = APPPATH . 'cache/zaq';

    $config['enable_cache'] = TRUE;

The `cache_dir` setting tells Zaq where to store the temporary files.

If `enable_cache` setting is set to `TRUE`, Zaq will keep the temporary files and will skip the parsing process next time if the parsed file is newer than the view file.

<br>

## Helper Methods

There are several helper methods to ease the application development a bit more.

<br>

`set_delimiter ( [ $left_delimiter = '{' [ , $right_delimiter = '}' ] ] )`:

Sets the delimiters (opening and closing) for a pseudo-markup “tag” in a template.

Parameters:

* `$left_delimiter` (String) - Left delimiter
* `$right_delimiter` (String) - Right delimiter

Return: void

<br>

`add_exception ( $val )`:

Add exception to list of pseudo-markups.

Parameters:

* `$val` (String) - The string to skip parsing (without delimiters)

Return: void

By default, `elapsed_time` and `memory_usage` have been added to the list of exceptions as these are Codeigniter's default pseudo-markup tag.