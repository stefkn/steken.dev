---
slug: "/article/challenges/advent-of-code-22/7-9"
series: "Advent of Code 7-9"
date: "2022-12-01"
title: "Advent of Code 2022; Days 7-9"
subtitle: "Because nothing says Christmas like 25 frustrating coding challenges"
tags: "challenge code puzzles"
published: false
excerpt: Another year goes by, another Advent of Code to be attempted (and probably failed) by me. This year, I'm going to try and make it even less likely I will succeed by using some languages I'm not familiar with.
reading_time: 25
cover_image: "DSC02931.jpeg"
cover_image_credit: "stefan nowak"
author_image: "stefan.jpg"
---

## Day 7: No Space Left On Device

Okay, things are starting to get a bit tricker! We're given a list of terminal commands and their output, and we need to parse them and find the total sizes of directories with a nested structure under a certain size. This sounds like another job for recursion!

```elixir
# Read the stack input into memory, split on newline
{:ok, filecontents} = File.read("input7.txt")
filecontents = filecontents |> String.split("\n", trim: true)

defmodule Recursion do
  # Recursive step
  def parse_all_commands(inslist, n, result) when n > 0 do
    # Get the nth element
    current = length(inslist) - n
    {:ok, i} = Enum.fetch(inslist, current)

    case String.graphemes(i) do
      ["$", " ", "c", "d", " " | tail] ->
        # "$ cd {}"
        dirname = name = Enum.reduce(tail, fn x, acc -> acc <> x end)
        IO.inspect {"cd --- ", dirname}

      ["$", " ", "l", "s"] ->
        # "$ ls {}"
        IO.inspect {"ls ------------------------- "}

      ["d", "i", "r", " " | tail] ->
        # "$ dir {}"
        dirname = name = Enum.reduce(tail, fn x, acc -> acc <> x end)
        IO.inspect {"dir: ", dirname}

      fileandsize ->
        # size, " ", name_of_file
        size = Enum.take_while(
          fileandsize,
          fn x -> x !== " "
        end)
        {sizeint, ""} = Integer.parse(
          Enum.reduce(size, fn x, acc -> acc <> x end)
        )

        name = Enum.take_while(
          Enum.drop(fileandsize, length(size) + 1),
          fn x -> x !== " "
        end)
        name = Enum.reduce(name, fn x, acc -> acc <> x end)

        IO.inspect {"file: ", name, sizeint}
    end

    parse_all_commands(inslist, n - 1, result)
  end

  # base case
  def parse_all_commands(inslist, 0, result) do
    {:ok, result}
  end
end

{:ok, res} = Recursion.parse_all_commands(
  filecontents,
  length(filecontents),
  []
)

IO.inspect res
```

This produces output like:

```
{"cd --- ", "/"}
{"ls ------------------------- "}
{"file: ", "cgc.vzv", 149291}
{"dir: ", "cmcrzdt"}
{"dir: ", "hwdvrrp"}
{"file: ", "hwqvsl", 26925}
{"dir: ", "lsmv"}
{"dir: ", "ngfllcq"}
{"dir: ", "ngnzzmpc"}
{"dir: ", "pwhjps"}
{"dir: ", "rgwnzttf"}
{"file: ", "tcglclw.hsn", 260556}
{"dir: ", "trvznjhb"}
{"dir: ", "wgcqrc"}
{"file: ", "whpnhm", 68873}
{"cd --- ", "cmcrzdt"}
{"ls ------------------------- "}
{"dir: ", "chqllfw"}
{"file: ", "hjpf", 95243}
{"file: ", "hwqvsl", 108868}
{"file: ", "jpppczvz.mtp", 115004}
{"dir: ", "lnsgfnbr"}
{"dir: ", "pdtjlb"}
{"dir: ", "rqfzvwts"}
{"dir: ", "trvznjhb"}
{"cd --- ", "chqllfw"}
{"ls ------------------------- "}
{"file: ", "cgs.hbt", 56623}
{"file: ", "zqb.grc", 134804}
{"cd --- ", ".."}
{"cd --- ", "lnsgfnbr"}
{"ls ------------------------- "}
{"dir: ", "jtzw"}
{"dir: ", "ngfllcq"}
{"dir: ", "sdm"}
{"dir: ", "wlsg"}
{"cd --- ", "jtzw"}
{"ls ------------------------- "}
{"dir: ", "nfz"}
{"cd --- ", "nfz"}
{"ls ------------------------- "}
{"file: ", "hwqvsl", 255427}
{"file: ", "tmnjbqq.fzh", 94147}
{"cd --- ", ".."}
{"cd --- ", ".."}
{"cd --- ", "ngfllcq"}
{"ls ------------------------- "}
{"file: ", "cdgqtwcv.lzn", 110661}
{"file: ", "dpf", 208050}
{"cd --- ", ".."}
```

We can now use this as a base to start calculating totals. We can actually ignore all 'ls' and 'dir' lines as they're not actually important! All we care about are the lines that give us file sizes and the `cd` lines.

```elixir
# Read the stack input into memory, split on newline
{:ok, filecontents} = File.read("input7.txt")
filecontents = filecontents |> String.split("\n", trim: true)

defmodule Recursion do
  # Recursive step
  def parse_all_commands(inslist, n, result, acc) when n > 0 do
    # Get the nth element
    current = length(inslist) - n
    {:ok, i} = Enum.fetch(inslist, current)

    case String.graphemes(i) do
      ["$", " ", "c", "d", " " | tail] ->
        # "$ cd {}"
        dirname = name = Enum.reduce(tail, fn x, acc -> acc <> x end)
        IO.inspect {"cd --- ", dirname}

        if dirname === ".." do
          if hd(result) < 100001 do
            acc = [hd(result) | acc]

            result = [hd(result) + hd(tl(result)) | tl(tl(result))]

            IO.inspect {"res: ", result, acc}
            parse_all_commands(inslist, n - 1, result, acc)
          else
            result = [hd(result) + hd(tl(result)) | tl(tl(result))]

            IO.inspect {"res: ", result, acc}
            parse_all_commands(inslist, n - 1, result, acc)
          end
        else
          result = [0 | result]

          IO.inspect {"res: ", result, acc}
          parse_all_commands(inslist, n - 1, result, acc)
        end

      ["$", " ", "l", "s"] ->
        # "$ ls {}"
        IO.inspect {"ls ------------------------- "}
        IO.inspect {"res: ", result, acc}
        parse_all_commands(inslist, n - 1, result, acc)

      ["d", "i", "r", " " | tail] ->
        # "$ dir {}"
        dirname = name = Enum.reduce(tail, fn x, acc -> acc <> x end)
        IO.inspect {"dr: ", dirname}
        IO.inspect {"res: ", result, acc}
        parse_all_commands(inslist, n - 1, result, acc)

      fileandsize ->
        # size, " ", name_of_file
        size = Enum.take_while(
          fileandsize,
          fn x -> x !== " "
        end)
        {sizeint, ""} = Integer.parse(
          Enum.reduce(size, fn x, acc -> acc <> x end)
        )

        name = Enum.take_while(
          Enum.drop(fileandsize, length(size) + 1),
          fn x -> x !== " "
        end)
        name = Enum.reduce(name, fn x, acc -> acc <> x end)

        IO.inspect {"fl: ", name, sizeint}
        result = [hd(result) + sizeint | tl(result)]

        IO.inspect {"res: ", result, acc}
        parse_all_commands(inslist, n - 1, result, acc)
    end
  end

  # base case
  def parse_all_commands(inslist, 0, result, acc) do
    {:ok, result, acc}
  end
end

{:ok, res, acc} = Recursion.parse_all_commands(
  filecontents,
  length(filecontents),
  [],
  []
)

IO.inspect Enum.sum(acc)
```

Finally, for Part 2, we just need to scan through the directory totals to find the smallest one that brings us up to the total. I spent a while debugging only to realise that as part of the solution to Part 1, I was ignoring all directories with a total size `< 100001`! Just commenting that out gave me the correct answer.

```elixir
# Read the stack input into memory, split on newline
{:ok, filecontents} = File.read("input7.txt")
filecontents = filecontents |> String.split("\n", trim: true)

defmodule Recursion do
  # Recursive step
  def parse_all_commands(inslist, n, result, acc) when n > 0 do
    # Get the nth element
    current = length(inslist) - n
    {:ok, i} = Enum.fetch(inslist, current)

    case String.graphemes(i) do
      ["$", " ", "c", "d", " " | tail] ->
        # "$ cd {}"
        dirname = name = Enum.reduce(tail, fn x, acc -> acc <> x end)
        IO.inspect {"cd --- ", dirname}

        if dirname === ".." do
          # if hd(result) < 100001 do
            acc = [hd(result) | acc]

            result = [hd(result) + hd(tl(result)) | tl(tl(result))]

            IO.inspect {"res: ", result, acc}
            parse_all_commands(inslist, n - 1, result, acc)
          # else
          #   result = [hd(result) + hd(tl(result)) | tl(tl(result))]

          #   IO.inspect {"res: ", result, acc}
          #   parse_all_commands(inslist, n - 1, result, acc)
          # end
        else
          result = [0 | result]

          IO.inspect {"res: ", result, acc}
          parse_all_commands(inslist, n - 1, result, acc)
        end

      ["$", " ", "l", "s"] ->
        # "$ ls {}"
        IO.inspect {"ls ------------------------- "}
        IO.inspect {"res: ", result, acc}
        parse_all_commands(inslist, n - 1, result, acc)

      ["d", "i", "r", " " | tail] ->
        # "$ dir {}"
        dirname = name = Enum.reduce(tail, fn x, acc -> acc <> x end)
        IO.inspect {"dr: ", dirname}
        IO.inspect {"res: ", result, acc}
        parse_all_commands(inslist, n - 1, result, acc)

      fileandsize ->
        # size, " ", name_of_file
        size = Enum.take_while(
          fileandsize,
          fn x -> x !== " "
        end)
        {sizeint, ""} = Integer.parse(
          Enum.reduce(size, fn x, acc -> acc <> x end)
        )

        name = Enum.take_while(
          Enum.drop(fileandsize, length(size) + 1),
          fn x -> x !== " "
        end)
        name = Enum.reduce(name, fn x, acc -> acc <> x end)

        IO.inspect {"fl: ", name, sizeint}
        result = [hd(result) + sizeint | tl(result)]

        IO.inspect {"res: ", result, acc}
        parse_all_commands(inslist, n - 1, result, acc)
    end
  end

  # base case
  def parse_all_commands(inslist, 0, result, acc) do
    {:ok, result, acc}
  end
end

{:ok, res, acc} = Recursion.parse_all_commands(
  filecontents,
  length(filecontents),
  [],
  []
)

totalspace = 70000000 - Enum.sum(res)
neededspace = 30000000

possible = Enum.filter(acc, fn x -> totalspace + x >= neededspace end)
sorted = Enum.sort(possible)

IO.inspect(hd(sorted))
```

## Day 8: Treetop Tree House

This took me a little while to figure out too! The lessons I'm taking away here are as follows:

- use `fetch!()` instead of `fetch()` so that you're not constantly using `elem(x, 1)` to get rid of the `:ok` -- this one made my initial attempts' code so illegibile I had to give up and start over 😭
- operations on rows are just the same as operating on columns if you transpose the input *taps forehead with finger*
- variable naming is so important. When you're iterating through three layers deep in some crazy nested data structure using an anonymous function you **need** to be unambiguous and exact, otherwise debugging becomes totally impossible.
- `IO.inspect` is your friend, but be careful about calling him too much, as this can also be confusing. Debugging is a kind of engineering.
- Getting the product of two matrices using `Enum.map()` is actually pretty elegant!

```elixir
# Read the input into memory, split on newline
{:ok, filecontents} = File.read("input8.txt")
filecontents = filecontents |> String.split("\n", trim: true)
filecontents = Enum.map(filecontents, fn x -> String.graphemes(x) end)

# Parse all strings into a list of ints
rowgrid = Enum.map(filecontents, fn x ->
  Enum.map(x, fn x ->
      elem(Integer.parse(x), 0)
    end
  )
  end
)

# Thanks to https://elixirforum.com/t/transpose-a-list-of-lists-using-list-comprehension/17638/2
defmodule Transp do
  def transpose([[] | _]), do: []
  def transpose(m) do
    [Enum.map(m, &hd/1) | transpose(Enum.map(m, &tl/1))]
  end
end

colgrid = Transp.transpose(rowgrid)

IO.inspect rowgrid
IO.inspect colgrid

# Now we have two lists of lists, one representing the rows, one representing the columns.
# If a tree is visible in either one, it is visible.
# Therefore, if we can create a visibility map of both, and then take the AND of both, we have our overall visibility.

defmodule CheckVis do
  def is_visible_in_list(row, height, index) do
    # IO.inspect "is_visible_in_list=========================r,h,i"
    # IO.inspect {row, height, index}

    # is it first or last in the row (at the edge of the forest)
    if index === 0 || index === length(row) - 1 do
      1
    else
      # Look back
      lookback = Enum.reduce(
        Enum.reverse(Enum.to_list(0..index-1)), 1, fn i, acc ->
          if elem(Enum.fetch(row, i), 1) < height do
            # if it's already occluded
            # (hidden by a taller tree before) it stays hidden
            if acc == 0, do: 0, else: 1
          else
            # hidden by a taller tree
            0
          end
        end
      )
      # Look forward
      lookfwd = Enum.reduce(
        Enum.to_list(index+1..length(row)-1), 1, fn i, acc ->
          if elem(Enum.fetch(row, i), 1) < height do
            # if it's already occluded
            # (hidden by a taller tree before) it stays hidden
            if acc == 0, do: 0, else: 1
          else
            # hidden by a taller tree
            0
          end
        end
      )
      # IO.inspect {lookback, lookfwd}
      lookback + lookfwd
    end
  end
end

rowgridvis = Enum.map(rowgrid, fn row ->
  Enum.map(Enum.with_index(row), fn tree ->
      CheckVis.is_visible_in_list(row, elem(tree, 0), elem(tree, 1))
    end
  )
  end
)

colgridvis = Enum.map(colgrid, fn row ->
  Enum.map(Enum.with_index(row), fn tree ->
      CheckVis.is_visible_in_list(row, elem(tree, 0), elem(tree, 1))
    end
  )
  end
)

# Now we have two matrixes (rows and cols) where, for each index, the tree at that index is either 0 = not visible, 1 = visible in one direction, or 2 = visible in both directions.

IO.inspect rowgridvis
IO.inspect colgridvis

totalvis = Enum.map(Enum.with_index(rowgridvis), fn {row, rowindex} ->
  Enum.map(Enum.with_index(row), fn {treeheight, inrowindex} ->
      treeheight + Enum.fetch!(Enum.fetch!(colgridvis, inrowindex), rowindex)
    end
  )
  end
)

IO.inspect totalvis

# To find the total number of visible trees, we just count how many trees have >0 degrees of visibility!

IO.inspect Enum.reduce(totalvis, 0, fn x, acc ->
  acc + Enum.reduce(x, 0, fn y, acc2 ->
    acc = if y > 0, do: acc2 + 1, else: acc2
  end)
end)

```

Part 2 was also tricky! I'm sensing a theme here...

```elixir
# Read the input into memory, split on newline
{:ok, filecontents} = File.read("input8.txt")
filecontents = filecontents |> String.split("\n", trim: true)
filecontents = Enum.map(filecontents, fn x -> String.graphemes(x) end)

# Parse all strings into a list of ints
rowgrid = Enum.map(filecontents, fn x ->
  Enum.map(x, fn x ->
      elem(Integer.parse(x), 0)
    end
  )
  end
)

# Thanks to https://elixirforum.com/t/transpose-a-list-of-lists-using-list-comprehension/17638/2
defmodule Transp do
  def transpose([[] | _]), do: []
  def transpose(m) do
    [Enum.map(m, &hd/1) | transpose(Enum.map(m, &tl/1))]
  end
end

colgrid = Transp.transpose(rowgrid)

IO.inspect rowgrid
IO.inspect colgrid

# Now we have two lists of lists, one representing the rows, one representing the columns.
# If a tree is visible in either one, it is visible.
# Therefore, if we can create a visibility map of both, and then take the AND of both, we have our overall visibility.

defmodule CheckVis do
  def is_visible_in_list(row, height, index) do
    # is it first or last in the row (at the edge of the forest)
    if index === 0 || index === length(row) - 1 do
      IO.inspect {0,0}
      {0, 0}
    else
      # Look back
      lookback = Enum.reduce(
        Enum.reverse(Enum.to_list(0..index-1)),
        {0, :notdone},
        fn i, acc ->
          if elem(acc, 1) === :notdone do
            if elem(Enum.fetch(row, i), 1) < height do
              # count +1 visible tree
              {elem(acc, 0) +1, :notdone}
            else
              # hidden by a taller tree
              if elem(acc, 0) === 0, do:
                {1, :done},
              else:
                {elem(acc, 0) + 1, :done}
            end
          else
            {elem(acc, 0), :done}
          end
        end
      )
      # Look forward
      lookfwd = Enum.reduce(
        Enum.to_list(index+1..length(row)-1),
        {0, :notdone},
        fn i, acc ->
          if elem(acc, 1) === :notdone do
            if elem(Enum.fetch(row, i), 1) < height do
              # count +1 visible tree
              {elem(acc, 0) +1, :notdone}
            else
              # hidden by a taller tree
              if elem(acc, 0) === 0, do:
                {1, :done},
              else:
                {elem(acc, 0) + 1, :done}
            end
          else
            {elem(acc, 0), :done}
          end
        end
      )
      {elem(lookback, 0), elem(lookfwd, 0)}
    end
  end
end

rowgridvis = Enum.map(rowgrid, fn row ->
  Enum.map(Enum.with_index(row), fn tree ->
      CheckVis.is_visible_in_list(row, elem(tree, 0), elem(tree, 1))
    end
  )
  end
)

colgridvis = Enum.map(colgrid, fn row ->
  Enum.map(Enum.with_index(row), fn tree ->
      CheckVis.is_visible_in_list(row, elem(tree, 0), elem(tree, 1))
    end
  )
  end
)

# We now multiply together each of the scenic scores for up, down, left and right

totalvis = Enum.map(Enum.with_index(rowgridvis), fn {row, rowindex} ->
  Enum.map(Enum.with_index(row), fn {treeheight, inrowindex} ->
      elem(treeheight, 0) *
      elem(Enum.fetch!(Enum.fetch!(colgridvis, inrowindex), rowindex), 0) *
      elem(treeheight, 1) *
      elem(Enum.fetch!(Enum.fetch!(colgridvis, inrowindex), rowindex), 1)
    end
  )
  end
)

# Get the maximum of every row, and get the maximum of those
IO.inspect Enum.max(Enum.map(totalvis, fn x -> Enum.max(x) end))
```

## Day 9: Rope Bridge

I spent a long time trying to come up with a more general way of expressing the rules, but in the end, I gave up and made a big `case` block which encompasses all possible movements of the head. Oh well, it worked.

```elixir
# Read the input into memory, split on newline
{:ok, filecontents} = File.read("input9.txt")
filecontents = filecontents |> String.split("\n", trim: true)
filecontents = Enum.map(filecontents, fn x -> String.graphemes(x) end)

filecontents = Enum.map(filecontents, fn [head | tail] ->
  tail = Enum.drop(tail, 1)
  dist = Enum.reduce(tail, fn x, acc -> acc <> x end)
  %{:dir => head, :dist => elem(Integer.parse(dist), 0)}
end)

start = %{:x => 0, :y => 0} # head and tail both start here

IO.inspect filecontents

headcoords = elem(Enum.map_reduce(filecontents, [start], fn move, prevposlist ->
  prevx = Enum.fetch!(prevposlist, length(prevposlist) - 1).x
  prevy = Enum.fetch!(prevposlist, length(prevposlist) - 1).y
  case move do
    %{dir: "L", dist: d} ->
      {"L", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx - step, :y => prevy}
      end)}
    %{dir: "R", dist: d} ->
      {"R", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx + step, :y => prevy}
      end)}
    %{dir: "U", dist: d} ->
      {"L", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx, :y => prevy + step}
      end)}
    %{dir: "D", dist: d} ->
      {"L", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx, :y => prevy - step}
      end)}
  end
end), 1)

IO.inspect headcoords

tailcoords = Enum.map_reduce(headcoords, [], fn pos, prevposlist ->

  if length(prevposlist) <= 1 do
    # first and second step we don't move
    { %{x: 0, y: 0}, prevposlist ++ [%{tail: %{x: 0, y: 0}, head: pos}] }
  else
    current_tl = Enum.fetch!(prevposlist, length(prevposlist) - 1).tail
    diff = %{ x: pos.x - current_tl.x, y: pos.y - current_tl.y }

    case diff do
      # ==================== No move
      %{x: 0, y: 0} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      # ==================== Straight moves
      %{x: 2, y: 0} ->
        { %{x: current_tl.x + 1, y: current_tl.y},
        prevposlist ++ [%{tail: %{x: current_tl.x + 1, y: current_tl.y}, head: pos}] }
      %{x: 0, y: 2} ->
        { %{x: current_tl.x, y: current_tl.y + 1},
        prevposlist ++ [%{tail: %{x: current_tl.x, y: current_tl.y + 1}, head: pos}] }
      %{x: -2, y: 0} ->
        { %{x: current_tl.x - 1, y: current_tl.y},
        prevposlist ++ [%{tail: %{x: current_tl.x - 1, y: current_tl.y}, head: pos}] }
      %{x: 0, y: -2} ->
        { %{x: current_tl.x, y: current_tl.y - 1},
        prevposlist ++ [%{tail: %{x: current_tl.x, y: current_tl.y - 1}, head: pos}] }
      # ==================== 1-1 Diagonal moves
      %{x: 1, y: 1} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      %{x: -1, y: 1} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      %{x: 1, y: -1} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      %{x: -1, y: -1} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      # ==================== 1-0 Diagonal moves
      %{x: 0, y: 1} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      %{x: 1, y: 0} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      %{x: 0, y: -1} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      %{x: -1, y: 0} ->
        { current_tl,
        prevposlist ++ [%{tail: current_tl, head: pos}] }
      # ==================== 1-2 / 2-1 Diagonal moves
      %{x: 2, y: 1} ->
        { %{x: current_tl.x + 1, y: current_tl.y + 1},
        prevposlist ++ [%{tail: %{x: current_tl.x + 1, y: current_tl.y + 1}, head: pos}] }
      %{x: -2, y: 1} ->
        { %{x: current_tl.x - 1, y: current_tl.y + 1},
        prevposlist ++ [%{tail: %{x: current_tl.x - 1, y: current_tl.y + 1}, head: pos}] }
      %{x: 2, y: -1} ->
        { %{x: current_tl.x + 1, y: current_tl.y - 1},
        prevposlist ++ [%{tail: %{x: current_tl.x + 1, y: current_tl.y - 1}, head: pos}] }
      %{x: -2, y: -1} ->
        { %{x: current_tl.x - 1, y: current_tl.y - 1},
        prevposlist ++ [%{tail: %{x: current_tl.x - 1, y: current_tl.y - 1}, head: pos}] }
      %{x: 1, y: 2} ->
        { %{x: current_tl.x + 1, y: current_tl.y + 1},
        prevposlist ++ [%{tail: %{x: current_tl.x + 1, y: current_tl.y + 1}, head: pos}] }
      %{x: 1, y: -2} ->
        { %{x: current_tl.x + 1, y: current_tl.y - 1},
        prevposlist ++ [%{tail: %{x: current_tl.x + 1, y: current_tl.y - 1}, head: pos}] }
      %{x: -1, y: 2} ->
        { %{x: current_tl.x - 1, y: current_tl.y + 1},
        prevposlist ++ [%{tail: %{x: current_tl.x - 1, y: current_tl.y + 1}, head: pos}] }
      %{x: -1, y: -2} ->
        { %{x: current_tl.x - 1, y: current_tl.y - 1},
        prevposlist ++ [%{tail: %{x: current_tl.x - 1, y: current_tl.y - 1}, head: pos}] }
      other ->
        IO.inspect "error: impossible move!"
        IO.inspect {
          "pos", pos,
          "current_tl", current_tl,
          "diff", diff
        }
        Process.sleep(10000)
    end
  end
end)

IO.inspect tailcoords
IO.inspect length(Enum.uniq(elem(tailcoords, 0)))
```

I started part 2, but ran into a few weird issues that were proving impossible to debug because I couldn't look at a list of coordinates and visualise quickly enough if they were right or not. So I decided to make a small function that would render each configuration of head and tail on a grid, and then call this function on the resulting list of coordinates like so:

```elixir
defmodule Visualise do
  def print_all_moves(inputlist) do
    IO.write "\e[H\e[J"; # clears the terminal
    Enum.map(inputlist, fn x -> Visualise.print_single_move(x) end)
  end

  def print_single_move(move) do
    IO.write "\e[H\e[J"; # clears the terminal
    minx = -19
    miny = -20
    maxx = 19
    maxy = 20

    for ycoord <- maxy..miny do
      for xcoord <- minx..maxx do
        if ycoord === miny do
          # Draw legend
          IO.write(if abs(xcoord) < 10 do abs(xcoord) else abs(xcoord)-10 end) # make them line up better
          IO.write("  ")
        else
          if xcoord === maxx do
            # Draw legend
            IO.write(ycoord)
          else
            # Draw Head / tail / etc
            if xcoord === move.head.x && ycoord === move.head.y do
              IO.write("H  ")
            else
              if xcoord === move.tail.x && ycoord === move.tail.y do
                IO.write("T  ")
              else
                if ycoord === 0 do
                  IO.write("───")
                else
                  if xcoord === 0 do
                    IO.write("│  ")
                  else
                    IO.write("▓  ")
                  end
                end
              end
            end
          end
        end
      end
      IO.write("\n")
    end
    Process.sleep(100)
  end
end

Visualise.print_all_moves(elem(tailcoords, 1))
```

Finally, I can see where things are moving!

<img src="/day9-visual.gif" style="max-width: 100%; border-radius: 10px;"></img>

Now all that's left is to run the solution code above for as many "knots" there are on the rope to create a list of n-dimensional tuples, where n is the number of knots. That almost starts to sound like I know what I'm doing!

```elixir
# We need to refactor -- break out the movement logic into its own discrete function
defmodule KnotMovement do
  def get_new_position_for_knot(currentpos, aheadpos) do
    diff = %{
      x: aheadpos.x - currentpos.x,
      y: aheadpos.y - currentpos.y
    }

    case diff do
      # ==================== No move
      %{x: 0, y: 0} ->
        currentpos
      # ==================== Straight moves
      %{x: 2, y: 0} ->
        %{x: currentpos.x + 1, y: currentpos.y}
      %{x: 0, y: 2} ->
        %{x: currentpos.x, y: currentpos.y + 1}
      %{x: -2, y: 0} ->
        %{x: currentpos.x - 1, y: currentpos.y}
      %{x: 0, y: -2} ->
        %{x: currentpos.x, y: currentpos.y - 1}
      # ==================== 2-2 moves
      # these were not possible before!
      %{x: -2, y: -2} ->
        %{x: currentpos.x - 1, y: currentpos.y - 1}
      %{x: 2, y: -2} ->
        %{x: currentpos.x + 1, y: currentpos.y - 1}
      %{x: 2, y: 2} ->
        %{x: currentpos.x + 1, y: currentpos.y + 1}
      %{x: -2, y: 2} ->
        %{x: currentpos.x - 1, y: currentpos.y + 1}
      # ==================== 1-1 Diagonal moves
      %{x: 1, y: 1} ->
        currentpos
      %{x: -1, y: 1} ->
        currentpos
      %{x: 1, y: -1} ->
        currentpos
      %{x: -1, y: -1} ->
        currentpos
      # ==================== 1-0 Diagonal moves
      %{x: 0, y: 1} ->
        currentpos
      %{x: 1, y: 0} ->
        currentpos
      %{x: 0, y: -1} ->
        currentpos
      %{x: -1, y: 0} ->
        currentpos
      # ==================== 1-2 / 2-1 Diagonal moves
      %{x: 2, y: 1} ->
        %{x: currentpos.x + 1, y: currentpos.y + 1}
      %{x: -2, y: 1} ->
        %{x: currentpos.x - 1, y: currentpos.y + 1}
      %{x: 2, y: -1} ->
        %{x: currentpos.x + 1, y: currentpos.y - 1}
      %{x: -2, y: -1} ->
        %{x: currentpos.x - 1, y: currentpos.y - 1}

      %{x: 1, y: 2} ->
        %{x: currentpos.x + 1, y: currentpos.y + 1}
      %{x: 1, y: -2} ->
        %{x: currentpos.x + 1, y: currentpos.y - 1}
      %{x: -1, y: 2} ->
        %{x: currentpos.x - 1, y: currentpos.y + 1}
      %{x: -1, y: -2} ->
        %{x: currentpos.x - 1, y: currentpos.y - 1}
      other ->
        IO.inspect "error: impossible move!"
        IO.inspect {
          "pos", currentpos,
          "aheadpos", aheadpos,
          "diff", diff
        }
        Process.sleep(10000)
    end
  end

  def update_all_knot_positions(rope_configuration) do
    if length(Map.keys(rope_configuration)) === 1 do
      # Base case: The head is already updated
      rope_configuration
    else
      # Start with the largest knot number (the tail) and work our way
      # to the head (base case), and then work back up recursively to the tail with updates
      largest_knot_num = hd(
        Enum.sort(
          Enum.filter(Map.keys(rope_configuration), fn x -> x !== :head end),
          &(&1 >= &2)
        )
      )
      {pos, rope_configuration} = Map.pop!(rope_configuration, largest_knot_num)

      # Recursion!
      rope_configuration = update_all_knot_positions(rope_configuration)

      # Update the knot after
      rope_configuration = Map.put(
        rope_configuration,
        largest_knot_num,
        KnotMovement.get_new_position_for_knot(
          pos,
          if largest_knot_num === 1 do
            Map.fetch!(rope_configuration, :head)
          else
            Map.fetch!(rope_configuration, largest_knot_num-1)
          end
        )
      )
      rope_configuration
    end

    # This doesn't work! Why? Because we're comparing against the position
    # of the knot ahead in the *previous configuration*! We need to use a method
    # which allows us to access the result of the get_new_position_for_knot
    # function for the knot ahead and use it in our current calculation
    #
    # result = for {k, v} <- rope_configuration, into: %{} do
    #   if k === :head do
    #     # The head is already updated
    #     {k, v}
    #   else
    #     # Update position
    #     currentpos = v
    #     # we compare against :head
    #     aheadpos = Map.fetch!(rope_configuration, if k === 1 do :head else k - 1 end)
    #     # IO.inspect {"knotnum", k}
    #     {k, KnotMovement.get_new_position_for_knot(currentpos, aheadpos)}
    #   end
    # end
  end

end

# Read the input into memory, split on newline -- this stays the same
{:ok, filecontents} = File.read("input/day9.txt")
filecontents = filecontents |> String.split("\n", trim: true)
filecontents = Enum.map(filecontents, fn x -> String.graphemes(x) end)

filecontents = Enum.map(filecontents, fn [head | tail] ->
  tail = Enum.drop(tail, 1)
  dist = Enum.reduce(tail, fn x, acc -> acc <> x end)
  %{:dir => head, :dist => elem(Integer.parse(dist), 0)}
end)

start = %{:x => 0, :y => 0} # head and tail both start here

headcoords = elem(Enum.map_reduce(filecontents, [start], fn move, prevposlist ->
  prevx = Enum.fetch!(prevposlist, length(prevposlist) - 1).x
  prevy = Enum.fetch!(prevposlist, length(prevposlist) - 1).y
  case move do
    %{dir: "L", dist: d} ->
      {"L", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx - step, :y => prevy}
      end)}
    %{dir: "R", dist: d} ->
      {"R", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx + step, :y => prevy}
      end)}
    %{dir: "U", dist: d} ->
      {"L", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx, :y => prevy + step}
      end)}
    %{dir: "D", dist: d} ->
      {"L", prevposlist ++ Enum.map(
        Enum.to_list(1..d), fn step -> %{:x => prevx, :y => prevy - step}
      end)}
  end
end), 1)

number_of_knots = 9

knotcoords = Enum.map_reduce(headcoords, [], fn pos, prevposlist ->
    if length(prevposlist) > 0 do
      last_config = Enum.fetch!(prevposlist, length(prevposlist) - 1)
      current_num_knots = length(Map.keys(last_config))

      if current_num_knots <= number_of_knots do
        # we need to add a new knot to the map, at the origin
        new_config = Map.put(last_config, current_num_knots, %{x: 0, y: 0})
        # update other knots' positions, head first
        new_config = Map.replace!(new_config, :head, pos)

        { %{x: 0, y: 0}, prevposlist ++ [KnotMovement.update_all_knot_positions(new_config)] }
      else
        # We now have all knots, just update their positions
        new_config = Map.replace!(last_config, :head, pos)

        { %{x: 0, y: 0}, prevposlist ++ [KnotMovement.update_all_knot_positions(new_config)] }
      end
    else
      # First step
      new_config = %{
        :head => pos
      }

      { %{x: 0, y: 0}, prevposlist ++ [new_config] }
    end
  end
)

## Helpful websites!

These sites helped me wrap my head around Elixir while doing these challanges; couldn't have done it without them!

- [Elixir School](https://elixirschool.com/en/lessons)
- [Visual Elixir Reference](https://superruzafa.github.io/visual-elixir-reference//)
- [Elixir Examples](https://elixir-examples.github.io/)

