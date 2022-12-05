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
cover_image: "DSC02931.jpeg"
cover_image_credit: "stefan nowak"
author_image: "stefan.jpg"
---

Another year goes by, another Advent of Code to be attempted (and probably failed) by me. This year, I'm going to try and make it even less likely I will succeed by using some languages I'm not familiar with, when I feel brave enough.

## #1: Calorie Counting

Things start off pretty chill as they always do. We have a list of lists (basically CSV without the commas and newlines instead, the delimiter between sub-lists is a blank newline) and we need to sum the total of each contiguous block and find the greatest value. We then need to find the largest, 2nd largest, 3rd largest and the sum of those three in the second part. I'm going to try to do this in Elixir.

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

I've got to admit, Elixir blew my mind a little, but I got there! I think the key to solving this was cutting the input down into a small toy problem, solving that problem, and then scaling up. Wrapping my head around the recusrion was also a challenge. Otherwsie, barring some confusion with Elixir's syntax, I feel like I'm getting the hang of it.

## 2: Rock Paper Scissors

We have an input, again delimited by newlines, which associates `{A,B,C} -> {X,Y,Z}` such that set 1 describes what the opponent plays and set 2 describes what hand you play in, like, a billion (actually 2500) rounds of Rock, Paper, Scissors. The total score is calculated based on the hand you play (y tho?), and the outcome of the round. Find the total score of all rounds described in the input.

This sounds like a job for maps! or dictionaries. or associative arrays. Key-value pairs? Lookup tables. `HashMap`. Hash table? *Tomayto, tomato, tohmahtoe.*

```elixir
# define atoms
_a = :A
_b = :B
_c = :C
_x = :X
_y = :Y
_z = :Z
_w = :win
_l = :loss
_d = :draw

# encode all possible game outcomes in a map
game_map = %{
  {:A, :X} => :draw,
  {:A, :Y} => :win,
  {:A, :Z} => :loss,
  {:B, :X} => :loss,
  {:B, :Y} => :draw,
  {:B, :Z} => :win,
  {:C, :X} => :win,
  {:C, :Y} => :loss,
  {:C, :Z} => :draw,
}

# encode the points system in another map
points_map = %{
  :X => 1,
  :Y => 2,
  :Z => 3,
  :win => 6,
  :loss => 0,
  :draw => 3,
}

# Read the file into memory
{:ok, filecontents} = File.read("input2.txt")

# Split input into list of strings on newline
splitcontents = filecontents |> String.split("\n", trim: true)

# Parse (cast) bytestrings into tuples with atoms inside -- this step will fail if you pass anything in that isn't a binary (beware some bitstrings can be valid, but not valid binaries, e.g. <<3::4>>) as it uses to_existing_atom
tupleslist = Enum.map(
  splitcontents,
  fn
    x -> {
      String.to_existing_atom(String.at(x,0)),
      String.to_existing_atom(String.at(x,2))
    }
  end
)

# Define a recursive function to assign outcomes to the list
defmodule Recursion do
  # Recursive step
  def iterate_through_games(tupleslist, n, result, game_map, points_map) when n > 0 do
    # Get the nth element
    {:ok, elem} = Enum.fetch(tupleslist, length(tupleslist) - n)

    IO.inspect elem
    {x, y} = elem

    # points gained from the hand you played
    IO.inspect points_map[y]

    # the result of the game
    IO.inspect game_map[elem]

    # points gained from the result of the game
    IO.inspect points_map[game_map[elem]]

    # total points
    IO.inspect points_map[y] + points_map[game_map[elem]]

    # accumulate result
    result = result + points_map[y] + points_map[game_map[elem]]

    # recursion again!
    iterate_through_games(tupleslist, n - 1, result, game_map, points_map)
  end

  # base case
  def iterate_through_games(tupleslist, 0, result, game_map, points_map) do
    {:ok, result}
  end
end

{:ok, res} = Recursion.iterate_through_games(tupleslist, length(tupleslist), 0, game_map, points_map)

IO.inspect res
```

This one felt like it was a similar difficulty to the last, but, I feel like I know Elixir better now. The trickiest bit with this one was a problem I was having with converting strings to atoms. `String.to_existing_atom()` works great, but was giving me errors when I tried to use it.

```
** (ArgumentError) errors were found at the given arguments:

  * 1st argument: not a binary

    :erlang.binary_to_existing_atom(nil, :utf8)
    main.exs:53: anonymous fn/1 in :elixir_compiler_0.__FILE__/1
    (elixir 1.12.2) lib/enum.ex:1582: Enum."-map/2-lists^map/1-0-"/2
    (elixir 1.12.2) lib/enum.ex:1582: Enum."-map/2-lists^map/1-0-"/2
    main.exs:49: (file)
exit status 1
```

Not a binary? I thought we were working with strings? This sent me down a rabbit-hole of trying to figure out what type `String.at()` returns (it's a bitstring, *"a contiguous sequence of bits in memory."*) and if it could ever **not** be a binary (strings in Elixir are binary-encoded UTF-8) and since *"a binary is a bitstring where the number of bits is divisible by 8"* I was shocked to learn that that means that **every binary is a bitstring, but not every bitstring is a binary.** Brain... hurting...

Not to worry, the issue was actually much simpler. The clue was in the error. `:erlang.binary_to_existing_atom(nil, :utf8)` this is Elixir calling an underlying Erlang function. More specifically, this is Elixir trying to call `binary_to_existing_atom` on `nil`, saying it's encoded in UTF-8. Which is obviously not gonna fly. Someone is passing `nil`s to my function...

As it turns out, I just need to trim my split.

```elixir
# bad, we don't want any nils
splitcontents = filecontents |> String.split("\n", trim: false)

# much better thank you
splitcontents = filecontents |> String.split("\n", trim: true)
```

Part two switched things up – turns out set 2 doesn't describe the hand you play, it describes the outcome of the game. Now, to calculate the total score, we need to shuffle things around a bit. I created a new map, `game_map_2`, which captured this new information. I then added a `case` block in the recursive step that figures out which hand you need to play to get the desired outcome. Lookup the point value of that hand, and you've got the answer!

```elixir
# encode all possible game outcomes in a map
game_map_2 = %{
  {:A, :X} => :loss,
  {:A, :Y} => :draw,
  {:A, :Z} => :win,
  {:B, :X} => :loss,
  {:B, :Y} => :draw,
  {:B, :Z} => :win,
  {:C, :X} => :loss,
  {:C, :Y} => :draw,
  {:C, :Z} => :win,
}

# encode the points system in another map -- keeping this as it's still valid
points_map = %{
  :X => 1,
  :Y => 2,
  :Z => 3,
  :win => 6,
  :loss => 0,
  :draw => 3,
}

# Read the file into memory
{:ok, filecontents} = File.read("input2.txt")

# Split input into list of strings on newline
splitcontents = filecontents |> String.split("\n", trim: true)

# Parse (cast) bytestrings into tuples with atoms inside -- this step will fail if you pass anything in that isn't a binary (beware some bitstrings can be valid, but not valid binaries, e.g. <<3::4>>) as it uses to_existing_atom
tupleslist = Enum.map(
  splitcontents,
  fn
    x -> {
      String.to_existing_atom(String.at(x,0)),
      String.to_existing_atom(String.at(x,2))
    }
  end
)

# Define a recursive function to assign outcomes to the list
defmodule Recursion do
  # Recursive step
  def iterate_through_games(tupleslist, n, result, game_map, points_map) when n > 0 do
    # Get the nth element
    {:ok, elem} = Enum.fetch(tupleslist, length(tupleslist) - n)

    IO.inspect elem
    {x, y} = elem

    # the result of the game
    IO.inspect game_map[elem]

    # points gained from the result of the game
    IO.inspect points_map[game_map[elem]]

    # the hand the oppponent played
    IO.inspect x

    # the hand we need to play
    hand = case elem do
      {:A, :X} -> :Z
      {:A, :Y} -> :X
      {:A, :Z} -> :Y
      {:B, :X} -> :X
      {:B, :Y} -> :Y
      {:B, :Z} -> :Z
      {:C, :X} -> :Y
      {:C, :Y} -> :Z
      {:C, :Z} -> :X
    end
    IO.inspect hand

    # the points we get from the hand we played
    IO.inspect points_map[hand]

    # accumulate result
    result = result + points_map[game_map[elem]] + points_map[hand]

    # recursion again!
    iterate_through_games(tupleslist, n - 1, result, game_map, points_map)
  end

  # base case
  def iterate_through_games(tupleslist, 0, result, game_map, points_map) do
    {:ok, result}
  end
end

{:ok, res} = Recursion.iterate_through_games(tupleslist, length(tupleslist), 0, game_map_2, points_map)

IO.inspect res
```

Definitely not the most elegant way to solve it, but I'm not trying to win points for style here!

## #3: Rucksack Reorganization

This one also went pretty smoothly – we're given another bunch of alphabetical, case-sensitive strings where we need to check for duplicated characters in the first and second half of each string.

What helped me solve this much more quickly was my discovery of the `MapSet`, which meant I didn't need to write my own comparison algorithm from scratch and that I could just call `MapSet.intersection()` to get the elements in both compartments of the backpack. So convenient!

```elixir
# encode the list of all atoms in a tuple
priorities = Enum.with_index(
  [:a,:b,:c,:d,:e,:f,:g,:h,:i,:j,:k,:l,:m,:n,:o,:p,:q,:r,:s,:t,:u,:v,:w,:x,:y,:z,
  :A,:B,:C,:D,:E,:F,:G,:H,:I,:J,:K,:L,:M,:N,:O,:P,:Q,:R,:S,:T,:U,:V,:W,:X,:Y,:Z]
)

# Read the file into memory
{:ok, filecontents} = File.read("input3.txt")

# Split input into list of strings on newline
splitcontents = filecontents |> String.split("\n", trim: true)

# take each line (each backpack contents) and split into tuples of MapSets for each backpack
defmodule Recursion do
  # Recursive step
  def iterate_through_backpacks(tupleslist, n, result, priorities) when n > 0 do
    # Get the nth element
    {:ok, elem} = Enum.fetch(tupleslist, length(tupleslist) - n)

    tuple = {
      MapSet.new(
        String.graphemes(
          String.slice(elem, 0, div(String.length(elem), 2))
        )
      ),
      MapSet.new(
        String.graphemes(
          String.slice(elem, div(String.length(elem), 2), String.length(elem))
        )
      )
    }

    # Get the intersection of the two compartments of the backpack
    intersection = MapSet.intersection(
      elem(tuple,0), elem(tuple,1)
    )

    IO.inspect MapSet.to_list(intersection)

    # get the priority from our list
    duplicateitem = String.to_existing_atom(hd(MapSet.to_list(intersection)))

    IO.inspect duplicateitem

    # find the matching priority in the priorities list
    {atom, priority} = Enum.find(
      priorities, fn(element) ->
        match?({^duplicateitem, priority}, element)
      end
    )

    # Accumulate the result... remember, the priority is one less than the acutal priority because it is zero indexed! so we add one here.
    result = result + priority + 1

    iterate_through_backpacks(tupleslist, n - 1, result, priorities)
  end

  # base case
  def iterate_through_backpacks(tupleslist, 0, result, priorities) do
    {:ok, result}
  end
end

{:ok, res} = Recursion.iterate_through_backpacks(splitcontents, length(splitcontents), 0, priorities)

IO.inspect res
```

For part two, it was just a matter of rewriting it a bit so that instead of comparing the two halves of each string, we were making MapSets and comparing every three whole strings instead.

```elixir
# encode the list of all atoms in a tuple
priorities = Enum.with_index([:a,:b,:c,:d,:e,:f,:g,:h,:i,:j,:k,:l,:m,:n,:o,:p,:q,:r,:s,:t,:u,:v,:w,:x,:y,:z, :A,:B,:C,:D,:E,:F,:G,:H,:I,:J,:K,:L,:M,:N,:O,:P,:Q,:R,:S,:T,:U,:V,:W,:X,:Y,:Z])

# Read the file into memory
{:ok, filecontents} = File.read("input3.txt")

# Split input into list of strings on newline
splitcontents = filecontents |> String.split("\n", trim: true)

# take each line (each backpack contents) and split into tuples of MapSets for each backpack
defmodule Recursion do
  # Recursive step
  def iterate_through_backpacks(tupleslist, n, result, priorities) when n > 0 do
    # Get the group's backpacks
    {:ok, elem1} = Enum.fetch(tupleslist, length(tupleslist) - n)
    {:ok, elem2} = Enum.fetch(tupleslist, length(tupleslist) - n + 1)
    {:ok, elem3} = Enum.fetch(tupleslist, length(tupleslist) - n + 2)

    IO.puts "================"
    IO.inspect elem1
    IO.inspect elem2
    IO.inspect elem3

    elem1 = MapSet.new(
      String.graphemes(
        elem1
      )
    )

    elem2 = MapSet.new(
      String.graphemes(
        elem2
      )
    )

    elem3 = MapSet.new(
      String.graphemes(
        elem3
      )
    )

    # Get the intersection of all the groups backpacks
    intersection = MapSet.intersection(
      MapSet.intersection(
        elem1, elem2
      ), elem3
    )

    # get the priority from our list
    duplicateitem = String.to_existing_atom(hd(MapSet.to_list(intersection)))

    # find the matching priority in the priorities list
    {atom, priority} = Enum.find(
      priorities, fn(element) ->
        match?({^duplicateitem, priority}, element)
      end
    )

    # Accumulate the result... remember, the priority is one less than the acutal priority because it is zero indexed! so we add one here.
    result = result + priority + 1

    iterate_through_backpacks(tupleslist, n - 3, result, priorities)
  end

  # base case
  def iterate_through_backpacks(tupleslist, 0, result, priorities) do
    {:ok, result}
  end
end

{:ok, res} = Recursion.iterate_through_backpacks(splitcontents, length(splitcontents), 0, priorities)

IO.inspect res
```

## #4: Camp Cleanup

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

