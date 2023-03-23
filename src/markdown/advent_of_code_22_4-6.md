---
slug: "/article/challenges/advent-of-code-22/4-6"
series: "Advent of Code 4-6"
date: "2022-12-01"
title: "Advent of Code 2022; Days 4-6"
subtitle: "Because nothing says Christmas like 25 frustrating coding challenges"
tags: "challenge code puzzles"
published: true
excerpt: The next 3 challenges in Advent of Code. Things begin to get a little more complicated...
reading_time: 25
cover_image: "DSC02931.jpeg"
cover_image_credit: "stefan nowak"
author_image: "stefan.jpg"
---

# Day 4: Camp Cleanup

This sounded deceptively easy. It wasn't! We're given strings of the format `71-71,42-72` indicating ranges of sections that pairs of elves have been assigned to clean. We need to figure out how many pairs are assigned such that one of the pair is a complete subset of the other (contained entirely by the other range). `MapSet` also came in very handy here.

```elixir
# Read the file into memory
{:ok, filecontents} = File.read("input4.txt")

# Split input into list of strings on newline "71-71,42-72"
splitcontents = filecontents |> String.split("\n", trim: true)

# Split each string on the comma to make lists of each pair [["71-71", "42-72"],]
pairs = Enum.map(splitcontents, fn x -> String.split(x, ",", trim: true) end)

# split integers out into their own strings [[["71", "71"], ["42", "72"]],]
stringlists = Enum.map(pairs, fn [a, b] -> [
  String.split(a, "-",   trim: true),
  String.split(b, "-", trim: true)
] end)

# https://stackoverflow.com/questions/65135280/why-does-for-x-3-4-do-x-3-return-t-f-in-elixir/65136734#65136734
# ['GG', '*H']... looks wrong but lists of integers in the ASCII range (0-127) get represented as charlists, all good
intlists = Enum.map(stringlists, fn [[a, b],[c, d]] -> [
  [ elem(Integer.parse(a), 0), elem(Integer.parse(b), 0) ],
  [ elem(Integer.parse(c), 0), elem(Integer.parse(d), 0) ]
] end)

# [ [#MapSet<[71..71]>, #MapSet<[42..72]>], ...
rangesets = Enum.map(intlists, fn [[a, b],[c, d]] -> [
  MapSet.new(Enum.to_list(a..b)),
  MapSet.new(Enum.to_list(c..d))
] end)

# Check if either MapSet's intersection is wholly equal to either of the MapSets
subsets = Enum.map(rangesets, fn [a, b] ->
  MapSet.equal?(MapSet.intersection(a, b), a)
  ||
  MapSet.equal?(MapSet.intersection(a, b), b)
  ||
  MapSet.equal?(MapSet.intersection(b, a), a)
  ||
  MapSet.equal?(MapSet.intersection(b, a), b)
end)

# Count the trues!
IO.inspect Enum.reduce(subsets, 0, fn x, acc -> if x, do: 1 + acc, else: 0 + acc end)
```

Answering part two (find how many pairs where they have *any* number in common at all) was actually so chill; just use the built in `MapSet.disjoint?()` function to check if either set has any member in common!

```elixir
# ... do all the same stuff up to here

# Check if either MapSet's intersection is wholly equal to either of the MapSets
subsets = Enum.map(rangesets, fn [a, b] ->
  MapSet.disjoint?(a, b)
  &&
  MapSet.disjoint?(b, a)
end)

IO.inspect subsets

# Count the trues!
IO.inspect Enum.reduce(subsets, 0, fn x, acc -> if !x, do: 1 + acc, else: 0 + acc end)
```

# Day 5: Supply Stacks

This one was suuuper tough, but mainly because I didn't think through the problem properly before writing my first line of code! I ended up writing a bunch of parsing logic that was totally unnecessary and taking much longer than I would otherwise have needed. Also this solution is pretty terrible in terms of, like, everything. But hey, got there in the end! It's like they always say, *never don't give up!*

```elixir
# Read the stack input into memory
# We've removed the redundant index row at the end (row 9) and split the input into two files for easier parsing
{:ok, filecontents} = File.read("input5_1.txt")

# Split input into list of strings on newline "[Q] [J] [D] [M]     [Z] [C] [M] [F]"
splitcontents = filecontents |> String.split("\n", trim: true)

# Split strings into lists of smaller strings ["[Q]", "[J]", "[D]", "[M]", "", "", "", "", "[Z]", "[C]", "[M]", "[F]"],
splitcontents = Enum.map(
  splitcontents, fn x -> String.split(x, " ", trim: false)
end)

# replace the series of empty strings with correct number of spaces to retain sequence info -- four consecutive ""s equals one empty space in the stack
defmodule Recursion do
  # Recursive step
  def iterate_through_stackinput(tupleslist, n, result) when n > 0 do
    # Get the nth element
    current = length(tupleslist) - n
    {:ok, elem1} = Enum.fetch(tupleslist, current)

    # if the element is the empty string, and there's at least 3 more elements in front to check, check if they are all also the empty string -- if they are, skip forwards by 4 and replace by a single ""
    if length(tupleslist) > current + 3 do
      {:ok, elem2} = Enum.fetch(tupleslist, current + 1)
      {:ok, elem3} = Enum.fetch(tupleslist, current + 2)
      {:ok, elem4} = Enum.fetch(tupleslist, current + 3)
      # IO.inspect elem2
      # IO.inspect elem3
      # IO.inspect elem4

      # replacing all sequences of four spaces turned out to be unnecessary -- we're dealing with stacks so emptiness at the top can be totally disregarded with no loss of information. oh well, still gonna leave it here.
      if ["", "", "", ""] === [elem1, elem2, elem3, elem4] do
        result = result ++ [""]

        if length(tupleslist) > current + 3 do
          iterate_through_stackinput(tupleslist, n - 4, result)
        else
          iterate_through_stackinput(tupleslist, n - 1, result)
        end
      else
        result = result ++ [elem1]
        iterate_through_stackinput(tupleslist, n - 1, result)
      end
    else
      result = result ++ [elem1]
      iterate_through_stackinput(tupleslist, n - 1, result)
    end
  end

  # base case
  def iterate_through_stackinput(tupleslist, 0, result) do
    {:ok, result}
  end
end

splitcontents = Enum.map(
  splitcontents,
  fn x ->
    elem(
      Recursion.iterate_through_stackinput(x, length(x), []),
    1)
end)

# Now splitcontents looks like:
# [
#   ["[T]", "", "[Q]", "", "", "", "[S]", "", ""],
#   ["[R]", "", "[M]", "", "", "", "[L]", "[V]", "[G]"],
#   ["[D]", "[V]", "[V]", "", "", "", "[Q]", "[N]", "[C]"],
#   ["[H]", "[T]", "[S]", "[C]", "", "", "[V]", "[D]", "[Z]"],
#   ["[Q]", "[J]", "[D]", "[M]", "", "[Z]", "[C]", "[M]", "[F]"],
#   ["[N]", "[B]", "[H]", "[N]", "[B]", "[W]", "[N]", "[J]", "[M]"],
#   ["[P]", "[G]", "[R]", "[Z]", "[Z]", "[C]", "[Z]", "[G]", "[P]"],
#   ["[B]", "[W]", "[N]", "[P]", "[D]", "[V]", "[G]", "[L]", "[T]"]
# ]
# We still need to "transpose" this as each list doesn't yet repesent each stack

# Thanks to https://elixirforum.com/t/transpose-a-list-of-lists-using-list-comprehension/17638/2
defmodule Transp do
  def transpose([[] | _]), do: []
  def transpose(m) do
    [Enum.map(m, &hd/1) | transpose(Enum.map(m, &tl/1))]
  end
end

stacks = Transp.transpose(splitcontents)

# Now things looks like, stacks are represented accurately:
# [
#   ["[T]", "[R]", "[D]", "[H]", "[Q]", "[N]", "[P]", "[B]"],
#   ["", "", "[V]", "[T]", "[J]", "[B]", "[G]", "[W]"],
#   ["[Q]", "[M]", "[V]", "[S]", "[D]", "[H]", "[R]", "[N]"],
#   ["", "", "", "[C]", "[M]", "[N]", "[Z]", "[P]"],
#   ["", "", "", "", "", "[B]", "[Z]", "[D]"],
#   ["", "", "", "", "[Z]", "[W]", "[C]", "[V]"],
#   ["[S]", "[L]", "[Q]", "[V]", "[C]", "[N]", "[Z]", "[G]"],
#   ["", "[V]", "[N]", "[D]", "[M]", "[J]", "[G]", "[L]"],
#   ["", "[G]", "[C]", "[Z]", "[F]", "[M]", "[P]", "[T]"]
# ]
# Nice!

# Remove all empty strings -- see comment above lol
stacks = Enum.map(
  stacks,
  fn x -> Enum.filter(
    x, fn x -> x !== "" end
  ) end
)

# Now let's parse the instructions

# Read the stack input into memory
{:ok, filecontents2} = File.read("input5_2.txt")

# Split input into list of strings on newline "move 5 from 4 to 9"
splitcontents2 = filecontents2 |> String.split("\n", trim: true)

# lets parse strings into tuples
splitcontents2 = Enum.map(
  splitcontents2, fn x -> String.split(x, " ", trim: true)
end)

# lets parse tuples into maps %{from: "4", num: "5", to: "9"}
instructions = Enum.map(
  splitcontents2, fn [move, movnum, from, fromnum, to, tonum] ->
    %{num: movnum, from: fromnum, to: tonum}
end)

# Everything is parsed! Now lets play the instructions on our stacks
defmodule Recursion2 do
  # Recursive step
  def apply_instructions(inslist, n, result, stacks) when n > 0 do
    # Get the nth element
    current = length(inslist) - n
    {:ok, i} = Enum.fetch(inslist, current)

    IO.inspect i

    fromstackindex = elem(Integer.parse(i.from), 0) - 1
    tostackindex = elem(Integer.parse(i.to), 0) - 1

    {:ok, fromstack} = Enum.fetch(result, fromstackindex)
    {:ok, tostack} = Enum.fetch(result, tostackindex)

    IO.inspect fromstack
    IO.inspect tostack

    {newfromstack, newtostack} = Enum.reduce(
      0..elem(Integer.parse(i.num), 0)-1,
      {fromstack, tostack},
      fn(x, acc) ->
        if elem(acc, 0) === [] do
          {
            [],
            elem(acc, 1),
          }
        else
          {
            tl(elem(acc, 0)),
            [hd(elem(acc, 0)) | elem(acc, 1)],
          }
        end
      end
    )

    IO.inspect newfromstack
    IO.inspect newtostack

    result = List.replace_at(result, fromstackindex, newfromstack)
    result = List.replace_at(result, tostackindex, newtostack)

    # IO.inspect result

    apply_instructions(inslist, n - 1, result, stacks)
  end

  # base case
  def apply_instructions(inslist, 0, result, stacks) do
    {:ok, result}
  end
end

{:ok, res} = Recursion2.apply_instructions(instructions, length(instructions),
stacks, stacks)

IO.inspect res
```

Part two was mercifully easier, I just replaced the `Enum.reduce()` block above with some list slicey-dicey stuff.

```elixir
{newfromstack, newtostack} = {
  Enum.take(fromstack, - length(fromstack) + elem(Integer.parse(i.num), 0)),
  Enum.take(fromstack, elem(Integer.parse(i.num), 0)) ++
  tostack
}
```

# Day 6: Tuning Trouble

I'm very happy with how this one went. It's not the most optimal (it compares every element in the `currentchars` list each time) but it's pretty short and sweet, and can be configured to look for a marker of any reasonable length. Hooray for reusability!

```elixir
# Read the stack input into memory
{:ok, filecontents} = File.read("input6.txt")

# split the one massive long string into a list of graphemes (chars)
graphemes = String.graphemes(filecontents)

n = 50000 # how long to compare for, just make this larger than the input string length
uniquelength = 4 # how long the unique string has to be

chars_until_marker = Enum.flat_map_reduce(
  graphemes, [],
  fn x, acc ->
    if length(acc) > uniquelength - 1 && length(acc) < n do
      # grab the last 0-uniquelength chars to check against
      currentchars = Enum.map(Enum.to_list(0..uniquelength - 1), fn x -> Enum.at(acc, x) end)
      # if they are all unique, halt and return, otherwise add the latest on to the accumulator and keep going
      if length(Enum.uniq(currentchars)) === uniquelength do
        {:halt, acc}
      else
        {[x], [x] ++ acc}
      end
    else
      # keep going, we don't have enough to compare against yet
      if length(acc) < n, do: {[x], [x] ++ acc}, else: {:halt, acc}
    end
  end
)

IO.inspect length(elem(chars_until_marker,1)) # the length of the string we get back is our answer!
```

## Helpful websites!

These sites helped me wrap my head around Elixir while doing these challanges; couldn't have done it without them!

- [Elixir School](https://elixirschool.com/en/lessons)
- [Visual Elixir Reference](https://superruzafa.github.io/visual-elixir-reference//)
- [Elixir Examples](https://elixir-examples.github.io/)

