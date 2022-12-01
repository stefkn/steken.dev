---
slug: "/article/challenges/advent-of-code-22"
series: "Advent of Code"
date: "2022-12-01"
title: "Advent of Code 2022"
subtitle: "Because nothing says Christmas like 25 frustrating coding challenges"
tags: "challenge code puzzles"
published: false
excerpt: Another year goes by, another Advent of Code to be attempted (and probably failed) by me. This year, I'm going to try and make it even less likely I will succeed by using some languages I'm not familiar with.
reading_time: 15
cover_image: "tokyo.jpeg"
cover_image_credit: "stefan nowak"
author_image: "stefan.jpg"
---

Another year goes by, another Advent of Code to be attempted (and probably failed) by me. This year, I'm going to try and make it even less likely I will succeed by using some languages I'm not familiar with, when I feel brave enough.

## #1: Calorie Counting

Things start off pretty chill as they always do. We have a list of lists (basically CSV without the commas, the delimiter is instead a blank newline) and we need to sum the total of each contiguous block and find the greatest value. I'm going to try to do this in Elixir.

To set up, I downloaded my puzzle input from the website and set up my environment so that it was sitting in a UTF-8 encoded `.txt` file in the root directory called `"input.txt"`

```elixir
IO.puts "hello world\n"

# Read the file into memory
{:ok, filecontents} = File.read("input.txt")

IO.inspect filecontents

# Split the ByteString on newline
splitcontents = filecontents |> String.split("\n", trim: false)

IO.inspect splitcontents

# Parse (cast) bytestrings into tuples with ints inside
tupleslist = Enum.map(splitcontents, fn x -> Integer.parse(x) end)

IO.inspect tupleslist

# Grab just the ints from inside each of the tuples
intlist = Enum.map(tupleslist, fn x -> if is_tuple(x), do: elem(x, 0), else: :none end)

IO.inspect intlist
IO.inspect length(intlist)

# Define a recursive function for going through the intlist
defmodule Recursion do
  # Recursive step
  def iterate_through_intlist(intlist, n, result) when n > 0 do
    # Get the nth element
    elem = Enum.fetch(intlist, length(intlist) - n)

    result = case elem do
      {:ok, :none} ->
        # We have reached the end of a sub-list, add a new accumulator on the result
        IO.inspect "===none==="

        [ 0 ] ++ result
      {:ok, x} ->
        # value, add it to the current accumulator
        IO.inspect x

        [ hd(result) + x ]  ++ tl(result)
    end

    IO.inspect result
    IO.puts "\n"

    iterate_through_intlist(intlist, n - 1, result)
  end

  # base case
  def iterate_through_intlist(intlist, 0, result) do
    {:ok, result}
  end
end

{:ok, res} = Recursion.iterate_through_intlist(intlist, length(intlist), [0])

largest = Enum.max(res)
IO.puts "1st largest integer: #{largest}"

# remove the largest
res = res -- [Enum.max(res)]

largest2 = Enum.max(res)
IO.puts "2nd largest integer: #{largest2}"

# remove the 2nd largest
res = res -- [Enum.max(res)]

largest3 = Enum.max(res)
IO.puts "3rd largest integer: #{largest3} "

total = largest + largest2 + largest3
IO.puts "TOTAL: #{total}"

```

I've got to admit, Elixir blew my mind a little, but I got there! I think the key to solving this was cutting the input down into a small toy problem, solving that problem, and then scaling up.

