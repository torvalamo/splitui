# SplitUI

Main container classes

- pane
- vsplit
- hsplit

Secondary container classes

- shrink

## Behavioural container classes

- scroll
- scrollmax

Scrollmax keeps the window scrolled to the bottom on every change.

## Triggered behaviour classes

- slidein
- slideoutup
- slideup
- slideoutdown
- slidedown
- slideoutleft
- slideleft
- slideoutright
- slideright

Behaviour classes can be triggered by calling `slide(id, size)`, where id is the tag's id attribute (eg. `slide('#mytag', '80%')`) and size is the height or width (depending on slide direction) of the tag, relative to the container it is in.

Slidein is inline, and displaces its vsplit/hsplit-descendant brethren, while the other slides are layered, and does not disturb the structure.