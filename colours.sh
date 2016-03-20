
#!/bin/bash

# Variables
## Colours
### Modifiers
UL_ON=$(tput smul)
UL_OFF=$(tput rmul)
RESET=$(tput sgr0)

### Foreground
FG_BLACK=$(tput setaf 16)
FG_RED=$(tput setaf 1)
FG_GREEN=$(tput setaf 2)
FG_YELLOW=$(tput setaf 3)
FG_BLUE=$(tput setaf 4)
FG_MAGENTA=$(tput setaf 5)
FG_CYAN=$(tput setaf 6)
FG_WHITE=$(tput setaf 7)

### Background
BG_BLACK=$(tput setab 16)
BG_RED=$(tput setab 1)
BG_GREEN=$(tput setab 2)
BG_YELLOW=$(tput setab 3)
BG_BLUE=$(tput setab 4)
BG_MAGENTA=$(tput setab 5)
BG_CYAN=$(tput setab 6)
BG_WHITE=$(tput setab 7)

### Runes
RUNE_OK="${BG_GREEN}${FG_BLACK} > ${RESET}"
RUNE_WARN="${BG_YELLOW}${FG_BLACK} ~ ${RESET}"
RUNE_ERROR="${BG_RED}${FG_BLACK} ! ${RESET}"
RUNE_INFO="${BG_BLUE}${FG_BLACK} - ${RESET}"
RUNE_LINE="${BG_MAGENTA}${FG_BLACK} = ${RESET}"
